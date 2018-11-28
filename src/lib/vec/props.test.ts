import { createProps } from './props';

describe('@fartts/lib/vec/props', () => {
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
    baseKeys
    ${vec2Keys}
    ${vec3Keys}
    ${vec4Keys}
  `('produces a PropertyDescriptorsMap', ({ baseKeys }) => {
    interface Swizzled {
      x: number;
      xy: number[];
    }

    class Swizzled extends Float32Array {}

    const props = createProps<Swizzled>(baseKeys);
    expect(props).toMatchSnapshot();
    Object.defineProperties(Swizzled.prototype, props);

    const v = baseKeys[0].length;
    const swiz = new Swizzled(v).fill(v);

    expect(swiz.x).toBe(v);
    expect(swiz.xy[0]).toBe(v);
    expect(swiz.xy[1]).toBe(v);

    expect(() => {
      swiz.x = v + 1;
    }).not.toThrow();
    expect(swiz.x).toBe(v + 1);
    expect(swiz.xy[0]).toBe(v + 1);

    expect(() => {
      swiz.xy = [v + 2, v + 3];
    }).not.toThrow();
    expect(swiz.xy[0]).toBe(v + 2);
    expect(swiz.xy[1]).toBe(v + 3);

    expect(() => {
      swiz.xy = [v + 4];
    }).toThrow('Dimension mismatch');

    expect(() => {
      swiz.xy = [v + 5, v + 6, v + 7];
    }).toThrow('Dimension mismatch');

    expect(() => {
      swiz.xy = [v + 8, 'a'];
    }).toThrow('Cannot assign');
  });
});
