import './style.css';

import { el, rAF } from '../../../lib/core/dom';
import { ππ, max, sin, cos, random, atan2 } from '../../../lib/core/math';
import { sinWave, cosWave } from '../../../lib/core/wave';

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

const pixelScale = 12;
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

type Constraint = [Particle, Particle];

const particles: Particle[] = [];
const constraints: Constraint[] = [];

const step = 10;
const stepCoef = 1 / step;

const drag = 0.9;
const grav: Vector = {
  x: 0,
  y: 0.1,
};

const length = 15;
const stiffness = 0.9;

let xw = sinWave(750, canvas.width / 2 - 14, canvas.width / 2 + 16);
let yw = cosWave(
  750,
  canvas.height / 2 + length * 2,
  canvas.height / 2 + length * 2 - 10,
);

const update = (t: number, dt: number) => {
  particles.forEach((p) => {
    const v: Vector = {
      x: (p.cpos.x - p.ppos.x) * drag,
      y: (p.cpos.y - p.ppos.y) * drag,
    };

    p.ppos.x = p.cpos.x;
    p.ppos.y = p.cpos.y;

    p.cpos.x += grav.x;
    p.cpos.y += grav.y;

    p.cpos.x += v.x;
    p.cpos.y += v.y;
  });

  if (particles[0]) {
    particles[0].cpos.x = canvas.width / 2;
    particles[0].cpos.y = canvas.height / 2;
  }

  if (particles[2]) {
    particles[2].cpos.x = xw(t);
    particles[2].cpos.y = yw(t);
  }

  if (particles[3]) {
    particles[3].cpos.x = canvas.width / 2 + 5;
    particles[3].cpos.y = canvas.height / 2;
  }

  if (particles[5]) {
    particles[5].cpos.x = xw(t + 375) + 5;
    particles[5].cpos.y = yw(t + 375);
  }

  for (let i = 0; i < step; ++i) {
    constraints.forEach(([a, b]) => {
      const n: Vector = {
        x: a.cpos.x - b.cpos.x,
        y: a.cpos.y - b.cpos.y,
      };

      const m = n.x * n.x + n.y * n.y;
      const s = ((length * length - m) / m) * stiffness * stepCoef;
      n.x *= s;
      n.y *= s;

      a.cpos.x += n.x;
      a.cpos.y += n.y;

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

  constraints.forEach(([a, b]) => {
    ctx.save();
    ctx.translate(a.cpos.x, a.cpos.y);
    ctx.rotate(atan2(b.cpos.y - a.cpos.y, b.cpos.x - a.cpos.x));

    ctx.beginPath();
    ctx.moveTo(0, 4);
    ctx.lineTo(length, 4);
    ctx.moveTo(0, -4);
    ctx.lineTo(length, -4);
    ctx.stroke();

    ctx.restore();
  });
};

// on(canvas, 'mousemove', ({ clientX, clientY }) => {
//   if (!particles[2]) {
//     return;
//   }

//   particles[2].cpos.x = particles[2].ppos.x = clientX / canvasScale;
//   particles[2].cpos.y = particles[2].ppos.y = clientY / canvasScale;
// });

const tick = (time: DOMHighResTimeStamp) => {
  rAF(tick);

  firstTime || (firstTime = time); // tslint:disable-line:no-unused-expression

  if (shouldResize) {
    resize(main, canvas, pixelScale);
    shouldResize = false;

    canvasScale = getCanvasScale();
    xw = sinWave(750, canvas.width / 2 - 14, canvas.width / 2 + 16);
    yw = cosWave(
      750,
      canvas.height / 2 + length * 2,
      canvas.height / 2 + length * 2 - 10,
    );

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

    const bx = sin(random() * ππ) * length;
    const by = cos(random() * ππ) * length;

    const b: Particle = {
      cpos: { x: w / 2 + bx, y: h / 2 + by },
      ppos: { x: w / 2 + bx, y: h / 2 + by },
    };

    const cx = sin(random() * ππ) * length;
    const cy = cos(random() * ππ) * length;

    const c: Particle = {
      cpos: { x: b.cpos.x + cx, y: b.cpos.y + cy },
      ppos: { x: b.ppos.x + cx, y: b.ppos.y + cy },
    };

    particles.push(a);
    particles.push(b);
    particles.push(c);

    constraints.push([a, b]);
    constraints.push([b, c]);

    const d: Particle = {
      cpos: { x: w / 2 + 5, y: h / 2 },
      ppos: { x: w / 2 + 5, y: h / 2 },
    };

    const ex = sin(random() * ππ) * length;
    const ey = cos(random() * ππ) * length;

    const e: Particle = {
      cpos: { x: w / 2 + ex, y: h / 2 + ey },
      ppos: { x: w / 2 + ex, y: h / 2 + ey },
    };

    const fx = sin(random() * ππ) * length;
    const fy = cos(random() * ππ) * length;

    const f: Particle = {
      cpos: { x: b.cpos.x + fx, y: b.cpos.y + fy },
      ppos: { x: b.ppos.x + fx, y: b.ppos.y + fy },
    };

    particles.push(d);
    particles.push(e);
    particles.push(f);

    constraints.push([d, e]);
    constraints.push([e, f]);
  }

  // every subsequent frame
  while (overTime >= frameTime) {
    update(normalTime, frameTime);
    overTime -= frameTime;
  }

  context.clearRect(0, 0, w, h);
  render(context);

  // context.fillStyle = 'red';
  // for (let i = 0; i < 1_000; i += frameTime * 10) {
  //   context.beginPath();
  //   context.ellipse(xw(normalTime + i), yw(normalTime + i), 1, 1, 0, 0, ππ);
  //   context.fill();
  // }

  previousTime = normalTime;
};

rAF(tick);
