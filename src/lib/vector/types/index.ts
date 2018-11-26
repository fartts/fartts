import Vector from '..';

import { Vec2D1, Vec2D2, Vec2D3, Vec2D4 } from './vec2';
import { Vec3D1, Vec3D2, Vec3D3, Vec3D4 } from './vec3';
import { Vec4D1, Vec4D2, Vec4D3, Vec4D4 } from './vec4';

export type Component = number | number[] | Vector;
export type Components = Component[];
export type Factory<V> = (...args: Array<number | number[] | Vector>) => V;

type Vec1D1 = 'x' | 's' | 'r';
type Vector1 = Vector & { [K in Vec1D1]: number };

export type Vector2 = Vector1 &
  { [K in Vec2D1]: number } &
  { [K in Vec2D2]: Vector2 } &
  { [K in Vec2D3]: Vector3 } &
  { [K in Vec2D4]: Vector4 };
export type Vector3 = Vector2 &
  { [K in Vec3D1]: number } &
  { [K in Vec3D2]: Vector2 } &
  { [K in Vec3D3]: Vector3 } &
  { [K in Vec3D4]: Vector4 };
export type Vector4 = Vector3 &
  { [K in Vec4D1]: number } &
  { [K in Vec4D2]: Vector2 } &
  { [K in Vec4D3]: Vector3 } &
  { [K in Vec4D4]: Vector4 };
