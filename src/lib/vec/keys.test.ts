import { toKeyIndexMap, toSwizzledSet } from './keys';

describe('@fartts/lib/vec/keys', () => {
  const vec2Keys = [
    // prettier-ignore
    ['x', 'y'],
    ['r', 'g'],
    ['s', 't'],
  ];

  const vec3Keys = [
    // prettier-ignore
    ['x', 'y', 'z'],
    ['r', 'g', 'b'],
    ['s', 't', 'p'],
  ];

  const vec4Keys = [
    // prettier-ignore
    ['x', 'y', 'z', 'w'],
    ['r', 'g', 'b', 'a'],
    ['s', 't', 'p', 'q'],
  ];

  test.each`
    baseKeys    | keyIndexMapSize | swizzledSetSize
    ${vec2Keys} | ${2 * 3}        | ${(2 ** 1 + 2 ** 2 + 2 ** 3 + 2 ** 4) * 3}
    ${vec3Keys} | ${3 * 3}        | ${(3 ** 1 + 3 ** 2 + 3 ** 3 + 3 ** 4) * 3}
    ${vec4Keys} | ${4 * 3}        | ${(4 ** 1 + 4 ** 2 + 4 ** 3 + 4 ** 4) * 3}
  `(
    'produces a keyIndexMap of size $keyIndexMapSize and a a swizzledSet of size $swizzledSetSize',
    ({ baseKeys, keyIndexMapSize, swizzledSetSize }) => {
      const keyIndexMap = toKeyIndexMap(baseKeys);
      const swizzledSet = toSwizzledSet(baseKeys);

      expect({
        keyIndexMap,
        swizzledSet,
      }).toMatchSnapshot();

      expect(keyIndexMap.size).toBe(keyIndexMapSize);
      expect(swizzledSet.size).toBe(swizzledSetSize);
    },
  );
});
