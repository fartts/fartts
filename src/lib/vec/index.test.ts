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
      expect(actual.length).toBe(2);

      // access
      expect(actual.x).toEqual(components[0]);
      expect(actual.y).toEqual(components[1]);

      // swizzling! v2.yx.x === v2.y
      expect((actual.yx as Vector).x).toEqual(components[1]);
      expect(actual.xyxy).toMatchSnapshot();

      // no out of bounds access
      expect(() => actual.z).toThrow('vector field selection out of range');
      expect(() => actual.w).toThrow('vector field selection out of range');

      // assignment
      actual.xy = [actual.x * 2, actual.y * 3];
      expect(actual.x).toEqual(components[0] * 2);
      expect(actual.y).toEqual(components[1] * 3);

      actual.y = actual.x * 2;
      expect(actual.y).toEqual(components[0] * 4);

      // can still do regular index assignment
      actual[1] = 2500;
      expect(actual.y).toEqual(2500);

      // swizzling!
      actual.yx = [100, 200];
      expect(actual.x).toEqual(200);
      expect(actual.y).toEqual(100);

      // these are actually kind of funny, but they'll get caught first
      expect(() => (actual.zyx = [100, 200])).toThrow('not enough arguments');
      expect(() => (actual.zyx = [100, 200, 300, 400])).toThrow(
        'too many arguments',
      );

      // no out of bounds assignment either though
      expect(() => (actual.zyx = [100, 200, 300])).toThrow(
        'vector field selection out of range',
      );
    }
  });

  test.each`
    args                             | error
    ${[1, 2, 3]}                     | ${null}
    ${[[3, 4, 5]]}                   | ${null}
    ${[5, [6, 7]]}                   | ${null}
    ${[new Float32Array([7, 8, 9])]} | ${null}
    ${[1]}                           | ${'not enough arguments'}
    ${[1, 2]}                        | ${'not enough arguments'}
    ${[1, [2]]}                      | ${'not enough arguments'}
    ${[[[9, 0]]]}                    | ${'not enough arguments'}
    ${[1, 2, 3, 4]}                  | ${'too many arguments'}
    ${[[2, 3], 4, 5]}                | ${'too many arguments'}
  `('vec3($args)', ({ args, error }) => {
    const components = args.reduce(toArray, []);

    if (error) {
      expect(() => vec3(...args)).toThrow(error);
    } else {
      const actual = vec3(...args);
      // construction
      expect(actual).toMatchSnapshot();
      expect(actual.length).toBe(3);

      // access
      expect(actual.r).toEqual(components[0]);
      expect(actual.g).toEqual(components[1]);
      expect(actual.b).toEqual(components[2]);

      // swizzling! v3.bgr.r === v2.b
      expect((actual.bgr as Vector).r).toEqual(components[2]);
      expect(actual.bbbb).toMatchSnapshot();

      // no out of bounds access
      expect(() => actual.a).toThrow('vector field selection out of range');
      expect(() => actual.rgba).toThrow('vector field selection out of range');

      // assignment
      actual.rgb = [actual.r * 2, actual.g * 3, actual.b * 4];
      expect(actual.r).toEqual(components[0] * 2);
      expect(actual.g).toEqual(components[1] * 3);
      expect(actual.b).toEqual(components[2] * 4);

      actual.g = actual.r * 2;
      expect(actual.g).toEqual(components[0] * 4);

      // can still do regular index assignment
      actual[2] = 5000;
      expect(actual.b).toEqual(5000);

      // swizzling!
      actual.bgr = [100, 200, 300];
      expect(actual.r).toEqual(300);
      expect(actual.g).toEqual(200);
      expect(actual.b).toEqual(100);

      // these are actually kind of funny, but they'll get caught first
      expect(() => (actual.abgr = [100, 200, 300])).toThrow(
        'not enough arguments',
      );
      expect(() => (actual.abgr = [100, 200, 300, 400, 500])).toThrow(
        'too many arguments',
      );

      // no out of bounds assignment either though
      expect(() => (actual.abgr = [100, 200, 300, 400])).toThrow(
        'vector field selection out of range',
      );
    }
  });

  test.each`
    args                                 | error
    ${[1, 2, 3, 4]}                      | ${null}
    ${[[3, 4, 5, 6]]}                    | ${null}
    ${[5, [6, 7], 8]}                    | ${null}
    ${[new Float32Array([7, 8, 9, 10])]} | ${null}
    ${[1]}                               | ${'not enough arguments'}
    ${[1, 2]}                            | ${'not enough arguments'}
    ${[1, [2, 3]]}                       | ${'not enough arguments'}
    ${[[[9, 0], 1]]}                     | ${'not enough arguments'}
    ${[1, 2, 3, 4, 5]}                   | ${'too many arguments'}
    ${[[1, 2, 3], 4, 5]}                 | ${'too many arguments'}
  `('vec4($args)', ({ args, error }) => {
    const components = args.reduce(toArray, []);

    if (error) {
      expect(() => vec4(...args)).toThrow(error);
    } else {
      const actual = vec4(...args);
      // construction
      expect(actual).toMatchSnapshot();
      expect(actual.length).toBe(4);

      // access
      expect(actual.s).toEqual(components[0]);
      expect(actual.t).toEqual(components[1]);
      expect(actual.p).toEqual(components[2]);
      expect(actual.q).toEqual(components[3]);

      // swizzling! v4.qpts.s === v4.q
      expect((actual.qpts as Vector).s).toEqual(components[3]);
      expect(actual.sstt).toMatchSnapshot();

      // assignment
      actual.stpq = [actual.s * 2, actual.t * 3, actual.p * 4, actual.q * 5];
      expect(actual.s).toEqual(components[0] * 2);
      expect(actual.t).toEqual(components[1] * 3);
      expect(actual.p).toEqual(components[2] * 4);
      expect(actual.q).toEqual(components[3] * 5);

      actual.t = actual.s * 2;
      expect(actual.t).toEqual(components[0] * 4);

      // can still do regular index assignment
      actual[3] = 10000;
      expect(actual.q).toEqual(10000);

      // swizzling!
      actual.qpts = [100, 200, 300, 400];
      expect(actual.s).toEqual(400);
      expect(actual.t).toEqual(300);
      expect(actual.p).toEqual(200);
      expect(actual.q).toEqual(100);
    }
  });
});
