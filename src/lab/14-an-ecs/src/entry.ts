import { rAF, el } from '../../../lib/core/dom';
import { resizer } from './resizer';
import { create, update, render, remove } from './simulation';

import './style.css';

const { random, round } = Math;
const hsl = (h = round(random() * 360), s = 60, l = 40) =>
  `hsl(${h}, ${s}%, ${l}%)`;

const m = el('main') as HTMLElement;
const c = el('canvas') as HTMLCanvasElement;
const ctx = c.getContext('2d') as CanvasRenderingContext2D;
const scale = 2;

let ft = 0; // first time
let pt = 0; // previous time

let ct: DOMHighResTimeStamp; // current time
let dt: DOMHighResTimeStamp; // delta time

let ot = 0; // over time
const it = 1_000 / 60; // ideal time

rAF(function step(ts: DOMHighResTimeStamp) {
  rAF(step);

  ft || (ft = ts); // tslint:disable-line no-unused-expression
  ct = ts - ft;
  dt = ct - pt;
  ot += dt;
  pt = ct;

  if (resizer.shouldResize) {
    resizer.resize(m, c, scale);

    ctx.fillStyle = hsl();
    ctx.fillRect(0, 0, c.width, c.height);

    remove();
    create(c.width, c.height);
  }

  while (ot >= it) {
    update(it);
    ot -= it;
  }

  ctx.fillRect(0, 0, c.width, c.height);
  ctx.strokeStyle = hsl(0, 0, 0);
  render(ctx /* , ot / it */);
});
