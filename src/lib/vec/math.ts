import { sqrt, acos, atan2 /* , hypot */ } from '../math';
// import { toArray } from './util';

export function dot(a: Float32Array, b: Float32Array): number {
  if (a.length !== b.length) {
    throw new Error(`expected vectors of equal length, got: ${a}, ${b}`);
  }

  return a.reduce((acc, c, i) => acc + c * b[i], 0);
}

export function ρ(v: Float32Array): number {
  // an alternative for later comparison
  // return hypot(...v.toArray());
  return sqrt(dot(v, v));
}

export function θ(a: Float32Array, b: Float32Array): number {
  const c = dot(a, b);
  switch (a.length) {
    case 2:
      return atan2(b[1], b[0]) - atan2(a[1], a[0]);
  }
  return acos(c / (ρ(a) * ρ(b)));
}
