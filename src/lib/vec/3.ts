import { Swizzled3 } from './types';

interface Vec3 extends Float32Array, Swizzled3 {}
class Vec3 extends Float32Array {
  public static dimensions = 3;

  // public static get [Symbol.species]() {
  //   return Float32Array;
  // }

  public toString(): string {
    return `vec${Vec3.dimensions}(${super.toString()})`;
  }
}

export default Vec3;
