import './main.css';

import { el, on } from './dom';
import { compile } from './webgl/shader';
import { link } from './webgl/program';

import vert from './shaders/vert.glsl';
import frag from './shaders/frag.glsl';

const m = el('main') as HTMLMainElement;
const c = el('canvas') as HTMLCanvasElement;
const gl = c.getContext('webgl', {
  antialias: false,
}) as WebGLRenderingContext;

let program: WebGLProgram;

let aPositions: number;
let positions: WebGLBuffer;

let uTranslation: WebGLUniformLocation;
let translation = [0, 0];

let uResolution: WebGLUniformLocation;
let resolution = [0, 0];

const { isInteger } = Number;

function next(a: number, b: number): number {
  while (!isInteger(a / b)) {
    a += 1;
  }

  return a;
}

let shouldResize = true;

function resize() {
  if (!shouldResize) {
    return;
  }

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

  const hw = w / 2;
  const hh = h / 2;

  translation = [hw, hh];
  resolution = [w, h];

  c.width = w;
  c.height = h;

  gl.viewport(0, 0, w, h);
}

on('resize', () => {
  shouldResize = true;
});

function init(): void {
  // console.log('init'); // tslint:disable-line no-console
  resize();

  gl.clearColor(0, 0, 0, 1);

  program = link(
    gl,
    compile(gl, gl.VERTEX_SHADER, vert),
    compile(gl, gl.FRAGMENT_SHADER, frag),
  );

  aPositions = gl.getAttribLocation(program, 'aPositions');
  positions = gl.createBuffer() as WebGLBuffer;

  uTranslation = gl.getUniformLocation(
    program,
    'uTranslation',
  ) as WebGLUniformLocation;

  uResolution = gl.getUniformLocation(
    program,
    'uResolution',
  ) as WebGLUniformLocation;
}

function draw(t: number): void {
  // console.log('draw', t); // tslint:disable-line no-console
  requestAnimationFrame(draw);
  resize();

  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.useProgram(program);

  gl.bindBuffer(gl.ARRAY_BUFFER, positions);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([]), gl.STATIC_DRAW);

  gl.enableVertexAttribArray(aPositions);
  gl.bindBuffer(gl.ARRAY_BUFFER, positions);
  gl.vertexAttribPointer(aPositions, 2, gl.FLOAT, false, 0, 0);

  gl.uniform2fv(uTranslation, translation);
  gl.uniform2fv(uResolution, resolution);

  gl.drawArrays(gl.LINE_LOOP, 0, 0);
}

init();
requestAnimationFrame(draw);
