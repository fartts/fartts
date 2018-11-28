import Vec2 from './2';
import Vec3 from './3';
import Vec4 from './4';

import { vec2 } from '.';

type AnyVec = Vec2 | Vec3 | Vec4;

export interface VectorMath<V extends AnyVec> {
  clone(v: V): V;

  dot(a: V, b: V): number;
  // cross(a: V, b: V): number;
  // outer(a: V, b: V): number;

  magnitude(v: V): number;
  direction(a: V, b: V): number;

  add(a: V, b: number | V): V;
  sub(a: V, b: number | V): V;
  mul(a: V, b: number | V): V;
  div(a: V, b: number | V): V;

  norm(v: V): V;
  lerp(a: V, b: V, i: number | V): V;
}

export function add(a: Vec2, b: number | Vec2): Vec2 {
  if (typeof b === 'number') {
    b = vec2(b);
  }

  return vec2(a.map((c, i) => c + (b as Vec2)[i]));
}

export function sub(a: Vec2, b: number | Vec2): Vec2 {
  if (typeof b === 'number') {
    b = vec2(b);
  }

  return vec2(a.map((c, i) => c - (b as Vec2)[i]));
}

export function mul(a: Vec2, b: number | Vec2): Vec2 {
  if (typeof b === 'number') {
    b = vec2(b);
  }

  return vec2(a.map((c, i) => c * (b as Vec2)[i]));
}

export function div(a: Vec2, b: number | Vec2): Vec2 {
  if (typeof b === 'number') {
    b = vec2(b);
  }

  return vec2(a.map((c, i) => c / (b as Vec2)[i]));
}
