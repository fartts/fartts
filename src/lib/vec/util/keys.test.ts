import { swizzledKeys, indicesByKey } from '@fartts/lib/vec/util/keys';

describe('@fartts/lib/vec/util/keys', () => {
  test('config', () => {
    expect({
      indicesByKey,
      swizzledKeys,
    }).toMatchSnapshot();

    expect(indicesByKey.size).toBe(4 * 3);
    expect(swizzledKeys.size).toBe((4 + 4 ** 2 + 4 ** 3 + 4 ** 4) * 3);
  });
});
