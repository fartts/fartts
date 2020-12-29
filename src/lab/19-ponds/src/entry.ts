import { floor, min, π, ππ } from '../../../lib/core/math';
import './style.css';

interface Listener<T extends keyof DocumentEventMap> extends EventListener {
  (event: DocumentEventMap[T]): void;
}

const hπ = π / 2;

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

const bkgd = () => {
  const { width: w, height: h } = canvas;

  ctx.fillStyle = 'hsl(100, 40%, 60%)';
  ctx.fillRect(0, 0, w, h);
};

const roundRect = (x: number, y: number, w: number, h: number, r: number) => {
  ctx.beginPath();

  // top left
  ctx.arc(x + r, y + r, r, π, π + hπ);
  ctx.lineTo(x + w - r, y);

  // top right
  ctx.arc(x + w - r, y + r, r, π + hπ, 0);
  ctx.lineTo(x + w, y + h - r);

  // bottom right
  ctx.arc(x + w - r, y + h - r, r, 0, hπ);
  ctx.lineTo(x + w - r, y + h);

  // bottom left
  ctx.arc(x + r, y + h - r, r, hπ, π);
  ctx.lineTo(x, y + r);

  ctx.closePath();
};

const pond = () => {
  const { width: w, height: h } = canvas;

  const rw = w * 0.8;
  const rh = h * 0.8;

  const hw = w / 2;
  const hh = h / 2;

  const r = min(hw, hh) * 0.4;
  const line = min(rw, rh) * 0.025;
  const circ = ππ * r + (rw - r * 2) * 2 + (rh - r * 2) * 2;
  const dash = circ / 30;

  ctx.strokeStyle = 'hsl(50, 10%, 90%)';
  ctx.lineWidth = line;
  ctx.setLineDash([dash * (17 / 32), dash * (15 / 32)]);

  roundRect(hw - rw / 2, hh - rh / 2, rw, rh, r);
  ctx.stroke();
};

const draw = () => {
  bkgd();
  pond();
};

on(window, 'resize', resize);
resize();
