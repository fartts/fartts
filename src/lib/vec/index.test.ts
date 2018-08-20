import { config, Vec2, Vec3, Vec4 } from './index';

const { keys } = Object;

describe('vec/index', () => {
  test('Vec2, Vec3, Vec4', () => {
    expect(Vec2).toBeDefined();
    expect(new Vec2([]).length).toEqual([].length);
    expect(() => new Vec2([1, 2, 3])).toThrow('Vec2');
    expect(Vec3).toBeDefined();
    expect(Vec4).toBeDefined();
  });

  test('config', () => {
    expect(config).toMatchSnapshot();
    expect(keys(config.keyedIndices).length).toBe(4 * 3);
    expect(config.swizzledKeys.size).toBe((4 + 4 ** 2 + 4 ** 3 + 4 ** 4) * 3);
  });
});
