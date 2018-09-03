import { vec2, vec3, vec4, getLeft, getZeros } from './factories';
import { dot, ρ, θ, clone, add, sub, mul, div, norm, lerp } from './math';
import { hypot, sqrt, π, toRadians } from '../math';

describe('@fartts/lib/vec/math', () => {
  const v2 = vec2(2, 2);
  const v3 = vec3(3, 3, 3);
  const v4 = vec4(4, 4, 4, 4);

  test.each`
    a     | b     | result  | error
    ${v2} | ${v3} | ${null} | ${'wrong operand types'}
    ${v3} | ${v4} | ${null} | ${'wrong operand types'}
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
    a     | b                      | result
    ${v2} | ${getZeros(v2.length)} | ${0}
    ${v3} | ${getZeros(v3.length)} | ${0}
    ${v4} | ${getZeros(v4.length)} | ${0}
    ${v2} | ${getLeft(v2.length)}  | ${π / 4}
    ${v2} | ${getLeft(v2.length)}  | ${toRadians(45)}
    ${v3} | ${getLeft(v3.length)}  | ${π / 3.2885355431}
    ${v3} | ${getLeft(v3.length)}  | ${toRadians(54.735610317245346)}
    ${v4} | ${getLeft(v4.length)}  | ${π / 3}
    ${v4} | ${getLeft(v4.length)}  | ${toRadians(60)}
  `('θ($a, $b) should be $result', ({ a, b, result }) => {
    expect(θ(a, b)).toBeCloseTo(result);
  });

  test.each`
    v     | result
    ${v2} | ${v2}
    ${v3} | ${v3}
    ${v4} | ${v4}
  `('clone($v) should be $result', ({ v, result }) => {
    // it's a different instance
    expect(clone(v)).not.toBe(result);
    // with the same values
    expect(clone(v).toString()).toEqual(result.toString());
  });

  test.each`
    a     | b                   | result
    ${v2} | ${1}                | ${'vec2(3,3)'}
    ${v2} | ${vec2(2, 3)}       | ${'vec2(4,5)'}
    ${v3} | ${2}                | ${'vec3(5,5,5)'}
    ${v3} | ${vec3(3, 4, 5)}    | ${'vec3(6,7,8)'}
    ${v4} | ${3}                | ${'vec4(7,7,7,7)'}
    ${v4} | ${vec4(5, 6, 7, 8)} | ${'vec4(9,10,11,12)'}
  `('add($a, $b) should be $result', ({ a, b, result }) => {
    expect(add(a, b).toString()).toEqual(result);
  });

  test.each`
    a     | b                   | result
    ${v2} | ${1}                | ${'vec2(1,1)'}
    ${v2} | ${vec2(2, 3)}       | ${'vec2(0,-1)'}
    ${v3} | ${2}                | ${'vec3(1,1,1)'}
    ${v3} | ${vec3(3, 4, 5)}    | ${'vec3(0,-1,-2)'}
    ${v4} | ${3}                | ${'vec4(1,1,1,1)'}
    ${v4} | ${vec4(5, 6, 7, 8)} | ${'vec4(-1,-2,-3,-4)'}
  `('sub($a, $b) should be $result', ({ a, b, result }) => {
    expect(sub(a, b).toString()).toEqual(result);
  });

  test.each`
    a     | b                   | result
    ${v2} | ${10}               | ${'vec2(20,20)'}
    ${v2} | ${vec2(2, 3)}       | ${'vec2(4,6)'}
    ${v3} | ${2}                | ${'vec3(6,6,6)'}
    ${v3} | ${vec3(3, 4, 5)}    | ${'vec3(9,12,15)'}
    ${v4} | ${3}                | ${'vec4(12,12,12,12)'}
    ${v4} | ${vec4(5, 6, 7, 8)} | ${'vec4(20,24,28,32)'}
  `('mul($a, $b) should be $result', ({ a, b, result }) => {
    expect(mul(a, b).toString()).toEqual(result);
  });

  test.each`
    a     | b                   | result
    ${v2} | ${10}               | ${'vec2(0.2,0.2)'}
    ${v2} | ${vec2(2, 3)}       | ${'vec2(1,0.6666666666666666)'}
    ${v3} | ${2}                | ${'vec3(1.5,1.5,1.5)'}
    ${v3} | ${vec3(3, 4, 5)}    | ${'vec3(1,0.75,0.6)'}
    ${v4} | ${3}                | ${'vec4(1.3333333333333333,1.3333333333333333,1.3333333333333333,1.3333333333333333)'}
    ${v4} | ${vec4(5, 6, 7, 8)} | ${'vec4(0.8,0.6666666666666666,0.5714285714285714,0.5)'}
  `('div($a, $b) should be $result', ({ a, b, result }) => {
    expect(div(a, b).toString()).toEqual(result);
  });

  test.each`
    v     | result
    ${v2} | ${vec2(0.7071067811865475, 0.7071067811865475)}
    ${v3} | ${vec3(0.5773502691896257, 0.5773502691896257, 0.5773502691896257)}
    ${v4} | ${vec4(0.5, 0.5, 0.5, 0.5)}
  `('norm($v) should be $result', ({ v, result }) => {
    expect(norm(v)).toEqual(result);
  });

  test.each`
    a     | b                      | i                                   | result
    ${v2} | ${getZeros(v2.length)} | ${1 / 2}                            | ${'vec2(1,1)'}
    ${v2} | ${getZeros(v2.length)} | ${vec2(2, 3)}                       | ${'vec2(-2,-4)'}
    ${v3} | ${getZeros(v3.length)} | ${2 / 3}                            | ${'vec3(1,1,1)'}
    ${v3} | ${getZeros(v3.length)} | ${vec3(1 / 3, 1 / 4, 1 / 5)}        | ${'vec3(2,2.25,2.4)'}
    ${v4} | ${getZeros(v4.length)} | ${1 / 4}                            | ${'vec4(3,3,3,3)'}
    ${v4} | ${getZeros(v4.length)} | ${vec4(2 / 5, 1 / 3, 2 / 7, 3 / 8)} | ${'vec4(2.4,2.666666666666667,2.857142857142857,2.5)'}
  `('lerp($a, $b, $i) should be $result', ({ a, b, i, result }) => {
    expect(lerp(a, b, i).toString()).toEqual(result);
  });
});
