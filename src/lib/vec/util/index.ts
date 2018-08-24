const { slice } = [];

export function toArray(acc: number[], arg: Component): number[] {
  return acc.concat(typeof arg === 'number' ? arg : slice.call(arg));
}
