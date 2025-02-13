import { getLengthFactor } from "../conversionFactors/conversionFactors";
import { assertNever, isAreaMultiUnit, isLengthMultiUnit } from "../types/typeGuards";
import { LengthUnit } from "../types/types";
import { AreaMultiUnit } from "./AreaMultiUnit";
import { ValueMultiUnit } from "./valueMultiUnit";
import { VolumeMultiUnit } from "./VolumeMultiUnit";

export class LengthMultiUnit extends ValueMultiUnit {
    declare public unit: LengthUnit;    
    declare public type: "length";
    constructor(value: number, unit: LengthUnit) {
        super(value, unit, "length")
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
        return `${this.value} ${unit}`;
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
    add(other: LengthMultiUnit, unit?: LengthUnit): LengthMultiUnit {
        // Get the conversion factors for the two units
        const factor = getLengthFactor(this.unit);
        const otherFactor = getLengthFactor(other.unit);
        let newValue;
        // If the units are the same, just add the values
        if((!unit || unit === this.unit) && other.unit === this.unit) {            
            newValue = this.value + other.value;
            return new LengthMultiUnit(newValue, this.unit);
        }
        // Otherwise, convert the values to the new unit
        const newFactor = getLengthFactor(unit || this.unit);
        newValue = (this.value * factor + other.value * otherFactor) / newFactor;
        // Create a new LengthMultiUnit with the result
        return new LengthMultiUnit(newValue, unit || this.unit);
    }

    sub(other: LengthMultiUnit, unit?: LengthUnit): LengthMultiUnit {
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

    mul(other: number, unit?: LengthUnit): LengthMultiUnit;
    mul(other: LengthMultiUnit, unit?: LengthUnit): AreaMultiUnit;
    mul(other: AreaMultiUnit, unit?: LengthUnit): VolumeMultiUnit;
    /**
     * Multiply the length by a number, a length, or an area, and return the result.
     * 
     * @param {number | LengthMultiUnit | AreaMultiUnit} other The value to multiply by.
     * @param {LengthUnit} [unit=this.unit] The unit for the result. If not specified, the result will be in the same unit as this length.
     * 
     * @returns {LengthMultiUnit | AreaMultiUnit | VolumeMultiUnit} The result of multiplying the two values.
     */
    mul(other: number | LengthMultiUnit | AreaMultiUnit, unit?: LengthUnit): LengthMultiUnit | AreaMultiUnit | VolumeMultiUnit {
        if(typeof other === "number") {
            // Multiply by a number
            return new LengthMultiUnit(this.value * other, this.unit);
        }
        else if(isLengthMultiUnit(other)) {
            // Multiply by a length
            const factor = getLengthFactor(this.unit);
            const otherFactor = getLengthFactor(other.unit);
            let newValue;
            if(!unit || unit === this.unit) {
                // The two units are the same
                if(other.unit === this.unit) {                
                    // Just multiply the values
                    newValue = this.value * other.value;
                    return new AreaMultiUnit(newValue, this.unit);
                }
            }
            // The two units are different
            const newFactor = getLengthFactor(unit || this.unit);
            // Convert the values to the new unit
            newValue = (this.value * factor * other.value * otherFactor) / newFactor;
            // Create a new AreaMultiUnit with the result
            return new AreaMultiUnit(newValue, unit || this.unit);
        }
        else if(isAreaMultiUnit(other)) {
            // Multiply by an area
            return new VolumeMultiUnit(this.value * other.value, unit || this.unit);
        } 

        // assertNever(other);
        throw new Error(`Multiplication can only be done with numbers, lengths, or areas.`);
    }
}