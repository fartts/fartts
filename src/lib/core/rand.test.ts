import { randomBool, randomInt, randomRange } from './rand';

describe('@fartts/lib/rand', () => {
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
});
