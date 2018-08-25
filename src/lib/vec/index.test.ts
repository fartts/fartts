import { toArray } from './util';
import { vec2, vec3, vec4 } from './index';

describe('@fartts/lib/vec', () => {
  test.each`
    args                          | error
    ${[1, 2]}                     | ${null}
    ${[[3, 4]]}                   | ${null}
    ${[5, [6]]}                   | ${null}
    ${[new Float32Array([7, 8])]} | ${null}
    ${[1]}                        | ${'not enough arguments'}
    ${[[[9, 0]]]}                 | ${'not enough arguments'}
    ${[1, 2, 3]}                  | ${'too many arguments'}
    ${[[2, 3], 4]}                | ${'too many arguments'}
  `('vec2($args)', ({ args, error }) => {
    const components = args.reduce(toArray, []);

    if (error) {
      expect(() => vec2(...args)).toThrow(error);
    } else {
      const actual = vec2(...args);
      // construction
      expect(actual).toMatchSnapshot();

      // access
      expect(actual.x).toEqual(components[0]);
      expect(actual.y).toEqual(components[1]);

      // swizzling! v2.yx.x === v2.y
      expect((actual.yx as Vector).x).toEqual(components[1]);

      // assignment
      actual.xy = [actual.x * 2, actual.y * 3];
      expect(actual.x).toEqual(components[0] * 2);
      expect(actual.y).toEqual(components[1] * 3);

      actual.y = actual.x * 2;
      expect(actual.y).toEqual(components[0] * 4);
    }
  });

  test('vec2, vec3, vec4', () => {
    expect(vec2).toBeDefined();
    expect(vec2(1, 2).length).toEqual([1, 2].length);
    expect(() => vec2(1)).toThrow(
      'not enough arguments provided for construction',
    );
    expect(() => vec2(1, 2, 3)).toThrow(
      'too many arguments provided for construction',
    );

    const threeFour = vec2(3, 4);
    expect(() => threeFour.xyzw).toThrow('vector field selection out of range');
    expect(() => threeFour.xyxy).not.toThrow();
    expect(threeFour).toMatchSnapshot();

    expect(vec3).toBeDefined();
    const yz = vec3(1, 2, 3).yz;
    expect(yz[0]).toBe(2);
    expect(yz[1]).toBe(3);
    expect(yz.length).toBe(2);

    expect(vec4).toBeDefined();
    const bgr = vec4(yz, 1, 0).bgr;
    expect(bgr[0]).toBe(1);
    expect(bgr[1]).toBe(3);
    expect(bgr[2]).toBe(2);

    const stpq = vec4(1, 2, 3, 4);
    stpq.st = stpq.pq;
    expect(stpq[0]).toBe(3);
    expect(stpq[1]).toBe(4);
    expect(stpq[2]).toBe(3);
    expect(stpq[3]).toBe(4);

    expect(() => {
      stpq.pq = [1];
    }).toThrow('not enough arguments provided for assignment');

    expect(() => {
      stpq.pq = [1, 2, 3];
    }).toThrow('too many arguments provided for assignment');

    expect(stpq.s).toBe(3);
    stpq.s = 1;
    stpq[1] = 2;
    expect([].slice.call(stpq.st)).toEqual([1, 2]);
  });
});
