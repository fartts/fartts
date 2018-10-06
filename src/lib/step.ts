import { cos, floor, saw, sin, tri } from './math';
import { wave, TrigFunction, WaveFunction } from './wave';

/**
 * ## step
 * this utility function returns a step function (like a integer-only wave
 * function) that takes a timestamp (optionally offset by `o`) and returns an
 * integer value between `min` and `max` for the period `p`
 *
 * @export
 * @param {TrigFunction} fn the function to generate the stepped wave (takes a
 * value in radians and returns a value between -1 and 1 at some interval)
 * @param {number} [p=1000] the period for this stepped wave (in milliseconds)
 * @param {*} [min=-1] the minimum value for the generated stepped wave
 * @param {number} [max=1] the maximum value for the generated stepped wave
 * @param {number} [o=0] an optional offset (in milliseconds) at which to start
 * the stepped wave
 * @returns {WaveFunction} a stepped (integer-only) wave function that takes a
 * timestamp (optionally offset by `o`) and returns an integer value between
 * `min` and `max` for the period `p`
 */
export function step(
  fn: TrigFunction,
  p = 1000,
  min = -1,
  max = 1,
  o = 0,
): WaveFunction {
  const waveFn = wave(fn, p, min, max, o);
  return (t: number) => floor(waveFn(t));
}

export const cosStep = (...args: number[]) => step(cos, ...args);
export const sawStep = (...args: number[]) => step(saw, ...args);
export const sinStep = (...args: number[]) => step(sin, ...args);
export const triStep = (...args: number[]) => step(tri, ...args);
