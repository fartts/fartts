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

/**
 * apparently this is coming to canvas at some point
 * @see https://www.chromestatus.com/feature/5678204184428544
 * @see https://github.com/fserb/canvas2D/blob/master/spec/roundrect.md
 */
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

  const rectWidth = w * 0.8;
  const rectHeight = h * 0.8;

  const halfWidth = w / 2;
  const halfHeight = h / 2;

  const r = min(halfWidth, halfHeight) * 0.4;
  const lineWidth = min(rectWidth, rectHeight) * 0.025;
  const C = ππ * r + (rectWidth - r * 2) * 2 + (rectHeight - r * 2) * 2;
  const dash = C / 30;

  ctx.strokeStyle = 'hsl(50, 10%, 90%)';
  ctx.lineWidth = lineWidth;

  ctx.setLineDash([dash * (17 / 32), dash * (15 / 32)]);
  roundRect(
    halfWidth - rectWidth / 2,
    halfHeight - rectHeight / 2,
    rectWidth,
    rectHeight,
    r,
  );
  ctx.stroke();
};

const grid = () => {
  const { width: w, height: h } = canvas;

  const rectWidth = w * 0.8;
  const rectHeight = h * 0.8;

  const halfWidth = w / 2;
  const halfHeight = h / 2;

  const step = min(halfWidth, halfHeight) * 0.4;

  ctx.strokeStyle = 'hsl(0, 0%, 20%)';
  ctx.lineWidth = 1;

  ctx.setLineDash([]);
  ctx.beginPath();

  for (let i = 0; i < rectWidth; i += step) {
    ctx.moveTo(halfWidth - rectWidth / 2 + i, 0);
    ctx.lineTo(halfWidth - rectWidth / 2 + i, h);
  }

  for (let j = 0; j < rectHeight; j += step) {
    ctx.moveTo(0, halfHeight - rectHeight / 2 + j);
    ctx.lineTo(w, halfHeight - rectHeight / 2 + j);
  }

  ctx.stroke();
};

const draw = () => {
  bkgd();
  pond();
  grid();
};

on(window, 'resize', resize);
resize();
