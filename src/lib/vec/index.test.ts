import { indicesByKey, swizzledKeys, vec2, vec3, vec4 } from './index';

describe('vec/index', () => {
  test('vec2, vec3, vec4', () => {
    expect(vec2).toBeDefined();
    expect(vec2(1, 2).length).toEqual([1, 2].length);
    expect(() => vec2(1)).toThrow('not enough data provided for construction');
    expect(() => vec2(1, 2, 3)).toThrow('too many arguments');

    expect(vec3).toBeDefined();

    const yz = vec3(1, 2, 3).yz;
    expect(yz[0]).toBe(2);
    expect(yz[1]).toBe(3);
    expect(yz.length).toBe(2);

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
