import './main.css';

import { el, on } from './dom';
import { next } from './util';
import { compile } from './webgl/shader';
import { link } from './webgl/program';

import vert from './shaders/vert.glsl';
import frag from './shaders/frag.glsl';

import { random, sin, cos, ππ } from '@fartts/lib/math';
import { vec2 } from '@fartts/lib/vec/factories';
import { sub, mul, add } from '@fartts/lib/vec/math';
import { Vec2 } from '@fartts/lib/vec/types';

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

let shouldResize = true;

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

interface IParticle {
  cpos: Vec2;
  ppos: Vec2;
  update(): void;
}

const drag = 0.99;
const grav = vec2(0, -0.1);

function getMagnitude() {
  return (random() * 2 - 1) * 4;
}

function getDirection() {
  return random() * ππ;
}

function getParticle() {
  const mag = getMagnitude();
  const dir = getDirection();
  const o = vec2(0, 20);

  return {
    cpos: o,
    ppos: add(o, vec2(sin(dir) * mag, cos(dir) * mag)),
    update() {
      let vel = sub(this.cpos, this.ppos);
      vel = add(vel, grav);
      vel = mul(vel, drag);

      this.ppos = this.cpos;
      this.cpos = add(this.cpos, vel);
    },
  };
}

const particles: IParticle[] = new Array(200)
  .fill(true)
  .reduce((acc, _, i) => acc.concat(getParticle()), []);

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

  if (shouldResize) {
    resize();
  }

  const points: number[] = particles.reduce((acc: number[], p) => {
    p.update();

    if (p.cpos.y < -c.height / 2) {
      const mag = getMagnitude();
      const dir = getDirection();
      const o = vec2(0, 20);

      p.cpos = o;
      p.ppos = add(o, vec2(sin(dir) * mag, cos(dir) * mag));
    }

    return acc.concat(p.cpos);
  }, []);

  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.useProgram(program);

  gl.bindBuffer(gl.ARRAY_BUFFER, positions);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(points), gl.STATIC_DRAW);

  gl.enableVertexAttribArray(aPositions);
  gl.bindBuffer(gl.ARRAY_BUFFER, positions);
  gl.vertexAttribPointer(aPositions, 2, gl.FLOAT, false, 0, 0);

  gl.uniform2fv(uTranslation, translation);
  gl.uniform2fv(uResolution, resolution);

  gl.drawArrays(gl.POINTS, 0, points.length / 2);
}

init();
requestAnimationFrame(draw);
