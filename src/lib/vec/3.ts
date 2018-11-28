import { Swizzled3 } from './types';

interface Vec3 extends Float32Array, Swizzled3 {}
class Vec3 extends Float32Array {
  // static get [Symbol.species]() {
  //   return Float32Array;
  // }
}

export default Vec3;
