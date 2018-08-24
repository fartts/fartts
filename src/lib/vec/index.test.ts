import { vec2, vec3, vec4 } from './index';

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
    }).toThrow('not enough data provided for assignment');

    expect(() => {
      stpq.pq = [1, 2, 3];
    }).toThrow('too many arguments');

    expect(stpq.s).toBe(3);
    stpq.s = 1;
    stpq[1] = 2;
    expect([].slice.call(stpq.st)).toEqual([1, 2]);
  });
});
