import { rAF, el } from '../../../lib/core/dom';

import resizer from './resizer';

import './style.css';

const { round, random } = Math;

const m = el('main') as HTMLElement;
const c = el('canvas') as HTMLCanvasElement;
const ctx = c.getContext('2d') as CanvasRenderingContext2D;
const s = 10;

rAF(function step() {
  rAF(step);

  if (resizer.shouldResize) {
    resizer.resize(m, c, s);

    ctx.fillStyle = `hsl(${round(random() * 360)}, 50%, 50%)`;
    ctx.fillRect(0, 0, c.width, c.height);
  }
});
