import { round } from '../../lib/math';
import { el } from '../../lib/dom';
import loop from '../../lib/game/loop';
import resize from './resize';

import './main.css';

import { compile } from './webgl/shader';
import { link } from './webgl/program';

import vert from './shaders/vert.glsl';
import frag from './shaders/frag.glsl';
import Vec2 from '../../lib/vec/2';
import { vec2 } from '../../lib/vec';
import {
  cosWave,
  sawWave,
  sinWave,
  triWave,
  WaveFunction,
} from '../../lib/wave';

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
  pointSize = round(w / 150);

  gl.viewport(0, 0, w, h);
}

const width = 900;
const steps = width / 30;
const step = width / steps;
const toComponents = (components: number[], v: Vec2) => [...components, ...v];

const travellers: WaveFunction[] = [];
let travellerComponents: number[] = [];

const points = [cosWave, sawWave, sinWave, triWave].reduce(
  (components: number[], wave, i) => {
    const oX = i % 2 ? step : -(width + step);
    const oY = i < 2 ? width / 2 : -(width / 2);

    const fX = sawWave(1, oX, oX + width, 0);
    const fY = wave(1, oY - width / 3, oY + width / 3, 0);

    const toVectors = (_: number, j: number) =>
      vec2(fX(j / steps), fY(j / steps));

    travellers.push(sawWave(2000, oX, oX + width, 0));
    travellers.push(wave(2000, oY - width / 3, oY + width / 3, 0));
    travellers.push(wave(2000, oX, oX + width, 0));
    travellers.push(() => oY - width / 2 + step * 2);

    return [
      ...components,
      ...new Array(steps)
        .fill(0)
        .map(toVectors)
        .reduce(toComponents, []),
    ];
  },
  [],
);

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
  travellerComponents = travellers.map(fn => fn(t));
}

function render(lag: number): void {
  if (resize(c, m)) {
    setUniforms(c.width, c.height);
  }

  const data = points.concat(travellerComponents);

  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.useProgram(program);

  gl.bindBuffer(gl.ARRAY_BUFFER, positions);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);

  gl.enableVertexAttribArray(aPositions);
  gl.bindBuffer(gl.ARRAY_BUFFER, positions);
  gl.vertexAttribPointer(aPositions, 2, gl.FLOAT, false, 0, 0);

  gl.uniform2fv(uTranslation, translation);
  gl.uniform2fv(uResolution, resolution);
  gl.uniform1f(uPointSize, pointSize);

  gl.drawArrays(gl.POINTS, 0, data.length / 2);
}

const { start } = loop(update, render);

init();
start();
stop();
