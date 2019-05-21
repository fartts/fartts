import seedRandom from 'seedrandom';
import { lerp, round } from './math';

const name = '@fartts/fartts';
export const random = seedRandom(name);

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
 * ## randomInt
 *
 * @export
 * @param {number} a
 * @param {number} [b]
 * @returns {number}
 */
export function randomInt(a: number, b?: number): number {
  return round(b === undefined ? randomRange(0, a) : randomRange(a, b));
}

/**
 * ## randomRange
 *
 * @export
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
export function randomRange(a: number, b: number): number {
  return lerp(a, b, random());
}
