import Vector from '.';
import { sqrt, acos /* , hypot */ } from '../math';

export function dot(a: Vector, b: Vector): number {
  if (a.length !== b.length) {
    throw new Error(`expected vectors of equal length, got: ${a}, ${b}`);
  }

  /**
   * this `.toArray` shouldn't be necessary (I don't think) but calling reduce
   * on `a` directly throws an error related to the Proxy-ing of a TypedArray
   * (I think), it looks like this:
   *
   * ```js
   * TypeError: this is not a typed array.
   *     at Proxy.reduce (<anonymous>)
   * ```
   *
   * @see: https://github.com/tc39/ecma262/issues/163
   * @see: https://github.com/tc39/ecma262/issues?utf8=%E2%9C%93&q=is%3Aissue+TypedArray+Proxy
   */
  return a.toArray().reduce((acc, c, i) => acc + c * b[i], 0);
}

export function ρ(v: Vector): number {
  // an alternative for later comparison
  // return hypot(...v.toArray());
  return sqrt(dot(v, v));
}

export function θ(a: Vector, b: Vector): number {
  const dab = dot(a, b);
  const ρa = ρ(a);
  const ρb = ρ(b);

  if (ρa === 0 || ρb === 0) {
    throw new Error(`cannot get θ between vectors: ${a}, ${b}`);
  }

  return acos(dab / ρa / ρb);
}
