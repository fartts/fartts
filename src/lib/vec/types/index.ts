import Vector from '.';

import { Vec2D1, Vec2D2, Vec2D3, Vec2D4 } from './types/vec2';
import { Vec3D1, Vec3D2, Vec3D3, Vec3D4 } from './types/vec3';
import { Vec4D1, Vec4D2, Vec4D3, Vec4D4 } from './types/vec4';

export type Component = number | number[] | Vector;
export type Components = Component[];
export type Factory<V> = (...args: Array<number | number[] | Vector>) => V;

type Vec1D1 = 'x' | 's' | 'r';
type Vec1 = Vector & { [K in Vec1D1]: number };

export type Vec2 = Vec1 &
  { [K in Vec2D1]: number } &
  { [K in Vec2D2]: Vec2 } &
  { [K in Vec2D3]: Vec3 } &
  { [K in Vec2D4]: Vec4 };
export type Vec3 = Vec2 &
  { [K in Vec3D1]: number } &
  { [K in Vec3D2]: Vec2 } &
  { [K in Vec3D3]: Vec3 } &
  { [K in Vec3D4]: Vec4 };
export type Vec4 = Vec3 &
  { [K in Vec4D1]: number } &
  { [K in Vec4D2]: Vec2 } &
  { [K in Vec4D3]: Vec3 } &
  { [K in Vec4D4]: Vec4 };
