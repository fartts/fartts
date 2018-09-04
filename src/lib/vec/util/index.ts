import Vector from '@fartts/lib/vec';
import { Component } from '@fartts/lib/vec/types';

/**
 * ## toArray
 *
 * @export
 * @param {number[]} acc
 * @param {Component} arg
 * @returns {number[]}
 */
export function toArray(acc: number[], arg: Component): number[] {
  return acc.concat(arg);
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

  throw new Error(`${index} out of range [${lowerBound}, ${upperBound}]`);
}

export function validateOperands(
  operation: string,
  leftHand: Vector,
  rightHand: Vector,
) {
  if (leftHand.length === rightHand.length) {
    return;
  }

  throw new Error(
    [
      `wrong operand types - no operation ${operation} exists that takes a`,
      `left-hand operand of type '${leftHand.length}-component vector' and a`,
      `right operand of type 'const ${rightHand.length}-component vector' (or`,
      'there is no acceptable conversion)',
    ].join(' '),
  );
}
