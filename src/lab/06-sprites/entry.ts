import './style.css';

import { el, rAF } from '../../lib/core/dom';
import { shouldResize, resize } from './resize';
import { ππ } from '../../lib/core/math';

const c = el('canvas') as HTMLCanvasElement;
const m = el('main') as HTMLMainElement;
const ctx = c.getContext('2d', { alpha: false }) as CanvasRenderingContext2D;

rAF(function tick(/* time */) {
  // rAF(tick);

  if (shouldResize()) {
    resize(c, m, 20);
  }

  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, c.width, c.height);

  ctx.beginPath();
  ctx.arc(c.width / 2, c.height / 2, 20, 0, ππ);
  ctx.closePath();

  ctx.strokeStyle = '#fff';
  ctx.stroke();
});
