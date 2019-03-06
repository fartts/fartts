export const maxIterations = 'ontouchstart' in self ? 8 : 18;
console.log('ontouchstart' in self); // tslint:disable-line

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
  life: number;
}

export interface Config {
  a: () => number;
  l: () => number;
  n: () => number;
}
