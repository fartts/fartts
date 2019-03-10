import { el } from '../../lib/core/dom';
import { max } from '../../lib/core/math';

import './style.css';

function on(
  target: EventTarget,
  type: string,
  listener: EventListener,
  useCapture: boolean = false,
) {
  target.addEventListener(type, listener, useCapture);
}

function step(by = 1, from = 0) {
  if (from % by === 0) {
    // "from" is already a multiple/step of "by", we're done
    return from;
  }

  return from + (by - (from % by));
}

const { devicePixelRatio: dpr } = window;

const main = el('main') as HTMLMainElement;
const canvas = el('canvas') as HTMLCanvasElement;
const context = canvas.getContext('2d') as CanvasRenderingContext2D;

let { clientWidth: w, clientHeight: h } = main;
on(window, 'resize', () => {
  w = main.clientWidth;
  h = main.clientHeight;

  const scale = 10;
  const sw = step(scale, w);
  const sh = step(scale, h);

  canvas.width = (sw * dpr) / scale;
  canvas.height = (sh * dpr) / scale;

  const cover = max(w / canvas.width, h / canvas.height);
  // const contain = min(w / canvas.width, h / canvas.height);
  canvas.style.transform = `scale(${cover})`;
});
window.dispatchEvent(new Event('resize'));

console.log(context); // tslint:disable-line
// draw(context, canvas.width, canvas.height);
