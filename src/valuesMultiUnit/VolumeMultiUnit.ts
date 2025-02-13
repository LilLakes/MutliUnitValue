import { getLengthFactor } from "../conversionFactors/conversionFactors";
import { LengthUnit } from "../types/types";
import { AreaMultiUnit } from "./AreaMultiUnit";
import { LengthMultiUnit } from "./LengthMultiUnit";
import { ValueMultiUnit } from "./valueMultiUnit";

export class VolumeMultiUnit extends ValueMultiUnit {
    declare public unit: LengthUnit;    
    declare public type: "volume";
    constructor(value: number, unit: LengthUnit) {
        super(value, unit, "volume")
    }

    /**
     * Changes the unit of measurement to the given unit.
     * 
     * @param {LengthUnit} unit The new unit to use.
     */
    changeUnit(unit: LengthUnit): void {
        // Get the factor for the current unit
        const factor = getLengthFactor(this.unit);
        // Get the factor for the new unit
        const newFactor = getLengthFactor(unit);
        // Convert the value to the new unit
        const convertedValue = this.value * factor / newFactor;
        // Update the value and unit
        this.value = convertedValue;
        this.unit = unit;
    }

    /**
     * Returns a string representation of the length, in the given unit.
     * 
     * @param {LengthUnit} [unit=this.unit] The unit to use for the string representation.
     * 
     * @returns {string} A string representation of the length, in the given unit.
     */
    toString(unit: LengthUnit = this.unit): string {
        return `${this.value} ${unit}³`;
    }

    /**
     * Adds another length to this length, optionally converting the result to a
     * different unit.
     * 
     * @param {LengthMultiUnit} other The other length to add.
     * @param {LengthUnit} [unit=this.unit] The unit for the result. If not
     * specified, the result will be in the same unit as this length.
     * 
     * @returns {LengthMultiUnit} The result of adding the two lengths.
     */
    add(other: VolumeMultiUnit, unit?: LengthUnit): VolumeMultiUnit {
        // Get the conversion factors for the two units
        const factor = getLengthFactor(this.unit);
        const otherFactor = getLengthFactor(other.unit);
        let newValue;
        // If the units are the same, just add the values
        if((!unit || unit === this.unit) && other.unit === this.unit) {            
            newValue = this.value + other.value;
            return new VolumeMultiUnit(newValue, this.unit);
        }
        // Otherwise, convert the values to the new unit
        const newFactor = getLengthFactor(unit || this.unit);
        newValue = (this.value * factor + other.value * otherFactor) / newFactor;
        // Create a new LengthMultiUnit with the result
        return new VolumeMultiUnit(newValue, unit || this.unit);
    }

    sub(other: VolumeMultiUnit, unit?: LengthUnit): LengthMultiUnit {
        const factor = getLengthFactor(this.unit);
        const otherFactor = getLengthFactor(other.unit);
        let newValue;
        if(!unit || unit === this.unit) {
            if(other.unit === this.unit) {                
                newValue = this.value - other.value;
                return new LengthMultiUnit(newValue, this.unit);
            }
        }
        const newFactor = getLengthFactor(unit || this.unit);
        newValue = (this.value * factor - other.value * otherFactor) / newFactor;
        return new LengthMultiUnit(newValue, unit || this.unit);
    }

    // mul(other: number, unit?: LengthUnit): LengthMultiUnit;
    // mul(other: LengthMultiUnit, unit?: LengthUnit): AreaMultiUnit;
    // mul(other: AreaMultiUnit, unit?: LengthUnit): VolumeMultiUnit;
    // mul(other: number | LengthMultiUnit | AreaMultiUnit, unit?: LengthUnit): LengthMultiUnit | AreaMultiUnit | VolumeMultiUnit {
    //     const factor = getLengthFactor(this.unit);
    //     const otherFactor = getLengthFactor(other.unit);
    //     let newValue;
    //     if(!unit || unit === this.unit) {
    //         if(other.unit === this.unit) {                
    //             newValue = this.value * other.value;
    //             return new LengthMultiUnit(newValue, this.unit);
    //         }
    //     }
    //     const newFactor = getLengthFactor(unit || this.unit);
    //     newValue = (this.value * factor * other.value * otherFactor) / newFactor;
    //     return new LengthMultiUnit(newValue, unit || this.unit);
    // }
}