import { Swizzled3 } from './types';

interface Vec3 extends Float32Array, Swizzled3 {}
class Vec3 extends Float32Array {
  public static displayName = 'vec3';

  // public static get [Symbol.species]() {
  //   return Float32Array;
  // }

  public toString() {
    return `${Vec3.displayName}(${super.toString()})`;
  }
}

export default Vec3;
