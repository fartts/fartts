import { indicesByKey, swizzledKeys, vec2, vec3, vec4 } from './index';

describe('vec/index', () => {
  test('vec2, vec3, vec4', () => {
    expect(vec2).toBeDefined();
    expect(vec2(1, 2).length).toEqual([1, 2].length);
    expect(() => vec2(1)).toThrow('not enough data provided for construction');
    expect(() => vec2(1, 2, 3)).toThrow('too many arguments');

    expect(vec3).toBeDefined();

    expect(vec4).toBeDefined();
  });

  test('config', () => {
    expect({
      indicesByKey,
      swizzledKeys,
    }).toMatchSnapshot();

    expect(indicesByKey.size).toBe(4 * 3);
    expect(swizzledKeys.size).toBe((4 + 4 ** 2 + 4 ** 3 + 4 ** 4) * 3);
  });
});
