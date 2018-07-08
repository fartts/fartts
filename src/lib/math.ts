import seedRandom from 'seedrandom';

export const random = seedRandom('fart.ts');
export const {
  abs,
  acos,
  atan2,
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

export function lerp(a: number, b: number, i: number): number {
  return a + (b - a) * i;
}

export function randomBool(): boolean {
  return round(random()) === 1;
}

/**
 * ## saw
 * @param  {Number} radians a value in radians (clamped between 0 and ππ)
 * @return {Number}         a value between -1 and 1 for entry values between 0
 *                          and ππ
 */
export function saw(radians: number) {
  return (radians % ππ) / π - 1;
}

/**
 * ## tri
 * @param  {Number} radians a value in radians (clamped between 0 and ππ)
 * @return {Number}         a value between -1 and 1 for entry values between 0
 *                          and ππ
 */
export function tri(radians: number) {
  return 1 - 2 * Math.abs(saw(radians));
}

/**
 * ## toDegrees
 * takes an angle in radians and returns that angle in degrees
 *
 * @param {number} radians - an angle, in radians
 * @return {number} - that same angle, in degrees
 */
export function toDegrees(radians: number): number {
  return (radians * 180) / π;
}

/**
 * ## toRadians
 * takes an angle in degrees and returns that angle in radians
 *
 * @param {number} degrees - an angle, in degrees
 * @return {number} - that same angle, in radians
 */
export function toRadians(degrees: number): number {
  return (degrees * π) / 180;
}
