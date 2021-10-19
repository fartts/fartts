import { Swizzled2 } from './types';

interface Vec2 extends Float32Array, Swizzled2 {}
class Vec2 extends Float32Array {
  public static dimensions = 2;

  // public static get [Symbol.species]() {
  //   return Float32Array;
  // }

  public toString(): string {
    return `vec${Vec2.dimensions}(${super.toString()})`;
  }
}

export default Vec2;
