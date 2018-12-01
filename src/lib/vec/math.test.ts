import { add, sub, mul, div } from './math';
import { vec2, vec3, vec4 } from '.';

describe('@fartts/lib/vec/math', () => {
  const v2 = vec2(2, 2);
  const v3 = vec3(3, 3, 3);
  const v4 = vec4(4, 4, 4, 4);

  test.each`
    v     | result
    ${v2} | ${'vec2(2,2)'}
    ${v3} | ${'vec3(3,3,3)'}
    ${v4} | ${'vec4(4,4,4,4)'}
  `('toString should be $result', ({ v, result }) => {
    expect(v.toString()).toEqual(result);
  });

  test.each`
    a     | b             | result
    ${v2} | ${1}          | ${'vec2(3,3)'}
    ${v2} | ${vec2(2, 3)} | ${'vec2(4,5)'}
  `('add($a, $b) should be $result', ({ a, b, result }) => {
    expect(add(a, b).toString()).toEqual(result);
  });

  test.each`
    a     | b             | result
    ${v2} | ${1}          | ${'vec2(1,1)'}
    ${v2} | ${vec2(2, 3)} | ${'vec2(0,-1)'}
  `('sub($a, $b) should be $result', ({ a, b, result }) => {
    expect(sub(a, b).toString()).toEqual(result);
  });

  test.each`
    a     | b             | result
    ${v2} | ${10}         | ${'vec2(20,20)'}
    ${v2} | ${vec2(2, 3)} | ${'vec2(4,6)'}
  `('mul($a, $b) should be $result', ({ a, b, result }) => {
    expect(mul(a, b).toString()).toEqual(result);
  });

  test.each`
    a     | b             | result
    ${v2} | ${10}         | ${'vec2(0.20000000298023224,0.20000000298023224)'}
    ${v2} | ${vec2(2, 3)} | ${'vec2(1,0.6666666865348816)'}
  `('div($a, $b) should be $result', ({ a, b, result }) => {
    expect(div(a, b).toString()).toEqual(result);
  });
});
