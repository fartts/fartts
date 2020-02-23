import './style.css';

import { el, rAF, on } from '../../../lib/core/dom';
import { shouldResize, resize } from './resize';
import { π, cos, sin, toDegrees, hypot, min } from '../../../lib/core/math';
import { randomRange, random, randomBool } from '../../../lib/core/rand';
import { sawWave, sinWave } from '../../../lib/core/wave';

const c = el('canvas') as HTMLCanvasElement;
const m = el('main') as HTMLElement;
const ctx = c.getContext('2d') as CanvasRenderingContext2D;

const buffer = c.cloneNode() as HTMLCanvasElement;
const buf = buffer.getContext('2d') as CanvasRenderingContext2D;

const totalIterations = 20;
const sWave = sawWave(totalIterations + 1, 100, 50);
const lWave = sinWave(totalIterations + 1, 20, 50);

type Branch = [number, number, number, number, number, number, number];

function* branch(
  x: number,
  y: number,
  a: number,
  s: number,
  i: number,
): IterableIterator<Branch> {
  const ax = x + cos(a) * s;
  const ay = y + sin(a) * s;
  const as = s * randomRange(randomRange(0.6, 0.8), 0.95);
  const str = s * 0.01;

  yield [a, i, x, y, ax, ay, str];

  if (i - 1 > 0) {
    if (random() < 0.8) {
      yield* branch(ax, ay, a - randomRange(0.2, 0.4), as, i - 1);
    }

    if (random() < 0.8) {
      yield* branch(ax, ay, a + randomRange(0.2, 0.4), as, i - 1);
    }
  }
}

function hsla(h: number, s: number, l: number, a: number) {
  return `hsla(${h}, ${s}%, ${l}%, ${a})`;
}

function gradientFor(
  context: CanvasRenderingContext2D,
  [a, i, x, y, ax, ay, str]: Branch,
): CanvasGradient {
  const prev = hsla(toDegrees(a), sWave(i + 1), lWave(i + 1), 1);
  const color = hsla(toDegrees(a), sWave(i), lWave(i), 1);
  const stop = (5 * str) / hypot(ax - x, ay - y);

  const gradient = context.createRadialGradient(
    x,
    y,
    5 * str,
    x,
    y,
    hypot(ax - x, ay - y),
  );

  gradient.addColorStop(0, prev);
  gradient.addColorStop(stop, color);

  return gradient;
}

function drawBranch(
  context: CanvasRenderingContext2D,
  [a, i, x, y, ax, ay, str]: Branch,
) {
  context.beginPath();

  context.strokeStyle = gradientFor(context, [a, i, x, y, ax, ay, str]);
  context.lineWidth = 10 * str;

  context.moveTo(x, y);
  context.lineTo(ax, ay);

  context.stroke();
}

function* tree(x: number, y: number, s: number) {
  const a = π * 1.5 + randomRange(0.05, 0.15) * (randomBool() ? 1 : -1);

  yield* Array.from(branch(x, y, a, s, totalIterations))
    .sort(([, i1], [, i2]) => i2 - i1)
    .values();
}

let treeX = c.width * 0.5;
let treeY = c.height * 0.8;
let treeScale = min(c.width, c.height) / 8;

let trees: IterableIterator<Branch>[] = [];
let isDrawing = false;

function tick() {
  isDrawing = true;

  trees.forEach(t => {
    let b = t.next();

    if (!b.done) {
      const [, i] = b.value;
      const ts = performance.now();

      while (
        !b.done &&
        b.value[1] === i &&
        performance.now() - ts < 10 / trees.length
      ) {
        drawBranch(buf, b.value);
        b = t.next();
      }
    }

    if (!b.done) {
      drawBranch(buf, b.value);
    }
  });

  isDrawing = false;
}

rAF(draw);
function draw(/* time */) {
  rAF(draw);

  if (shouldResize()) {
    resize(c, m);
    buffer.width = c.width;
    buffer.height = c.height;

    buf.fillStyle = '#000';
    buf.fillRect(0, 0, buffer.width, buffer.height);

    treeX = buffer.width * 0.5;
    treeY = buffer.height * 0.9;
    treeScale = min(c.width, c.height) / 8;
    trees = [tree(treeX, treeY, treeScale)];
  }

  buf.lineCap = 'round';
  buf.fillStyle = 'rgba(0,0,0,0.1)';

  if (!isDrawing) {
    setTimeout(tick, 0);
  }

  ctx.clearRect(0, 0, c.width, c.height);
  ctx.drawImage(buffer, 0, 0);
}

on<MouseEvent>('click', () => {
  buf.fillRect(0, 0, buffer.width, buffer.height);
  trees.push(tree(treeX, treeY, treeScale));
});
