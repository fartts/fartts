import Vector from '.';
// import { vec2, vec3, vec4 } from './factories';
// import { sqrt, hypot, toRadians } from '../math';

describe('@fartts/lib/vec', () => {
  test('Vector', () => {
    expect(Vector).toBeDefined();
  });

  /*
  const v2 = vec2([2, 2]);
  const v3 = vec3([3, 3, 3]);
  const v4 = vec4([4, 4, 4, 4]);

  test('dot', () => {
    expect(v2.dot()).toBe(8);
    expect(v3.dot()).toBe(27);
    expect(v4.dot()).toBe(64);
  });

  test('get ρ', () => {
    expect(v2.ρ).toBeCloseTo(hypot(...v2.toArray()));
    expect(v2.ρ).toBeCloseTo(sqrt(8));

    expect(v3.ρ).toBeCloseTo(hypot(...v3.toArray()));
    expect(v3.ρ).toBeCloseTo(sqrt(27));

    expect(v4.ρ).toBeCloseTo(hypot(...v4.toArray()));
    expect(v4.ρ).toBeCloseTo(sqrt(64));
  });

  test('get θ', () => {
    expect(v2.θ).toBe(toRadians(45));
    expect(v3.θ).toBe(NaN);
    expect(v4.θ).toBe(NaN);
  });

  test('toString', () => {
    expect(v2.toString()).toBe('vec2(2,2)');
    expect(v3.toString()).toBe('vec3(3,3,3)');
    expect(v4.toString()).toBe('vec4(4,4,4,4)');
  });
   */
});
