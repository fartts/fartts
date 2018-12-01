import { vec2, vec3, vec4 } from '.';

describe('@fartts/lib/vec', () => {
  test.each`
    v                   | result
    ${vec2(2, 2)}       | ${'vec2(2,2)'}
    ${vec3(3, 3, 3)}    | ${'vec3(3,3,3)'}
    ${vec4(4, 4, 4, 4)} | ${'vec4(4,4,4,4)'}
  `('toString should be $result', ({ v, result }) => {
    expect(v.toString()).toEqual(result);
  });

  test.each`
    args            | components   | error
    ${[]}           | ${[0, 0]}    | ${undefined}
    ${[1]}          | ${[1, 1]}    | ${undefined}
    ${[1, 2]}       | ${[1, 2]}    | ${undefined}
    ${[[3, 4]]}     | ${[3, 4]}    | ${undefined}
    ${[5, [6]]}     | ${[5, 6]}    | ${undefined}
    ${[vec2(7, 8)]} | ${[7, 8]}    | ${undefined}
    ${[1, 2, 3]}    | ${[1, 2, 3]} | ${'Too many'}
    ${[[2, 3], 4]}  | ${[2, 3, 4]} | ${'Too many'}
  `('vec2($args)', ({ args, components, error }) => {
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
      expect(actual.yx.x).toEqual(components[1]);
      expect(actual.xyxy).toMatchSnapshot();
      expect(vec3(actual, 0)).toMatchSnapshot();
      expect(vec4(actual, actual)).toMatchSnapshot();

      // assignment
      actual.xy = vec2([actual.x * 2, actual.y * 3]);
      expect(actual.x).toEqual(components[0] * 2);
      expect(actual.y).toEqual(components[1] * 3);

      actual.y = actual.x * 2;
      expect(actual.y).toEqual(components[0] * 4);

      // can still do regular index assignment
      actual[1] = 2500;
      expect(actual.y).toEqual(2500);

      // swizzling!
      actual.yx = vec2(100, 200);
      expect(actual.x).toEqual(200);
      expect(actual.y).toEqual(100);
    }
  });

  test.each`
    args                 | components      | error
    ${[]}                | ${[0, 0, 0]}    | ${undefined}
    ${[1]}               | ${[1, 1, 1]}    | ${undefined}
    ${[1, 2, 3]}         | ${[1, 2, 3]}    | ${undefined}
    ${[[3, 4, 5]]}       | ${[3, 4, 5]}    | ${undefined}
    ${[5, [6, 7]]}       | ${[5, 6, 7]}    | ${undefined}
    ${[vec3([7, 8, 9])]} | ${[7, 8, 9]}    | ${undefined}
    ${[1, 2]}            | ${[1, 2]}       | ${'Not enough'}
    ${[1, [2]]}          | ${[1, 2]}       | ${'Not enough'}
    ${[[[9, 0]]]}        | ${[[9, 0]]}     | ${'Invalid'}
    ${[1, 2, 3, 4]}      | ${[1, 2, 3, 4]} | ${'Too many'}
    ${[[2, 3], 4, 5]}    | ${[2, 3, 4, 5]} | ${'Too many'}
  `('vec3($args)', ({ args, components, error }) => {
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
      expect(actual.bgr.r).toEqual(components[2]);
      expect(actual.bbbb).toMatchSnapshot();
      expect(vec4(actual, 0)).toMatchSnapshot();

      // assignment
      actual.rgb = vec3([actual.r * 2, actual.g * 3, actual.b * 4]);
      expect(actual.r).toEqual(components[0] * 2);
      expect(actual.g).toEqual(components[1] * 3);
      expect(actual.b).toEqual(components[2] * 4);

      actual.g = actual.r * 2;
      expect(actual.g).toEqual(components[0] * 4);

      // can still do regular index assignment
      actual[2] = 5000;
      expect(actual.b).toEqual(5000);

      // swizzling!
      actual.bgr = vec3(100, 200, 300);
      expect(actual.r).toEqual(300);
      expect(actual.g).toEqual(200);
      expect(actual.b).toEqual(100);
    }
  });

  test.each`
    args                     | components         | error
    ${[]}                    | ${[0, 0, 0, 0]}    | ${undefined}
    ${[1]}                   | ${[1, 1, 1, 1]}    | ${undefined}
    ${[1, 2, 3, 4]}          | ${[1, 2, 3, 4]}    | ${undefined}
    ${[[3, 4, 5, 6]]}        | ${[3, 4, 5, 6]}    | ${undefined}
    ${[5, [6, 7], 8]}        | ${[5, 6, 7, 8]}    | ${undefined}
    ${[vec4([7, 8, 9, 10])]} | ${[7, 8, 9, 10]}   | ${undefined}
    ${[1, 2]}                | ${[1, 2]}          | ${'Not enough'}
    ${[1, [2, 3]]}           | ${[1, 2, 3]}       | ${'Not enough'}
    ${[[[9, 0, 1]]]}         | ${[[9, 0, 1]]}     | ${'Invalid'}
    ${[1, 2, 3, 4, 5]}       | ${[1, 2, 3, 4, 5]} | ${'Too many'}
    ${[[1, 2, 3], 4, 5]}     | ${[1, 2, 3, 4, 5]} | ${'Too many'}
  `('vec4($args)', ({ args, components, error }) => {
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
      expect(actual.qpts.s).toEqual(components[3]);
      expect(actual.sstt).toMatchSnapshot();
      expect(vec4(actual.st, actual.ts)).toMatchSnapshot();
      expect(vec4(actual.ttt, 0)).toMatchSnapshot();

      // assignment
      actual.stpq = vec4([
        actual.s * 2,
        actual.t * 3,
        actual.p * 4,
        actual.q * 5,
      ]);
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
      actual.qpts = vec4(100, 200, 300, 400);
      expect(actual.s).toEqual(400);
      expect(actual.t).toEqual(300);
      expect(actual.p).toEqual(200);
      expect(actual.q).toEqual(100);
    }
  });
});
