export interface Vec2 {
  x: number;
  y: number;
}

export interface Particle {
  cpos: Vec2;
  ppos: Vec2;
}

export interface State {
  mouse: Particle;
  mouseDown: boolean;
  keys: string[];

  bounds: [Vec2, Vec2][];
  intersections: Vec2[];
  gravity: Vec2;
  player: Particle;
}
