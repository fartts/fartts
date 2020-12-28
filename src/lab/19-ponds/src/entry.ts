import { floor, min, ππ } from '../../../lib/core/math';
import './style.css';

interface Listener<T extends keyof DocumentEventMap> extends EventListener {
  (event: DocumentEventMap[T]): void;
}

const el = <T extends keyof HTMLElementTagNameMap>(
  selector: T,
): HTMLElementTagNameMap[T] =>
  document.querySelector(selector) ?? document.createElement(selector);

const on = <T extends EventTarget, U extends keyof DocumentEventMap>(
  target: T,
  forEvent: U,
  listener: Listener<U>,
  options: boolean | AddEventListenerOptions = false,
): void => target.addEventListener(forEvent, listener, options);

const canvas = el('canvas');
const ctx = canvas.getContext('2d');

if (!ctx) {
  throw new Error(`Expected \`CanvasRenderingContext2D\` but got ${ctx}`);
}

const resize = () => {
  const { innerWidth: w, innerHeight: h } = window;
  const dw = floor(w * 2);
  const dh = floor(h * 2);

  canvas.width = dw;
  canvas.height = dh;
  canvas.style.width = `${dw}px`;
  canvas.style.height = `${dh}px`;
  canvas.style.transform = 'scale(0.5)';

  draw();
};

const draw = () => {
  const { width: w, height: h } = canvas;

  const hw = w / 2;
  const hh = h / 2;

  const r = min(hw, hh) * 0.8;
  const line = min(w, h) * 0.025;
  const circ = ππ * r;
  const dash = circ / 30;

  ctx.fillStyle = 'hsl(100, 40%, 60%)';
  ctx.fillRect(0, 0, w, h);

  ctx.strokeStyle = 'hsl(50, 10%, 90%)';
  ctx.lineWidth = line;
  ctx.setLineDash([dash * (17 / 32), dash * (15 / 32)]);

  ctx.beginPath();
  ctx.arc(hw, hh, r, 0, ππ);
  ctx.closePath();
  ctx.stroke();
};

on(window, 'resize', resize);
resize();
