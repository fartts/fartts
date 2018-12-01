import { Swizzled4 } from './types';

interface Vec4 extends Float32Array, Swizzled4 {}
class Vec4 extends Float32Array {
  public static displayName = 'vec4';

  // public static get [Symbol.species]() {
  //   return Float32Array;
  // }

  public toString() {
    return `${Vec4.displayName}(${super.toString()})`;
  }
}

export default Vec4;
