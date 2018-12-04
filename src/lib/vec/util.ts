import { slice } from '../core/util';

/**
 * ## toArray
 *
 * @export
 * @param {number[]} acc
 * @param {(number | number[] | Float32Array)} arg
 * @returns {number[]}
 */
export function toArray(
  acc: number[],
  arg: number | number[] | Float32Array,
): number[] {
  return acc.concat(arg instanceof Float32Array ? slice.call(arg) : arg);
}
