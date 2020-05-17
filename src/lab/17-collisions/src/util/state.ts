import { Particle, particle } from './particle';
import { Vec2 } from './vec2';
import { vec2 } from '../../../../lib/vec';

export interface State {
  mouse: Particle;
  mouseDown: boolean;
  keys: string[];

  bounds: [Vec2, Vec2][];
  intersections: Vec2[];
  gravity: Vec2;
  player: Particle;
}

export const state: State = {
  mouse: particle(0, 0),
  mouseDown: false,
  keys: [],

  bounds: [],
  intersections: [],
  gravity: vec2(0, 0.2),
  player: particle(0, 0),
};
