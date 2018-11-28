import { Swizzled2 } from './types';

interface Vec2 extends Float32Array, Swizzled2 {}
class Vec2 extends Float32Array {
  // static get [Symbol.species]() {
  //   return Float32Array;
  // }
}

export default Vec2;
