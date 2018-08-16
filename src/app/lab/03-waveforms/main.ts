import './main.css';

// import { compile } from './shader';
// import { link } from './program';

// const { keys, getPrototypeOf } = Object;
const el = (s: string) => document.querySelector(s);

const c = el('canvas') as HTMLCanvasElement;
const gl = c.getContext('webgl', {
  antialias: false,
}) as WebGLRenderingContext;

gl.clearColor(0, 0, 0, 1);

function init(): void {
  console.log('init'); // tslint:disable-line no-console
}

function draw(t: number): void {
  console.log('draw', t); // tslint:disable-line no-console
  // requestAnimationFrame(draw);
}

init();
requestAnimationFrame(draw);
