import Vector from '.';
import { vec2, vec3, vec4 } from './factories';
import { sqrt, hypot, toRadians, π } from '../math';

describe('@fartts/lib/vec', () => {
  const v2 = vec2(2, 2);
  const v3 = vec3(3, 3, 3);
  const v4 = vec4(4, 4, 4, 4);

  test('constructor', () => {
    expect(() => new Vector()).not.toThrow();
    expect(() => new Vector(1)).not.toThrow();
    expect(() => new Vector(1, 2, 3, 4, 5)).not.toThrow();
  });

  test('get dot', () => {
    expect(v2.dot).toBe(8);
    expect(v3.dot).toBe(27);
    expect(v4.dot).toBe(64);
  });

  test('get magnitude', () => {
    expect(v2.magnitude).toBeCloseTo(hypot(...v2));
    expect(v2.magnitude).toBeCloseTo(sqrt(8));

    expect(v3.magnitude).toBeCloseTo(hypot(...v3));
    expect(v3.magnitude).toBeCloseTo(sqrt(27));

    expect(v4.magnitude).toBeCloseTo(hypot(...v4));
    expect(v4.magnitude).toBeCloseTo(sqrt(64));
  });

  test('get direction', () => {
    expect(v2.direction).toBeCloseTo(π / 4);
    expect(v2.direction).toBeCloseTo(toRadians(45));

    expect(v3.direction).toBeCloseTo(π / 3.2885355431);
    expect(v3.direction).toBeCloseTo(toRadians(54.735610317245346));

    expect(v4.direction).toBeCloseTo(π / 3);
    expect(v4.direction).toBeCloseTo(toRadians(60));
  });

  test('toString', () => {
    expect(v2.toString()).toBe('vec2(2,2)');
    expect(v3.toString()).toBe('vec3(3,3,3)');
    expect(v4.toString()).toBe('vec4(4,4,4,4)');
  });
});
