import './style.css';

import { rAF, el, dpr } from '../../lib/core/dom';
import pointer from './pointer';

import { shouldResize, resize } from './resize';
import { Branch, Tree } from './tree/constants';
import { gradient } from './tree/gradient';
import { lerp, min } from '../../lib/core/math';

const m = el('main') as HTMLMainElement;

const c = el('canvas') as HTMLCanvasElement;
const ctx = c.getContext('2d') as CanvasRenderingContext2D;

const d = c.cloneNode() as HTMLCanvasElement;
const dtx = d.getContext('2d') as CanvasRenderingContext2D;

let trees: Tree[] = [];

const treeWorker = new Worker('./tree/worker.ts');
treeWorker.addEventListener('message', ({ data: [root, branches] }) => {
  trees.push({
    root,
    branches: branches.values(),
    alpha: root.y / c.height,
  });

  trees.sort(({ root: { y: y1 } }, { root: { y: y2 } }) => y1 - y2);
});

function drawBranch(context: CanvasRenderingContext2D, b: Branch) {
  context.beginPath();

  context.strokeStyle = gradient(context, b);
  context.lineWidth = b.lineWidth;
  context.lineCap = 'round';

  context.moveTo(b.startX, b.startY);
  context.lineTo(b.endX, b.endY);

  context.stroke();
}

function drawTree(t: Tree) {
  let b = t.branches.next();
  if (b.done) {
    return;
  }

  t.alpha *= 0.99;

  const { iteration } = b.value;
  const ts = performance.now();

  while (
    !b.done &&
    b.value.iteration === iteration &&
    performance.now() - ts < 10 / trees.length
  ) {
    drawBranch(dtx, b.value);
    b = t.branches.next();
  }

  if (!b.done) {
    drawBranch(dtx, b.value);
  }
}

function draw(/* time: DOMHighResTimeStamp */) {
  rAF(draw);

  if (shouldResize()) {
    resize(c, m);

    d.width = c.width;
    d.height = c.height;

    dtx.fillStyle = 'rgba(250, 250, 250, 1)';
    dtx.fillRect(0, 0, d.width, d.height);
  }

  if (pointer.isDown) {
    dtx.fillStyle = 'rgba(250, 250, 250, 0.1)';
    dtx.fillRect(0, 0, d.width, d.height);

    const scale = lerp(20, 8, (pointer.y * dpr) / c.height);

    treeWorker.postMessage({
      x: pointer.x * dpr,
      y: pointer.y * dpr,
      length: min(c.width, c.height) / scale,
    });
  }

  trees = trees.filter(t => t.alpha > 0.1);
  trees.forEach(drawTree);

  ctx.drawImage(d, 0, 0);
}

rAF(draw);
