export const maxIterations = 20;

export interface Collar {
  x: number;
  y: number;
  angle: number;
  length: number;
  iteration: number;
}

export interface Branch {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  lineWidth: number;
  iteration: number;
}

export interface Config {
  a: () => number;
  l: () => number;
  n: () => number;
}
