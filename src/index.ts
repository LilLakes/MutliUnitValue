import { AreaMultiUnit } from "./valuesMultiUnit/AreaMultiUnit";
import { LengthMultiUnit } from "./valuesMultiUnit/LengthMultiUnit";
import { VolumeMultiUnit } from "./valuesMultiUnit/VolumeMultiUnit";

const leng1 = new LengthMultiUnit(10, "ft");
const leng2 = new LengthMultiUnit(10, "in");
const area1 = new AreaMultiUnit(10, "ft");
const volume1 = new VolumeMultiUnit(10, "ft");

console.log(leng1.toString());
console.log(leng2.toString());
console.log(area1.toString());
console.log(volume1.toString());

console.log((leng1.add(leng2)).toString());
console.log((leng1.sub(leng2)).toString());
console.log((leng1.mul(2)).toString());
console.log((leng1.mul(leng2)).toString());
console.log((leng1.mul(area1)).toString());
// console.log((leng1.mul(volume1)).toString()); //ERROR



