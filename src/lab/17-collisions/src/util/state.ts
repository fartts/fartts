import { vec2 } from '../../../../lib/vec';

import { Particle, particle } from './particle';
import { Line, Vec2 } from './vec2';

export interface State {
  mouse: Particle;
  mouseDown: boolean;
  keys: string[];

  bounds: Line[];
  intersections: [Line, Line, Vec2][];
  gravity: Vec2;
  player: Particle;
}

export const state: State = {
  mouse: particle(0, 0),
  mouseDown: false,
  keys: [],

  bounds: [],
  intersections: [],
  gravity: vec2(0, 0.5),
  player: particle(0, 0),
};
