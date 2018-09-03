import { vec2, vec3, vec4 } from './factories';
import { dot, ρ, θ } from './math';
import { hypot, sqrt, π, toRadians } from '../math';

describe('@fartts/lib/vec/math', () => {
  const v2 = vec2(2, 2);
  const v3 = vec3(3, 3, 3);
  const v4 = vec4(4, 4, 4, 4);

  test('dot', () => {
    expect(() => dot(v2, v3)).toThrow();
    expect(() => dot(v3, v4)).toThrow();

    expect(dot(v2, v2)).toBe(8);
    expect(dot(v3, v3)).toBe(27);
    expect(dot(v4, v4)).toBe(64);
  });

  test('ρ', () => {
    expect(ρ(v2)).toBe(sqrt(8));
    expect(ρ(v2)).toBe(hypot(...v2.toArray()));

    expect(ρ(v3)).toBe(sqrt(27));
    expect(ρ(v3)).toBe(hypot(...v3.toArray()));

    expect(ρ(v4)).toBe(sqrt(64));
    expect(ρ(v4)).toBe(hypot(...v4.toArray()));
  });

  test('θ', () => {
    const originV2 = vec2([0, 0]);
    const leftV2 = vec2([1, 0]);

    expect(() => θ(v2, originV2)).toThrow();
    expect(θ(v2, leftV2)).toBeCloseTo(π / 4);
    expect(θ(v2, leftV2)).toBeCloseTo(toRadians(45));
  });
});
