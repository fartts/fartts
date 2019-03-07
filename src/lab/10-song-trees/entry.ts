import './style.css';

import { rAF, el, dpr } from '../../lib/core/dom';
import pointer from './pointer';

import { shouldResize, resize } from './resize';
import Branch from './tree/constants/branch';
import Tree from './tree/constants/tree';
import { gradient } from './tree/gradient';
import { lerp, min, random } from '../../lib/core/math';

document.addEventListener('touchstart', () => true, true);

const m = el('main') as HTMLMainElement;

const c = el('canvas') as HTMLCanvasElement;
const ctx = c.getContext('2d') as CanvasRenderingContext2D;

const d = c.cloneNode() as HTMLCanvasElement;
const dtx = d.getContext('2d') as CanvasRenderingContext2D;

let trees: Tree[] = [];
const iterations = 'ontouchstart' in window ? 8 : 18;

const treeWorker = new Worker('./tree/worker.ts');
treeWorker.addEventListener('message', ({ data: [root, branches] }) => {
  trees.push({
    root,
    branches: branches.values(),
    life: 1,
  });

  trees.sort(({ root: { y: y1 } }, { root: { y: y2 } }) => y1 - y2);
});

function drawBranch(context: CanvasRenderingContext2D, b: Branch) {
  context.beginPath();

  context.strokeStyle = gradient(context, b, iterations);
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

  t.life *= 0.95;

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

function gray98(alpha: number) {
  return `rgba(250, 250, 250, ${alpha})`;
}

const bpm98 = 60000 / 98 / 16;
const fps60 = 1000 / 60;

function draw(time: DOMHighResTimeStamp) {
  rAF(draw);

  if (shouldResize()) {
    resize(c, m);

    d.width = c.width;
    d.height = c.height;

    dtx.fillStyle = gray98(1);
    dtx.fillRect(0, 0, d.width, d.height);

    ctx.drawImage(d, 0, 0);
  }

  if (pointer.isDown && time % bpm98 < fps60) {
    dtx.fillStyle = gray98(0.1);
    dtx.fillRect(0, 0, d.width, d.height);

    const scale = lerp(20, 8, (pointer.y * dpr) / c.height);

    treeWorker.postMessage({
      root: {
        x: pointer.x * dpr,
        y: pointer.y * dpr,
        length: min(c.width, c.height) / scale,
      },
      iterations,
    });
  }

  if (random() < 0.5) {
    dtx.fillStyle = gray98(0.01);
    dtx.fillRect(0, 0, d.width, d.height);
  }

  trees = trees.filter(t => t.life > 0.05);
  trees.forEach(drawTree);

  if (d.width && d.height) {
    ctx.drawImage(d, 0, 0);
  } else {
    console.log('invalid buffer, resizing'); // tslint:disable-line
    dispatchEvent(new Event('resize'));
  }
}

rAF(draw);
