import { Vec2 } from './vec2';
import { vec2 } from '../../../../lib/vec';

export interface Particle {
  cpos: Vec2;
  ppos: Vec2;
}

export const particle: (x: number, y: number) => Particle = (x, y) => ({
  cpos: vec2(x, y),
  ppos: vec2(x, y),
});
