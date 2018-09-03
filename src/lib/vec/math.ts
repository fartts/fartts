import Vector from '.';
import { acos, hypot, lerp as slerp } from '../math';
import { validateOperands } from './util';

/**
 * ## dot
 *
 * @export
 * @param {Vector} a
 * @param {Vector} b
 * @returns {number}
 */
export function dot(a: Vector, b: Vector): number {
  validateOperands('dot', a, b);
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
  const ρa = ρ(a);
  const ρb = ρ(b);

  if (ρa === 0 || ρb === 0) {
    // it looks like this is what WebGL does
    return 0;
  }

  return acos(dot(a, b) / (ρa * ρb));
}

/**
 * ## clone
 *
 * @export
 * @param {Vector} v
 * @returns {Vector}
 */
export function clone(v: Vector): Vector {
  return new Vector(v);
}

/**
 * ## add
 *
 * @export
 * @param {Vector} a
 * @param {(number | Vector)} b
 * @returns {Vector}
 */
export function add(a: Vector, b: number | Vector): Vector {
  if (b instanceof Vector) {
    validateOperands('add', a, b);
  }

  return new Vector(a.map(getAdd(b)));
}

const getAdd = (b: number | Vector) =>
  typeof b === 'number'
    ? (c: number) => c + b
    : (c: number, i: number) => c + b[i];

/**
 * ## sub
 *
 * @export
 * @param {Vector} a
 * @param {(number | Vector)} b
 * @returns {Vector}
 */
export function sub(a: Vector, b: number | Vector): Vector {
  if (b instanceof Vector) {
    validateOperands('sub', a, b);
  }

  return new Vector(a.map(getSub(b)));
}

const getSub = (b: number | Vector) =>
  typeof b === 'number'
    ? (c: number) => c - b
    : (c: number, i: number) => c - b[i];

/**
 * ## mul
 *
 * @export
 * @param {Vector} a
 * @param {(number | Vector)} b
 * @returns {Vector}
 */
export function mul(a: Vector, b: number | Vector): Vector {
  if (b instanceof Vector) {
    validateOperands('mul', a, b);
  }

  return new Vector(a.map(getMul(b)));
}

const getMul = (b: number | Vector) =>
  typeof b === 'number'
    ? (c: number) => c * b
    : (c: number, i: number) => c * b[i];

/**
 * ## div
 *
 * @export
 * @param {Vector} a
 * @param {(number | Vector)} b
 * @returns {Vector}
 */
export function div(a: Vector, b: number | Vector): Vector {
  if (b instanceof Vector) {
    validateOperands('div', a, b);
  }

  return new Vector(a.map(getDiv(b)));
}

const getDiv = (b: number | Vector) =>
  typeof b === 'number'
    ? (c: number) => c / b
    : (c: number, i: number) => c / b[i];

/**
 * ## norm
 *
 * @export
 * @param {Vector} v
 * @returns {Vector}
 */
export function norm(v: Vector): Vector {
  return new Vector(div(v, v.ρ));
}

/**
 * ## lerp
 *
 * @export
 * @param {Vector} a
 * @param {Vector} b
 * @param {(number | Vector)} i
 * @returns {Vector}
 */
export function lerp(a: Vector, b: Vector, i: number | Vector): Vector {
  validateOperands('lerp', a, b);

  if (i instanceof Vector) {
    validateOperands('lerp', a, i);
  }

  return new Vector(a.map(getLerp(b, i)));
}

const getLerp = (b: Vector, i: number | Vector) =>
  typeof i === 'number'
    ? (c: number, j: number) => slerp(c, b[j], i)
    : (c: number, j: number) => slerp(c, b[j], i[j]);
