import { hypot } from '../../../../lib/core/math';

export interface Vec2 {
  x: number;
  y: number;
}

export const vec2: (x: number, y: number) => Vec2 = (x, y) => ({ x, y });

export const copy: (v: Vec2) => Vec2 = (v) => vec2(v.x, v.y);

export const addv: (a: Vec2, b: Vec2) => Vec2 = (a, b) =>
  vec2(a.x + b.x, a.y + b.y);

export const subv: (a: Vec2, b: Vec2) => Vec2 = (a, b) =>
  vec2(a.x - b.x, a.y - b.y);

export const muls: (a: Vec2, s: number) => Vec2 = (a, s) =>
  vec2(a.x * s, a.y * s);

export const size: (v: Vec2) => number = ({ x, y }) => hypot(x, y);

export const dotp: (a: Vec2, b: Vec2) => number = (a, b) =>
  a.x * b.x + a.y * b.y;

export const crss: (a: Vec2, b: Vec2) => number = (a, b) =>
  a.x * b.y - a.y * b.x;

export const nrml: (v: Vec2) => Vec2 = (v) => muls(v, 1 / size(v));

/**
 * point of intesection (between two line segments)
 *
 * @returns Vec2
 * @see https://stackoverflow.com/a/24392281/1577876
 * @see https://stackoverflow.com/a/30160064/1577876
 */
export const poiv: (a: [Vec2, Vec2], b: [Vec2, Vec2]) => Vec2 = (
  [a, b],
  [c, d],
) => {
  const ab = subv(b, a);
  const cd = subv(d, c);

  const det = crss(ab, cd);

  if (det === 0) {
    // the two segments are parallel and do not intersect
    return vec2(NaN, NaN);
  }

  const t = subv(d, a);
  const lambda = ((d.y - c.y) * t.x + (c.x - d.x) * t.y) / det;
  const gamma = ((a.y - b.y) * t.x + (b.x - a.x) * t.y) / det;

  return -0.01 < lambda && lambda < 1.01 && -0.01 < gamma && gamma < 1.01
    ? addv(a, muls(ab, lambda)) // could also use: `addv(c, muls(cd, gamma))`
    : vec2(NaN, NaN); // the two segments do not intersect
};
