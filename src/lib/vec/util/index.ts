const { slice } = [];

export function toArray(
  acc: number[],
  arg: Component<Vec2 | Vec3 | Vec4>,
): number[] {
  return acc.concat(typeof arg === 'number' ? arg : slice.call(arg));
}

export enum Validates {
  Construction = 'construction',
  Assignment = 'assignment',
}

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
