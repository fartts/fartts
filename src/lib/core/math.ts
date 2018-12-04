import seedRandom from 'seedrandom';

const name = '@fartts/fartts';
export const random = seedRandom(name);
export const {
  abs,
  acos,
  atan2,
  ceil,
  cos,
  floor,
  hypot,
  max,
  min,
  PI: π,
  round,
  sin,
  sqrt,
} = Math;
export const ππ = π * 2;
export const { isFinite } = Number;

/**
 * ## lerp
 * short for "linear interpolate" this function returns a number that is
 * interpolated between `a` and `b` by the ratio provided in `i` (e.g. if `i` is
 * 0 `a` is returned, if `i` is 1 `b` is returned)
 *
 * @export
 * @param {number} v0 the lower bound of the interpolation
 * @param {number} v1 the upper bound of the interpolation
 * @param {number} t the ratio by which to interpolate between `a` and `b`
 * @returns {number} a number that is interpolated between `a` and `b` by the
 * ratio provided in `i`
 */
export function lerp(v0: number, v1: number, t: number): number {
  /**
   * prefer precise method
   * @see: https://github.com/mattdesl/lerp/blob/master/index.js
   * @see: https://en.wikipedia.org/wiki/Linear_interpolation#Programming_language_support
   */
  return (1 - t) * v0 + t * v1;
}

/**
 * ## randomBool
 *
 * @export
 * @returns {boolean} a random boolean value
 */
export function randomBool(): boolean {
  return round(random()) === 1;
}

/**
 * ## saw
 * this is a trigonometric function (like Math.sin, or Math.cos), it takes an
 * angle in radians and returns a value between -1 and 1, the "shape" of the
 * returned values follows a linear "sawtooth" pattern
 *
 * @export
 * @param {number} radians a value in radians (clamped between 0 and ππ)
 * @returns {number} a value between -1 and 1 for entry values between 0 and ππ
 */
export function saw(radians: number): number {
  return (radians % ππ) / π - 1;
}

/**
 * ## tri
 * this is a trigonometric function (like Math.sin, or Math.cos), it takes an
 * angle in radians and returns a value between -1 and 1, the "shape" of the
 * returned values follows a linear "triangle wave" pattern
 *
 * @export
 * @param {number} radians a value in radians (clamped between 0 and ππ)
 * @returns {number} a value between -1 and 1 for entry values between 0 and ππ
 */
export function tri(radians: number): number {
  return 1 - 2 * Math.abs(saw(radians));
}

/**
 * ## toDegrees
 * takes an angle in radians and returns that angle in degrees
 *
 * @param {number} radians an angle, in radians
 * @return {number} that same angle, in degrees
 */
export function toDegrees(radians: number): number {
  return (radians * 180) / π;
}

/**
 * ## toRadians
 * takes an angle in degrees and returns that angle in radians
 *
 * @param {number} degrees an angle, in degrees
 * @return {number} that same angle, in radians
 */
export function toRadians(degrees: number): number {
  return (degrees * π) / 180;
}
