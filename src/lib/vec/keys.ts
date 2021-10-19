/**
 * ## toKeyIndexPairs
 *
 * @param {[string, number][]} acc
 * @param {string} key
 * @param {number} i
 * @returns {[string, number][]}
 */
function toKeyIndexPairs(
  acc: [string, number][],
  key: string,
  i: number,
): [string, number][] {
  return [...acc, [key, i]];
}

/**
 * ## toKeyIndexMap
 *
 * @export
 * @param {string[][]} baseKeys
 * @returns {Map<string, number>}
 */
export function toKeyIndexMap(baseKeys: string[][]): Map<string, number> {
  return new Map(
    baseKeys.reduce(
      (acc: [string, number][], keys) => [
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

/**
 * ## toSwizzledSet
 *
 * @export
 * @param {string[][]} baseKeys
 * @returns {Set<string>}
 */
export function toSwizzledSet(baseKeys: string[][]): Set<string> {
  return new Set(
    baseKeys.reduce(
      (acc: string[], keys) => [...acc, ...Array.from(toSwizzled(keys))],
      [],
    ),
  );
}
