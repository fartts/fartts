import {
  lerp,
  randomBool,
  randomInt,
  randomRange,
  saw,
  toDegrees,
  toRadians,
  tri,
  π,
  ππ,
} from './math';

describe('@fartts/lib/math', () => {
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

  test('randomRange', () => {
    expect(randomRange(0, 1)).toBe(0.3858736207545881);
    expect(randomRange(1, 2)).toBe(1.2395959625293629);
    expect(randomRange(1, 30)).toBe(27.889704444634948);
    expect(randomRange(40, 20)).toBe(24.1776263921708);
    expect(randomRange(5000, 5)).toBe(3343.64129004656);
  });

  test('randomInt', () => {
    expect(randomInt(10)).toBe(3);
    expect(randomInt(-20)).toBe(-11);
    expect(randomInt(40, 20)).toBe(32);
    expect(randomInt(5, 5000)).toBe(1675);
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
});
