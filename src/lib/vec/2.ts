import { Swizzled2 } from './types';

interface Vec2 extends Float32Array, Swizzled2 {}
class Vec2 extends Float32Array {
  public static displayName = 'vec2';

  // public static get [Symbol.species]() {
  //   return Float32Array;
  // }

  public toString() {
    return `${Vec2.displayName}(${super.toString()})`;
  }
}

export default Vec2;
