import './style.css';

import { rAF, el, on } from '../../lib/core/dom';
import { toDegrees, ππ, min, round, randomRange } from '../../lib/core/math';

import { shouldResize, resize } from './resize';
import { tree, Branch } from './tree';

const c = el('canvas') as HTMLCanvasElement;
const m = el('main') as HTMLMainElement;
const ctx = c.getContext('2d') as CanvasRenderingContext2D;

const buffer = c.cloneNode() as HTMLCanvasElement;
const buf = buffer.getContext('2d') as CanvasRenderingContext2D;

const trees: Array<IterableIterator<Branch>> = [];

function drawBranch({ startX, startY, endX, endY, lineWidth }: Branch) {
  buf.beginPath();

  buf.strokeStyle = '#fff';
  buf.lineWidth = lineWidth;

  buf.moveTo(startX, startY);
  buf.lineTo(endX, endY);

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

    // buf.fillStyle = `hsla(${toDegrees((time / 1000) % ππ)}, 50%, 50%, 0.1)`;
    buf.fillStyle = `rgba(0, 0, 0, 0.1)`;
    buf.fillRect(0, 0, buffer.width, buffer.height);

    trees.push(
      tree({
        x: c.width * 0.5,
        y: c.height * 0.8,
        length: min(c.width, c.height) / 8,
        angle: 0,
        iteration: 0,
      }),
    );
  }

  buf.lineCap = 'round';

  trees.forEach(drawTree);
  ctx.drawImage(buffer, 0, 0);
}

rAF(draw);

on<MouseEvent>('click', () => {
  buf.fillRect(0, 0, buffer.width, buffer.height);
  trees.push(
    tree(
      {
        x: c.width * 0.5,
        y: c.height * 0.8,
        length: min(c.width, c.height) / 8,
        angle: 0,
        iteration: 0,
      },
      round(randomRange(15, 25)),
    ),
  );
});
