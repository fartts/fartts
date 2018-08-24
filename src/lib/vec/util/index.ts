const { slice } = [];

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
 * ## validate
 *
 * @export
 * @param {number} targetSize
 * @param {number} receivedSize
 * @param {Validates} validates
 * @returns {void}
 */
export function validate(
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
