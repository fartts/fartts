import { el, rAF } from '../../lib/core/dom';
import { resize, shouldResize } from './resize';

import './style.css';

const m = el('main') as HTMLMainElement;
const c = el('canvas') as HTMLCanvasElement;
const ctx = c.getContext('2d') as CanvasRenderingContext2D;

function draw(/* ts: number */) {
  rAF(draw);

  if (shouldResize()) {
    resize(c, m);
  }

  ctx.clearRect(0, 0, c.width, c.height);
}

rAF(draw);
