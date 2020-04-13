import './style.css';

import { el, rAF } from '../../../lib/core/dom';
import { ππ, max, sin, cos, random } from '../../../lib/core/math';

import { on } from './events';
import { resize } from './resize';

const main = el<HTMLElement>('main');
const canvas = el<HTMLCanvasElement>('canvas');
const context = canvas.getContext('2d');

if (!context) {
  throw new Error("Couldn't get a `CanvasRenderingContext2D`");
}

let shouldResize = true;

on(window, 'resize', () => {
  shouldResize = true;
});

const getCanvasScale = () => {
  const { clientWidth: mw, clientHeight: mh } = main;
  const { width: cw, height: ch } = canvas;

  return max(mw / cw, mh / ch);
};

let canvasScale = getCanvasScale();

const pixelScale = 4;
const frameTime = 1_000 / 60;

let firstTime: number;
let previousTime: number;
let overTime: number;

// append
// select
// update
// remove

type Vector = {
  x: number;
  y: number;
};

type Particle = {
  cpos: Vector;
  ppos: Vector;
};

type Constraint = {
  a: Particle;
  b: Particle;
};

const particles: Particle[] = [];
const constraints: Constraint[] = [];

const step = 10;
const stepCoef = 1 / step;

const update = (dt: number) => {
  particles.forEach((p, i) => {
    const v: Vector = {
      x: (p.cpos.x - p.ppos.x) * 0.9,
      y: (p.cpos.y - p.ppos.y) * 0.9,
    };

    p.ppos.x = p.cpos.x;
    p.ppos.y = p.cpos.y;

    p.cpos.x += v.x;
    p.cpos.y += v.y;
  });

  for (let i = 0; i < step; ++i) {
    constraints.forEach(({ a, b }) => {
      const n: Vector = {
        x: a.cpos.x - b.cpos.x,
        y: a.cpos.y - b.cpos.y,
      };

      const m = n.x * n.x + n.y * n.y;
      const s = ((100 * 100 - m) / m) * 0.9 * stepCoef;
      n.x *= s;
      n.y *= s;

      // TODO: @mysterycommand - pin constrain particles[0] to mouse position
      // a.cpos.x += n.x;
      // a.cpos.y += n.y;

      b.cpos.x -= n.x;
      b.cpos.y -= n.y;
    });
  }
};

const render = (ctx: CanvasRenderingContext2D) => {
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.35)';
  ctx.lineWidth = 1;

  particles.forEach(({ cpos }) => {
    ctx.beginPath();
    ctx.ellipse(cpos.x, cpos.y, 5, 5, 0, 0, ππ);
    ctx.stroke();
  });

  constraints.forEach(({ a, b }) => {
    ctx.beginPath();
    ctx.moveTo(a.cpos.x, a.cpos.y);
    ctx.lineTo(b.cpos.x, b.cpos.y);
    ctx.stroke();
  });
};

on(canvas, 'mousemove', ({ clientX, clientY }) => {
  if (!particles[0]) {
    return;
  }

  particles[0].cpos.x = particles[0].ppos.x = clientX / canvasScale;
  particles[0].cpos.y = particles[0].ppos.y = clientY / canvasScale;
});

const tick = (time: DOMHighResTimeStamp) => {
  rAF(tick);

  firstTime || (firstTime = time); // tslint:disable-line:no-unused-expression

  if (shouldResize) {
    resize(main, canvas, pixelScale);
    shouldResize = false;

    canvasScale = getCanvasScale();

    firstTime = time;
    previousTime = 0;
    overTime = 0;
  }

  const normalTime = time - firstTime;
  const deltaTime = normalTime - previousTime;
  const { width: w, height: h } = canvas;

  overTime += deltaTime;

  if (normalTime === 0) {
    // first frame, do setup stuff here
    particles.length = 0;
    constraints.length = 0;

    const a: Particle = {
      cpos: { x: w / 2, y: h / 2 },
      ppos: { x: w / 2, y: h / 2 },
    };

    const dir = random() * ππ;
    const x = sin(dir) * 100;
    const y = cos(dir) * 100;

    const b: Particle = {
      cpos: { x: w / 2 + x, y: h / 2 + y },
      ppos: { x: w / 2 + x, y: h / 2 + y },
    };

    particles.push(a);
    particles.push(b);

    constraints.push({
      a,
      b,
    });
  }

  // every subsequent frame
  while (overTime >= frameTime) {
    update(frameTime);
    overTime -= frameTime;
  }

  context.clearRect(0, 0, w, h);
  render(context);

  previousTime = normalTime;
};

rAF(tick);
