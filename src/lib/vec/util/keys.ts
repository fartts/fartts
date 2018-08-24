/**
 * ## toSwizzled
 *
 * @param {string[]} swizzled
 * @param {string} _
 * @param {number} i
 * @param {string[]} keys
 * @returns {string[]}
 */
function toSwizzled(
  swizzled: string[],
  _: string,
  i: number,
  keys: string[],
): string[] {
  const toSwizzledDepth = (swizzledDepth: string[], key: string): string[] =>
    swizzledDepth.concat(keys.map(k => `${key}${k}`));

  return i > 0 ? swizzled.reduce(toSwizzledDepth, keys) : swizzled;
}

/**
 * ## toIndicesByKey
 *
 * @param {Array<[string, number]>} acc
 * @param {string} key
 * @param {number} i
 * @returns {Array<[string, number]>}
 */
function toIndicesByKey(
  acc: Array<[string, number]>,
  key: string,
  i: number,
): Array<[string, number]> {
  return [...acc, [key, i]];
}

const baseKeys = [
  ['x', 'y', 'z', 'w'],
  ['s', 't', 'p', 'q'],
  ['r', 'g', 'b', 'a'],
];

export const swizzledKeys = new Set(
  baseKeys.reduce(
    (acc: string[], keys: string[]) => [
      ...acc,
      ...keys.reduceRight(toSwizzled, keys),
    ],
    [],
  ),
);

export const indicesByKey = new Map(
  baseKeys.reduce(
    (acc: Array<[string, number]>, keys: string[]) => [
      ...acc,
      ...keys.reduce(toIndicesByKey, []),
    ],
    [],
  ),
);
