import { LengthUnit } from "../types/types";

//LENGTH FACTORS
let lengthConversionFactors: Record<LengthUnit, number> = {
    m: 1,
    km: 0.001,
    ft: 0.3048,
    in: 0.0254,
    yd: 0.9144005502959309,
    cm: 100,
    mm: 1000,
    nm: 1000000000,
    mi: 0.0006213711922373339,
    nmi: 0.0005399568034557236
};

/**
 * Set the conversion factor for a given length unit.
 * 
 * @param {LengthUnit} unit The unit to set the factor for.
 * @param {number} factor The conversion factor for the unit.
 */
export const setLengthFactor = (unit: LengthUnit, factor: number): void => {lengthConversionFactors[unit] = factor}

/**
 * Set the conversion factors for all length units.
 * 
 * @param {Record<LengthUnit, number>} factors The conversion factors for each length unit.
 */
export const setAllLengthFactors = (factors: Record<LengthUnit, number>): void => {lengthConversionFactors = factors}

/**
 * Get the conversion factor for a given length unit.
 * 
 * @param {LengthUnit} unit The unit to get the factor for.
 * @returns {number} The conversion factor for the unit.
 */
export const getLengthFactor = (unit: LengthUnit): number => lengthConversionFactors[unit]