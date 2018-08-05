import {
  lerp,
  randomBool,
  saw,
  toDegrees,
  toRadians,
  tri,
  π,
  ππ,
} from './math';

test('lerp', () => {
  expect(lerp(1, 2, 0.5)).toBe(1.5);
  expect(lerp(0, 2, 0.5)).toBe(1);
  expect(lerp(1, 5, 0.25)).toBe(2);
});

test('randomBool', () => {
  expect(randomBool()).toBe(false);
  expect(randomBool()).toBe(false);
  expect(randomBool()).toBe(false);
  expect(randomBool()).toBe(false);
  expect(randomBool()).toBe(true);
});

test('saw', () => {
  expect(saw(0)).toBe(-1);
  expect(saw(π)).toBe(0);
  expect(saw(ππ * 0.999)).toBeCloseTo(1);
  expect(saw(ππ)).toBe(-1); // at ππ it flips back down, sawtooth-style
});

test('tri', () => {
  expect(tri(0)).toBe(-1);
  expect(tri(π / 2)).toBe(0);
  expect(tri(π)).toBe(1);
});

test('toDegrees', () => {
  expect(toDegrees(0)).toBe(0);
  expect(toDegrees(π / 4)).toBe(45);
  expect(toDegrees(π / 2)).toBe(90);
  expect(toDegrees(ππ)).toBe(360);
});

test('toRadians', () => {
  expect(toRadians(0)).toBe(0);
  expect(toRadians(45)).toBe(π / 4);
  expect(toRadians(90)).toBe(π / 2);
  expect(toRadians(360)).toBe(ππ);
});
