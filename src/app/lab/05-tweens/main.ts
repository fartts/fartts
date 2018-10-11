import { el } from '../../../lib/dom';
import loop from '../../../lib/game/loop';
import { round } from '../../../lib/math';
import resize from './resize';

import './main.css';

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

let uPointSize: WebGLUniformLocation;
let pointSize = 0;

function setUniforms(w: number, h: number): void {
  translation = [w / 2, h / 2];
  resolution = [w, h];
  pointSize = round(w / 30);

  gl.viewport(0, 0, w, h);
}

function init(): void {
  if (resize(c, m)) {
    setUniforms(c.width, c.height);
  }

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

  uPointSize = gl.getUniformLocation(
    program,
    'uPointSize',
  ) as WebGLUniformLocation;
}

function update(t: number, dt: number): void {
  // do something here
}

function render(lag: number): void {
  if (resize(c, m)) {
    setUniforms(c.width, c.height);
  }

  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.useProgram(program);

  gl.bindBuffer(gl.ARRAY_BUFFER, positions);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([0, 0]), gl.STATIC_DRAW);

  gl.enableVertexAttribArray(aPositions);
  gl.bindBuffer(gl.ARRAY_BUFFER, positions);
  gl.vertexAttribPointer(aPositions, 2, gl.FLOAT, false, 0, 0);

  gl.uniform2fv(uTranslation, translation);
  gl.uniform2fv(uResolution, resolution);
  gl.uniform1f(uPointSize, pointSize);

  gl.drawArrays(gl.POINTS, 0, 1);
}

const { start } = loop(update, render);

init();
start();
