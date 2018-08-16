import './main.css';

// import { compile } from './shader';
// import { link } from './program';

// const { keys, getPrototypeOf } = Object;
const { isInteger } = Number;

const el = (s: string) => document.querySelector(s);
const on = (e: string, fn: EventListener) => window.addEventListener(e, fn);

const c = el('canvas') as HTMLCanvasElement;
const gl = c.getContext('webgl', {
  antialias: false,
}) as WebGLRenderingContext;

gl.clearColor(0, 0, 0, 1);

let shouldResize = true;

function next(a: number, b: number): number {
  while (!isInteger(a / b)) {
    a += 1;
  }

  return a;
}

function resize() {
  shouldResize = false;

  let {
    devicePixelRatio: dpr,
    innerWidth: width,
    innerHeight: height,
  } = window;

  if (dpr === undefined) {
    dpr = 1;
  }

  const scale = 10;
  width = next(width, 10);
  height = next(height, 10);

  const w = (width * dpr) / scale;
  const h = (height * dpr) / scale;

  c.width = w;
  c.height = h;

  c.style.width = `${width}px`;
  c.style.height = `${height}px`;

  gl.viewport(0, 0, w, h);
}

on('resize', () => {
  shouldResize = true;
});

function init(): void {
  console.log('init'); // tslint:disable-line no-console

  if (shouldResize) {
    resize();
  }
}

function draw(t: number): void {
  console.log('draw', t); // tslint:disable-line no-console
  requestAnimationFrame(draw);

  if (shouldResize) {
    resize();
  }
}

init();
requestAnimationFrame(draw);
