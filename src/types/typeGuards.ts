import { AreaMultiUnit } from "../valuesMultiUnit/AreaMultiUnit";
import { LengthMultiUnit } from "../valuesMultiUnit/LengthMultiUnit";
import { ValueMultiUnit } from "../valuesMultiUnit/valueMultiUnit";
import { VolumeMultiUnit } from "../valuesMultiUnit/VolumeMultiUnit";

export const isLengthMultiUnit = (measurement: ValueMultiUnit): measurement is LengthMultiUnit => measurement.type === "length";

export const isAreaMultiUnit = (measurement: ValueMultiUnit): measurement is AreaMultiUnit => measurement.type === "area";

export const isVolumeMultiUnit = (measurement: ValueMultiUnit): measurement is VolumeMultiUnit => measurement.type === "volume";

export const assertNever = (value: never): never => {
    throw new Error(`Unexpected value: ${value}`);
}