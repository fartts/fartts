export const maxIterations = 20;

export interface Root {
  x: number;
  y: number;
  length: number;
}

export interface Collar extends Root {
  angle: number;
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

export interface Tree {
  root: Root;
  branches: IterableIterator<Branch>;
  buffer: HTMLCanvasElement;
  buf: CanvasRenderingContext2D;
}

export interface Config {
  a: () => number;
  l: () => number;
  n: () => number;
}
