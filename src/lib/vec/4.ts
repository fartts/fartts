import { Swizzled4 } from './types';

interface Vec4 extends Float32Array, Swizzled4 {}
class Vec4 extends Float32Array {
  // static get [Symbol.species]() {
  //   return Float32Array;
  // }
}

export default Vec4;
