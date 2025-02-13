import { MeasureType, MultiUnit } from "../types/types";

export abstract class ValueMultiUnit {
    constructor(
        public value: number, 
        public unit: MultiUnit, 
        public type: MeasureType
    ) {}
}