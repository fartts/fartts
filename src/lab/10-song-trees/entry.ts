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
const b = c.cloneNode() as HTMLCanvasElement;
const btx = b.getContext('2d') as CanvasRenderingContext2D;

let trees: Tree[] = [];

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
    alpha: 1,
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
  let branch = branches.next();
  if (branch.done) {
    return;
  }

  const { iteration } = branch.value;
  const ts = performance.now();

  while (
    !branch.done &&
    branch.value.iteration === iteration &&
    performance.now() - ts < 10 / trees.length
  ) {
    drawBranch(buf, branch.value);
    branch = branches.next();
  }

  if (!branch.done) {
    drawBranch(buf, branch.value);
  }
}

function draw(/* time: DOMHighResTimeStamp */) {
  rAF(draw);

  if (shouldResize()) {
    resize(c, m);

    b.width = c.width;
    b.height = c.height;

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

  btx.clearRect(0, 0, c.width, c.height);

  trees = trees.filter(({ alpha }) => alpha > 0.1);
  trees.forEach(tree => {
    drawTree(tree);
    tree.alpha *= 0.99;

    btx.globalAlpha = tree.alpha;
    btx.drawImage(tree.buffer, 0, 0);
  });

  ctx.clearRect(0, 0, c.width, c.height);
  ctx.drawImage(b, 0, 0);
}

rAF(draw);
