import { el } from '../../lib/core/dom';
import loop from '../../lib/game/loop';
import { random, sin, cos, ππ, round } from '../../lib/core/math';
import resize from './resize';
import { vec2 } from '../../lib/vec';
import { sub, mul, add, div } from '../../lib/vec/math';
import Vec2 from '../../lib/vec/2';

import './main.css';

import { compile } from './webgl/shader';
import { link } from './webgl/program';

import vert from './shaders/vert.glsl';
import frag from './shaders/frag.glsl';
import { slice } from '../../lib/core/util';

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

interface IParticle {
  cpos: Vec2;
  ppos: Vec2;
  update(dt: number): void;
}

const drag = 0.01;
const grav = vec2(0, 10);

function getMagnitude() {
  return (random() * 2 - 1) * pointSize;
}

function getDirection() {
  return random() * ππ;
}

function getOrigin() {
  return vec2(0, c.height / 8);
}

function getRandom() {
  const mag = getMagnitude();
  const dir = getDirection();

  return vec2(sin(dir) * mag, cos(dir) * mag);
}

function getParticle() {
  const cp = getOrigin();
  const pp = getRandom();

  return {
    cpos: cp,
    ppos: add(cp, pp),
    update(dt: number) {
      let vel = sub(this.cpos, this.ppos);

      vel = sub(vel, div(grav, dt * dt));
      vel = mul(vel, 1 - drag);

      this.ppos = this.cpos;
      this.cpos = add(this.cpos, vel);
    },
  };
}

const particles: IParticle[] = new Array(50)
  .fill(true)
  .reduce((acc, _, i) => acc.concat(getParticle()), []);

const getPoints = (dt: number) =>
  particles.reduce((acc: number[], p) => {
    p.update(dt);

    if (p.cpos.y < -c.height / 2) {
      const cp = getOrigin();
      const pp = getRandom();

      p.cpos = cp;
      p.ppos = add(cp, pp);
    }

    return acc.concat(slice.call(p.cpos));
  }, []);

let points: number[] = getPoints(0);

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
  points = getPoints(dt);
}

function render(lag: number): void {
  if (resize(c, m)) {
    setUniforms(c.width, c.height);
  }

  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.useProgram(program);

  gl.bindBuffer(gl.ARRAY_BUFFER, positions);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(points), gl.STATIC_DRAW);

  gl.enableVertexAttribArray(aPositions);
  gl.bindBuffer(gl.ARRAY_BUFFER, positions);
  gl.vertexAttribPointer(aPositions, 2, gl.FLOAT, false, 0, 0);

  gl.uniform2fv(uTranslation, translation);
  gl.uniform2fv(uResolution, resolution);
  gl.uniform1f(uPointSize, pointSize);

  gl.drawArrays(gl.POINTS, 0, points.length / 2);
}

const { start } = loop(update, render);

init();
start();
