const { slice } = [];

export function toArray(acc: number[], arg: Component): number[] {
  return acc.concat(typeof arg === 'number' ? arg : slice.call(arg));
}

export enum Validates {
  Construction = 'construction',
  Assignment = 'assignment',
}

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
