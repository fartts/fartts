import Vector from '.';
import { sqrt, acos /* , hypot */ } from '../math';

export function dot(a: Vector, b: Vector): number {
  if (a.length !== b.length) {
    throw new Error(`expected vectors of equal length, got: ${a}, ${b}`);
  }

  return a.reduce((acc, c, i) => acc + c * b[i], 0);
}

export function ρ(v: Vector): number {
  // an alternative for later comparison
  // return hypot(...v.toArray());
  return sqrt(dot(v, v));
}

export function θ(a: Vector, b: Vector): number {
  const dab = dot(a, b);
  const ρa = ρ(a);
  const ρb = ρ(b);

  if (ρa === 0 || ρb === 0) {
    throw new Error(`cannot get θ between vectors: ${a}, ${b}`);
  }

  return acos(dab / ρa / ρb);
}
