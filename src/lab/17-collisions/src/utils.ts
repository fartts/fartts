import { hypot, lerp, random } from '../../../lib/core/math';
import { Particle, State, Vec2 } from './types';

export const vec2: (x: number, y: number) => Vec2 = (x, y) => ({ x, y });

export const copy: (v: Vec2) => Vec2 = (v) => vec2(v.x, v.y);
export const addv: (a: Vec2, b: Vec2) => Vec2 = (a, b) =>
  vec2(a.x + b.x, a.y + b.y);
export const subv: (a: Vec2, b: Vec2) => Vec2 = (a, b) =>
  vec2(a.x - b.x, a.y - b.y);
export const muls: (a: Vec2, s: number) => Vec2 = (a, s) =>
  vec2(a.x * s, a.y * s);
export const size: (v: Vec2) => number = ({ x, y }) => hypot(x, y);

export const poiv: (a: [Vec2, Vec2], b: [Vec2, Vec2]) => Vec2 = (
  [a, b],
  [c, d],
) => {
  const det = (b.x - a.x) * (d.y - c.y) - (d.x - c.x) * (b.y - a.y);

  if (det === 0) {
    return vec2(NaN, NaN);
  }

  const lambda = ((d.y - c.y) * (d.x - a.x) + (c.x - d.x) * (d.y - a.y)) / det;
  const gamma = ((a.y - b.y) * (d.x - a.x) + (b.x - a.x) * (d.y - a.y)) / det;

  return 0 < lambda && lambda < 1 && 0 < gamma && gamma < 1
    ? addv(a, muls(subv(b, a), lambda))
    : vec2(NaN, NaN);
};

export const particle: (x: number, y: number) => Particle = (x, y) => ({
  cpos: vec2(x, y),
  ppos: vec2(x, y),
});

export const state: State = {
  mouse: particle(0, 0),
  mouseDown: false,
  keys: [],

  bounds: [],
  intersections: [],
  gravity: vec2(0, 0.2),
  player: particle(0, 0),
};

export const rng: (a: number, b: number) => number = (a, b) =>
  lerp(a, b, random());
