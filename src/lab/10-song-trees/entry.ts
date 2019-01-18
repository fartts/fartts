import './style.css';

import { rAF, el, dpr } from '../../lib/core/dom';
import pointer from './pointer';

import { shouldResize, resize } from './resize';
import { Branch, Tree } from './tree/constants';
import { gradient } from './tree/gradient';
import { lerp, min } from '../../lib/core/math';

const c = el('canvas') as HTMLCanvasElement;
const m = el('main') as HTMLMainElement;
const ctx = c.getContext('2d') as CanvasRenderingContext2D;

const trees: Tree[] = [];

const treeWorker = new Worker('./tree/worker.ts');
treeWorker.addEventListener('message', ({ data: [root, branches] }) => {
  const buffer = c.cloneNode() as HTMLCanvasElement;
  const buf = buffer.getContext('2d') as CanvasRenderingContext2D;

  buffer.width = c.width;
  buffer.height = c.height;

  trees.push({
    root,
    branches: branches.values(),
    buffer,
    buf,
  });

  trees.sort(({ root: { y: y1 } }, { root: { y: y2 } }) => y1 - y2);
});

function drawBranch(context: CanvasRenderingContext2D, b: Branch) {
  context.beginPath();

  context.strokeStyle = gradient(context, b);
  context.lineWidth = b.lineWidth;

  context.moveTo(b.startX, b.startY);
  context.lineTo(b.endX, b.endY);

  context.stroke();
}

function drawTree({ branches, buf }: Tree) {
  let b = branches.next();
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
    drawBranch(buf, b.value);
    b = branches.next();
  }

  if (!b.done) {
    drawBranch(buf, b.value);
  }
}

function draw(/* time: DOMHighResTimeStamp */) {
  rAF(draw);

  if (shouldResize()) {
    resize(c, m);

    trees.forEach(({ buffer }) => {
      buffer.width = c.width;
      buffer.height = c.height;
    });
  }

  if (pointer.isDown) {
    const scale = lerp(20, 8, (pointer.y * dpr) / c.height);

    treeWorker.postMessage({
      x: pointer.x * dpr,
      y: pointer.y * dpr,
      length: min(c.width, c.height) / scale,
    });
  }

  trees.forEach(tree => {
    drawTree(tree);
    ctx.drawImage(tree.buffer, 0, 0);
  });
}

rAF(draw);
