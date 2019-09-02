import { rAF, el } from '../../../lib/core/dom';
import { resizer } from './resizer';
import { create, update, render } from './simulation';

import './style.css';

const { random, round } = Math;
const hsl = (h = round(random() * 360), s = 60, l = 40) =>
  `hsl(${h}, ${s}%, ${l}%)`;

const m = el('main') as HTMLElement;
const c = el('canvas') as HTMLCanvasElement;
const ctx = c.getContext('2d') as CanvasRenderingContext2D;
const scale = 10;

let ft = 0; // first time
let pt = 0; // previous time
let ct: DOMHighResTimeStamp; // current time
let dt: DOMHighResTimeStamp; // delta time

rAF(function step(ts: DOMHighResTimeStamp) {
  rAF(step);

  ft || (ft = ts); // tslint:disable-line no-unused-expression
  ct = ts - ft;
  dt = ct - pt;
  pt = ct;

  if (resizer.shouldResize) {
    resizer.resize(m, c, scale);

    ctx.fillStyle = hsl();
    ctx.fillRect(0, 0, c.width, c.height);

    create(c.width, c.height);
  }

  update(dt);

  ctx.fillRect(0, 0, c.width, c.height);
  ctx.strokeStyle = `1px solid ${hsl(0, 0, 0)}`;
  render(ctx);
});
