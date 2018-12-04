import { Swizzled4 } from './types';

interface Vec4 extends Float32Array, Swizzled4 {}
class Vec4 extends Float32Array {
  public static dimensions = 4;

  // public static get [Symbol.species]() {
  //   return Float32Array;
  // }

  public toString() {
    return `vec${Vec4.dimensions}(${super.toString()})`;
  }
}

export default Vec4;
