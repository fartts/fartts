import Vector from '.';
import { acos, hypot, lerp as slerp } from '../math';

/**
 * ## dot
 *
 * @export
 * @param {Vector} a
 * @param {Vector} b
 * @returns {number}
 */
export function dot(a: Vector, b: Vector): number {
  if (a.length !== b.length) {
    throw new Error(`expected vectors of equal length, got: ${a}, ${b}`);
  }

  return a.reduce((acc, c, i) => acc + c * b[i], 0);
}

/**
 * ## ρ
 *
 * @export
 * @param {Vector} v
 * @returns {number}
 */
export function ρ(v: Vector): number {
  // an alternative for later comparison
  // return sqrt(dot(v, v));
  return hypot(...v);
}

/**
 * ## θ
 *
 * @export
 * @param {Vector} a
 * @param {Vector} b
 * @returns {number}
 */
export function θ(a: Vector, b: Vector): number {
  const dab = dot(a, b);
  const ρa = ρ(a);
  const ρb = ρ(b);

  if (ρa === 0 || ρb === 0) {
    throw new Error(`cannot get θ between vectors: ${a}, ${b}`);
  }

  return acos(dab / ρa / ρb);
}

export function clone(v: Vector): Vector {
  return new Vector(v);
}

export function add(a: Vector, b: number | Vector): Vector {
  if (typeof b === 'number') {
    return new Vector(a.map(c => c + b));
  }

  return new Vector(a.map((c, i) => c + b[i]));
}

export function sub(a: Vector, b: number | Vector): Vector {
  if (typeof b === 'number') {
    return new Vector(a.map(c => c - b));
  }

  return new Vector(a.map((c, i) => c - b[i]));
}

export function mul(a: Vector, b: number | Vector): Vector {
  if (typeof b === 'number') {
    return new Vector(a.map(c => c * b));
  }

  return new Vector(a.map((c, i) => c * b[i]));
}

export function div(a: Vector, b: number | Vector): Vector {
  if (typeof b === 'number') {
    return new Vector(a.map(c => c / b));
  }

  return new Vector(a.map((c, i) => c / b[i]));
}

export function norm(v: Vector): Vector {
  return new Vector(div(v, v.ρ));
}

export function lerp(a: Vector, b: Vector, i: number): Vector {
  return new Vector(a.map((c, j) => slerp(c, b[j], i)));
}
