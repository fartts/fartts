import { ππ } from './math';

type TrigFunction = (radians: number) => number;
type WaveFunction = (timestamp: number) => number;

/**
 * ## wave
 * this utility function uses the provided trigonometric function to create a
 * wave function that takes a timestamp in milliseconds (optionally offset by
 * `o`) and that returns a value between `min` and `max` for the period `p`
 *
 * @export
 * @param {TrigFunction} fn the function to generate the wave (takes a value in
 * radians and returns a value between -1 and 1 at some interval)
 * @param {number} [p=1000] the period for this wave (in milliseconds)
 * @param {*} [min=-1] the minimum value for the generated wave
 * @param {number} [max=1] the maximum value for the generated wave
 * @param {number} [o=0] an optional offset (in milliseconds) at which to start
 * the wave
 * @returns {WaveFunction} a wave function that takes a timestamp in
 * milliseconds (optionally offset by `o`) and returns a value between `min` and
 * `max` for the period `p`
 */
export function wave(
  fn: TrigFunction,
  p = 1000,
  min = -1,
  max = 1,
  o = 0,
): WaveFunction {
  const amp = (max - min) / 2;
  const rpp = ππ / p;
  return (t: number) => {
    const ots = o + t;
    return amp * (1 + fn(ots * rpp)) + min;
  };
}
