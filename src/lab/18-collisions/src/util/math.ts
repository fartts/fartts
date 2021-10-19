import { lerp, random } from '../../../../lib/core/math';

export const rng: (a: number, b: number) => number = (a, b) =>
  lerp(a, b, random());
