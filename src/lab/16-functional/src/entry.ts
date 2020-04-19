import './style.css';

import { el, rAF } from '../../../lib/core/dom';
import { π, ππ, max, sin, cos, atan2, min, abs } from '../../../lib/core/math';
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

// @ts-ignore
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

const rotate: (v: Vector, o: Vector, a: number) => Vector = (v, o, a) => ({
  x: (v.x - o.x) * cos(a) - (v.y - o.y) * sin(a) + o.x,
  y: (v.x - o.x) * sin(a) + (v.y - o.y) * cos(a) + o.y,
});

const angula: (a: Particle, b: Particle, c: Particle) => void = (a, b, c) => {
  const x1 = a.cpos.x - b.cpos.x;
  const y1 = a.cpos.y - b.cpos.y;

  const x2 = c.cpos.x - b.cpos.x;
  const y2 = c.cpos.y - b.cpos.y;

  const angle = (atan2(x1 * y2 - y1 * x2, x1 * x2 + y1 * y2) + ππ) % ππ;

  if (angle < π * 0.8 || ππ * 0.8 < angle) {
    const diff = min(abs(angle - π), abs(ππ * 0.9 - angle)) * stiffness;

    a.cpos = rotate(a.cpos, b.cpos, diff);
    c.cpos = rotate(c.cpos, b.cpos, -diff);

    b.cpos = rotate(b.cpos, a.cpos, diff);
    b.cpos = rotate(b.cpos, c.cpos, -diff);
  }
};

const update = (t: number, dt: number) => {
  particles.forEach((p, i) => {
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

  const [a, b, c, d, e, f] = particles;

  if (a) {
    a.cpos.x = canvas.width / 2;
    a.cpos.y = canvas.height / 2;
  }

  if (c) {
    c.cpos.x = xw(t);
    c.cpos.y = yw(t);
  }

  if (d) {
    d.cpos.x = canvas.width / 2 + 5;
    d.cpos.y = canvas.height / 2;
  }

  if (f) {
    f.cpos.x = xw(t + 375) + 5;
    f.cpos.y = yw(t + 375);
  }

  for (let i = 0; i < step; ++i) {
    constraints.forEach(([g, h]) => {
      const n: Vector = {
        x: g.cpos.x - h.cpos.x,
        y: g.cpos.y - h.cpos.y,
      };

      const m = n.x * n.x + n.y * n.y;
      const s = ((length * length - m) / m) * stiffness * stepCoef;
      n.x *= s;
      n.y *= s;

      g.cpos.x += n.x;
      g.cpos.y += n.y;

      h.cpos.x -= n.x;
      h.cpos.y -= n.y;
    });
  }

  angula(a, b, c);
  angula(d, e, f);
};

const render = (ctx: CanvasRenderingContext2D) => {
  ctx.lineWidth = 1;

  particles.forEach(({ cpos }, i) => {
    ctx.strokeStyle = i < 3 ? 'rgb(255, 0, 0, 0.5)' : 'rgb(0, 0, 255, 0.5)';

    ctx.beginPath();
    ctx.ellipse(cpos.x, cpos.y, 5, 5, 0, 0, ππ);
    ctx.stroke();
  });

  constraints.forEach(([a, b], i) => {
    ctx.strokeStyle = i < 2 ? 'rgb(255, 0, 0, 0.5)' : 'rgb(0, 0, 255, 0.5)';

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
//   if (!particles[5]) {
//     return;
//   }

//   particles[5].cpos.x = particles[5].ppos.x = clientX / canvasScale;
//   particles[5].cpos.y = particles[5].ppos.y = clientY / canvasScale;
// });

const leg: (x: number, y: number) => void = (x, y) => {
  const a: Particle = {
    cpos: { x, y },
    ppos: { x, y },
  };

  const b: Particle = {
    cpos: { x, y: y + length },
    ppos: { x, y: y + length },
  };

  const c: Particle = {
    cpos: { x, y: y + length * 2 },
    ppos: { x, y: y + length * 2 },
  };

  particles.push(a);
  particles.push(b);
  particles.push(c);

  constraints.push([a, b]);
  constraints.push([b, c]);
};

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

    leg(w / 2, h / 2);
    leg(w / 2 + 5, h / 2);
  }

  // every subsequent frame
  while (overTime >= frameTime) {
    update(normalTime, frameTime);
    overTime -= frameTime;
  }

  context.fillStyle = 'white';
  context.fillRect(0, 0, w, h);
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

if ('MediaRecorder' in window && MediaRecorder.isTypeSupported('video/webm')) {
  const button = document.createElement('button');
  button.innerText = 'WEBM';

  button.addEventListener('click', () => {
    // @ts-ignore
    const stream = canvas.captureStream(60);
    const recorder = new MediaRecorder(stream, {
      mimeType: 'video/webm',
      videoBitsPerSecond: 10_000_000,
    });
    const chunks: BlobPart[] = [];

    recorder.ondataavailable = (event) => chunks.push(event.data);
    recorder.onstop = () => {
      const blob = new Blob(chunks, {
        type: 'video/webm',
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');

      a.setAttribute('href', url);
      a.setAttribute('download', 'legs.webm');
      a.setAttribute('target', '_blank');
      a.style.display = 'none';

      document.body.appendChild(a);

      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    };

    (() => {
      recorder.start();
      setTimeout(() => recorder.stop(), 750);
    })();
  });

  main.appendChild(button);
}
