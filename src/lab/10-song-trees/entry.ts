import './style.css';

import { rAF, el, on, dpr } from '../../lib/core/dom';
import { min } from '../../lib/core/math';

import { shouldResize, resize } from './resize';
import { Branch } from './tree/constants';
import { gradient } from './tree/gradient';

const c = el('canvas') as HTMLCanvasElement;
const m = el('main') as HTMLMainElement;
const ctx = c.getContext('2d') as CanvasRenderingContext2D;

const buffer = c.cloneNode() as HTMLCanvasElement;
const buf = buffer.getContext('2d') as CanvasRenderingContext2D;

const trees: Array<IterableIterator<Branch>> = [];

const treeWorker = new Worker('./tree/worker.ts');
treeWorker.addEventListener('message', ({ data }) => {
  if (data.length < 10000) {
    return;
  }

  trees.push(data.values());
});

function drawBranch(b: Branch) {
  buf.beginPath();

  buf.strokeStyle = gradient(buf, b);
  buf.lineWidth = b.lineWidth;

  buf.moveTo(b.startX, b.startY);
  buf.lineTo(b.endX, b.endY);

  buf.stroke();
}

function drawTree(t: IterableIterator<Branch>) {
  let b = t.next();
  if (b.done) {
    return;
  }

  const { iteration } = b.value;
  const ts = performance.now();

  while (
    !b.done &&
    b.value.iteration === iteration &&
    performance.now() - ts < 10 / trees.length
  ) {
    drawBranch(b.value);
    b = t.next();
  }

  if (!b.done) {
    drawBranch(b.value);
  }
}

function draw(/* time: DOMHighResTimeStamp */) {
  rAF(draw);

  if (shouldResize()) {
    resize(c, m);
    buffer.width = c.width;
    buffer.height = c.height;

    buf.fillStyle = `rgba(0, 0, 0, 0.1)`;
    buf.fillRect(0, 0, buffer.width, buffer.height);
  }

  buf.lineCap = 'round';

  trees.forEach(drawTree);
  ctx.drawImage(buffer, 0, 0);
}

rAF(draw);

on<MouseEvent>('click', ({ clientX, clientY }) => {
  buf.fillRect(0, 0, buffer.width, buffer.height);

  treeWorker.postMessage({
    x: clientX * dpr,
    y: clientY * dpr,
    length: min(c.width, c.height) / 12,
    angle: 0,
    iteration: 0,
  });
});
