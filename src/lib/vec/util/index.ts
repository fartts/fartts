import { Component } from '../index.d';

export const { slice } = [];

/**
 * ## toArray
 *
 * @export
 * @param {number[]} acc
 * @param {Component} arg
 * @returns {number[]}
 */
export function toArray(acc: number[], arg: Component): number[] {
  return acc.concat(typeof arg === 'number' ? arg : slice.call(arg));
}

export enum Validates {
  Construction = 'construction',
  Assignment = 'assignment',
}

/**
 * ## validateKeys
 *
 * @export
 * @param {number} targetSize
 * @param {number} receivedSize
 * @param {Validates} validates
 * @returns {void}
 */
export function validateKeys(
  targetSize: number,
  receivedSize: number,
  validates: Validates,
): void {
  if (targetSize === receivedSize) {
    return;
  }

  throw new Error(
    `${
      targetSize > receivedSize ? 'not enough' : 'too many'
    } arguments provided for ${validates}`,
  );
}

/**
 * ## validateRange
 *
 * @export
 * @param {number} index
 * @param {number} upperBound
 * @param {number} [lowerBound=-1]
 * @returns {void}
 */
export function validateRange(
  index: number,
  upperBound: number,
  lowerBound: number = -1,
): void {
  if (lowerBound < index && index < upperBound) {
    return;
  }

  throw new Error('vector field selection out of range');
}
