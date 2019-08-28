import { rAF, el } from '../../../lib/core/dom';

import resizer from './resizer';

import './style.css';

const { round, random } = Math;

const m = el('main') as HTMLElement;
const c = el('canvas') as HTMLCanvasElement;
const ctx = c.getContext('2d') as CanvasRenderingContext2D;
const scale = 10;

const hsl = (h = round(random() * 360), s = 60, l = 40) =>
  `hsl(${h}, ${s}%, ${l}%)`;

rAF(function step() {
  rAF(step);

  if (resizer.shouldResize) {
    resizer.resize(m, c, scale);

    ctx.fillStyle = hsl();
    ctx.fillRect(0, 0, c.width, c.height);
  }
});
