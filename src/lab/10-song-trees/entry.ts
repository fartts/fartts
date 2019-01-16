import './style.css';

import { rAF, el } from '../../lib/core/dom';
import { shouldResize, resize } from './resize';
import { toDegrees, ππ } from '../../lib/core/math';

const c = el('canvas') as HTMLCanvasElement;
const m = el('main') as HTMLMainElement;
const ctx = c.getContext('2d') as CanvasRenderingContext2D;

const buffer = c.cloneNode() as HTMLCanvasElement;
const buf = buffer.getContext('2d') as CanvasRenderingContext2D;

function draw(time: DOMHighResTimeStamp) {
  rAF(draw);

  if (shouldResize()) {
    resize(c, m);
    buffer.width = c.width;
    buffer.height = c.height;

    buf.fillStyle = `hsla(${toDegrees((time / 1000) % ππ)}, 50%, 50%, 1)`;
    buf.fillRect(0, 0, buffer.width, buffer.height);
  }

  ctx.drawImage(buffer, 0, 0);
}

rAF(draw);
