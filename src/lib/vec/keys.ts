/**
 * ## toKeyIndexPairs
 *
 * @param {Array<[string, number]>} acc
 * @param {string} key
 * @param {number} i
 * @returns {Array<[string, number]>}
 */
function toKeyIndexPairs(
  acc: Array<[string, number]>,
  key: string,
  i: number,
): Array<[string, number]> {
  return [...acc, [key, i]];
}

export function toKeyIndexMap(baseKeys: string[][]) {
  return new Map(
    baseKeys.reduce(
      (acc: Array<[string, number]>, keys) => [
        ...acc,
        ...keys.reduce(toKeyIndexPairs, []),
      ],
      [],
    ),
  );
}

/**
 * ## toSwizzled
 *
 * @param {string[]} keys
 * @param {string} [key='']
 * @param {number} [depth=4]
 * @returns {Iterable<string>}
 */
function* toSwizzled(keys: string[], key = '', depth = 4): Iterable<string> {
  if (key.length === depth) {
    return;
  }

  for (const k of keys) {
    const nextKey = `${key}${k}`;
    yield nextKey;
    yield* toSwizzled(keys, nextKey);
  }
}

export function toSwizzledSet(baseKeys: string[][]) {
  return new Set(
    baseKeys.reduce(
      (acc: string[], keys) => [...acc, ...Array.from(toSwizzled(keys))],
      [],
    ),
  );
}
