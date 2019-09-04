import { rAF, el } from '../../../lib/core/dom';
import { resizer } from './resizer';
import { create, update, render, remove } from './simulation';

import './style.css';

const { max, random, round } = Math;
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

let fillGradient: CanvasGradient;
let strokeGradient: CanvasGradient;

rAF(function step(ts: DOMHighResTimeStamp) {
  rAF(step);

  ft || (ft = ts); // tslint:disable-line no-unused-expression
  ct = ts - ft;
  dt = ct - pt;
  ot += dt;
  pt = ct;

  if (resizer.shouldResize) {
    resizer.resize(m, c, scale);

    const { width: w, height: h } = c;
    const hw = w / 2;
    const hh = h / 2;
    const hue = round(random() * 360);

    fillGradient = ctx.createRadialGradient(hw, hh, 0, hw, hh, max(hw, hh));
    fillGradient.addColorStop(0, hsl(hue));
    fillGradient.addColorStop(1, hsl((hue + 60) % 360));
    ctx.fillStyle = fillGradient;

    strokeGradient = ctx.createRadialGradient(hw, hh, 0, hw, hh, max(hw, hh));
    strokeGradient.addColorStop(0, hsl((hue + 180) % 360));
    strokeGradient.addColorStop(1, hsl((hue + 240) % 360));
    ctx.strokeStyle = strokeGradient;
    ctx.lineWidth = 2;

    ctx.fillRect(0, 0, w, h);

    remove();
    create(w, h);
  }

  while (ot >= it) {
    update(it);
    ot -= it;
  }

  ctx.fillRect(0, 0, c.width, c.height);
  render(ctx /* , ot / it */);
});
