import { Vec1D1, Vec1D2, Vec1D3, Vec1D4 } from './1';
import { Vec2D1, Vec2D2, Vec2D3, Vec2D4 } from './2';
import { Vec3D1, Vec3D2, Vec3D3, Vec3D4 } from './3';
import { Vec4D1, Vec4D2, Vec4D3, Vec4D4 } from './4';

type Swizzled1 = { [K in Vec1D1]: number } &
  { [K in Vec1D2]: Swizzled2 } &
  { [K in Vec1D3]: Swizzled3 } &
  { [K in Vec1D4]: Swizzled4 };

export type Swizzled2 = Swizzled1 &
  { [K in Vec2D1]: number } &
  { [K in Vec2D2]: Swizzled2 } &
  { [K in Vec2D3]: Swizzled3 } &
  { [K in Vec2D4]: Swizzled4 };

export type Swizzled3 = Swizzled2 &
  { [K in Vec3D1]: number } &
  { [K in Vec3D2]: Swizzled2 } &
  { [K in Vec3D3]: Swizzled3 } &
  { [K in Vec3D4]: Swizzled4 };

export type Swizzled4 = Swizzled3 &
  { [K in Vec4D1]: number } &
  { [K in Vec4D2]: Swizzled2 } &
  { [K in Vec4D3]: Swizzled3 } &
  { [K in Vec4D4]: Swizzled4 };
