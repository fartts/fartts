import Vector from '.';
import { vec2, vec3, vec4 } from './factories';
import { dot, ρ, θ, clone, add, sub, mul, div, norm, lerp } from './math';
import { hypot, sqrt, π, toRadians } from '../math';

describe('@fartts/lib/vec/math', () => {
  const { origin, left } = Vector;

  const v2 = vec2(2, 2);
  const v3 = vec3(3, 3, 3);
  const v4 = vec4(4, 4, 4, 4);

  test.each`
    a     | b     | result  | error
    ${v2} | ${v3} | ${null} | ${'expected vectors of equal length'}
    ${v3} | ${v4} | ${null} | ${'expected vectors of equal length'}
    ${v2} | ${v2} | ${8}    | ${null}
    ${v3} | ${v3} | ${27}   | ${null}
    ${v4} | ${v4} | ${64}   | ${null}
  `(
    'dot($a, $b) should be $result or throw $error',
    ({ a, b, result, error }) => {
      if (error) {
        expect(() => dot(a, b)).toThrow(error);
      } else {
        expect(dot(a, b)).toBe(result);
      }
    },
  );

  test.each`
    v     | result
    ${v2} | ${sqrt(8)}
    ${v2} | ${hypot(...v2)}
    ${v3} | ${sqrt(27)}
    ${v3} | ${hypot(...v3)}
    ${v4} | ${sqrt(64)}
    ${v4} | ${hypot(...v4)}
  `('ρ($v) should be $result', ({ v, result }) => {
    expect(ρ(v)).toBe(result);
  });

  test.each`
    a     | b            | result                           | error
    ${v2} | ${origin[0]} | ${null}                          | ${'cannot get θ between vectors'}
    ${v3} | ${origin[1]} | ${null}                          | ${'cannot get θ between vectors'}
    ${v4} | ${origin[2]} | ${null}                          | ${'cannot get θ between vectors'}
    ${v2} | ${left[0]}   | ${π / 4}                         | ${null}
    ${v2} | ${left[0]}   | ${toRadians(45)}                 | ${null}
    ${v3} | ${left[1]}   | ${π / 3.2885355431}              | ${null}
    ${v3} | ${left[1]}   | ${toRadians(54.735610317245346)} | ${null}
    ${v4} | ${left[2]}   | ${π / 3}                         | ${null}
    ${v4} | ${left[2]}   | ${toRadians(60)}                 | ${null}
  `(
    'θ($a, $b) should be $result or throw $error',
    ({ a, b, result, error }) => {
      if (error) {
        expect(() => θ(a, b)).toThrow(error);
      } else {
        expect(θ(a, b)).toBeCloseTo(result);
      }
    },
  );

  test('clone', () => {
    // expect(clone()).toEqual();
  });

  test('add', () => {
    // expect(add()).toEqual();
  });

  test('sub', () => {
    // expect(sub()).toEqual();
  });

  test('mul', () => {
    // expect(mul()).toEqual();
  });

  test('div', () => {
    // expect(div()).toEqual();
  });

  test('norm', () => {
    // expect(norm()).toEqual();
  });

  test('lerp', () => {
    // expect(lerp()).toEqual();
  });
});
