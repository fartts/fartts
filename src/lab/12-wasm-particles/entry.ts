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

function stepUp(step = 1, start = 0) {
  if (start % step === 0) {
    // start is already a multiple of step, bail early
    return start;
  }

  return start + (step - (start % step));
}

const { devicePixelRatio: dpr } = window;

const main = el('main') as HTMLMainElement;
const canvas = el('canvas') as HTMLCanvasElement;
const context = canvas.getContext('2d') as CanvasRenderingContext2D;

let { clientWidth: w, clientHeight: h } = main;
on(window, 'resize', () => {
  w = main.clientWidth;
  h = main.clientHeight;

  const scale = 80;
  const sw = stepUp(scale, w);
  const sh = stepUp(scale, h);

  canvas.width = (sw * dpr) / scale;
  canvas.height = (sh * dpr) / scale;
  canvas.style.transform = `scale(${(1 / dpr) * scale})`;

  console.log((1 / dpr) * scale, max(w / canvas.width, h / canvas.height));
});
window.dispatchEvent(new Event('resize'));

console.log(context); // tslint:disable-line
// draw(context, canvas.width, canvas.height);
