// import { vec2, vec3, vec4 } from './factories';
import { dot, ρ, θ } from './math';

describe('@fartts/lib/vec/math', () => {
  // const v2 = vec2(2, 2);
  // const v3 = vec3(3, 3, 3);
  // const v4 = vec4(4, 4, 4, 4);

  test('dot', () => {
    expect(dot).toBeDefined();
    // expect(dot(v2, v2)).toBe(8);
    // expect(dot(v3, v3)).toBe(27);
    // expect(dot(v4, v4)).toBe(64);
  });

  test('ρ', () => {
    expect(ρ).toBeDefined();
  });

  test('θ', () => {
    expect(θ).toBeDefined();
  });
});
