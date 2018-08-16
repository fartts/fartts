import './main.css';

import { compile } from './shader';
import { link } from './program';

import vert from './shader.vert';
import frag from './shader.frag';
import { cosWave, sinWave, WaveFunction } from '@fartts/lib/wave';

// const { keys, getPrototypeOf } = Object;
const { isInteger } = Number;

const el = (s: string) => document.querySelector(s);
const on = (e: string, fn: EventListener) => window.addEventListener(e, fn);

const m = el('main') as HTMLMainElement;
const c = el('canvas') as HTMLCanvasElement;
const gl = c.getContext('webgl', {
  antialias: false,
}) as WebGLRenderingContext;

let shouldResize = true;

let program: WebGLProgram;

let aPositions: number;
let positions: WebGLBuffer;

// let uTranslation: WebGLUniformLocation;
// let translation = [0, 0];

let uResolution: WebGLUniformLocation;
let resolution = [0, 0];

const r = 30;
const d = 8000;
const n = 24;
let hw: number;
let hh: number;
let points: WaveFunction[];

function next(a: number, b: number): number {
  while (!isInteger(a / b)) {
    a += 1;
  }

  return a;
}

function resize() {
  shouldResize = false;

  let { devicePixelRatio: dpr } = window;
  let { clientWidth: width, clientHeight: height } = m;

  if (dpr === undefined) {
    dpr = 1;
  }

  c.style.width = `${width}px`;
  c.style.height = `${height}px`;

  const scale = 10;
  width = next(width, scale);
  height = next(height, scale);

  const w = (width * dpr) / scale;
  const h = (height * dpr) / scale;

  c.width = w;
  c.height = h;

  resolution = [w, h];
  gl.viewport(0, 0, w, h);

  // this should go in it's own function some where
  hw = c.width / 2;
  hh = c.height / 2;
  points = Array(n)
    .fill(0)
    .map(
      (v, i) =>
        i % 2 === 0
          ? cosWave(d, -r, r, (d / n) * i)
          : sinWave(d, -r, r, (d / n) * i),
    );
}

on('resize', () => {
  shouldResize = true;
});

function init(): void {
  // console.log('init'); // tslint:disable-line no-console
  if (shouldResize) {
    resize();
  }

  gl.clearColor(0, 0, 0, 1);

  program = link(
    gl,
    compile(gl, gl.VERTEX_SHADER, vert),
    compile(gl, gl.FRAGMENT_SHADER, frag),
  );

  aPositions = gl.getAttribLocation(program, 'aPositions');
  positions = gl.createBuffer() as WebGLBuffer;

  // uTranslation = gl.getUniformLocation(
  //   program,
  //   'uTranslation',
  // ) as WebGLUniformLocation;

  uResolution = gl.getUniformLocation(
    program,
    'uResolution',
  ) as WebGLUniformLocation;
}

function draw(t: number): void {
  // console.log('draw', t); // tslint:disable-line no-console
  requestAnimationFrame(draw);

  if (shouldResize) {
    resize();
  }

  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.useProgram(program);

  gl.bindBuffer(gl.ARRAY_BUFFER, positions);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array(points.map((xy, i) => xy(t) + (i % 2 === 0 ? hw : hh))),
    gl.STATIC_DRAW,
  );

  gl.enableVertexAttribArray(aPositions);
  gl.bindBuffer(gl.ARRAY_BUFFER, positions);
  gl.vertexAttribPointer(aPositions, 2, gl.FLOAT, false, 0, 0);

  // gl.uniform2fv(uTranslation, translation);
  gl.uniform2fv(uResolution, resolution);

  gl.drawArrays(gl.POINTS, 0, points.length / 2);
}

init();
requestAnimationFrame(draw);
