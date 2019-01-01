import { el, rAF } from '../../lib/core/dom';
import { resize, shouldResize } from './resize';

import './style.css';
import { min } from '../../lib/core/math';

const m = el('main') as HTMLMainElement;
const c = el('canvas') as HTMLCanvasElement;
const ctx = c.getContext('2d') as CanvasRenderingContext2D;

let graphSize = 0;
let hs = 0;

let w = 0;
let h = 0;
let hw = 0;
let hh = 0;

function draw(/* ts: number */) {
  rAF(draw);

  if (shouldResize()) {
    resize(c, m);
    const { width, height } = c;

    w = width;
    h = height;
    hw = w / 2;
    hh = h / 2;

    graphSize = min(c.width, c.height) * 0.8;
    hs = graphSize / 2;
  }

  ctx.clearRect(0, 0, c.width, c.height);

  ctx.lineWidth = 1;
  ctx.strokeStyle = '#e7e7e7';
  ctx.strokeRect(hw - hs, hh - hs, graphSize, graphSize);
}

rAF(draw);
