import { floor, min, π, ππ } from '../../../lib/core/math';
import './style.css';

interface Listener<T extends keyof DocumentEventMap> extends EventListener {
  (event: DocumentEventMap[T]): void;
}

interface State {
  ctx: CanvasRenderingContext2D;
  canvasWidth: number;
  canvasHeight: number;
  safeWidth: number;
  safeHeight: number;
  halfWidth: number;
  halfHeight: number;
  r: number;
  step: number;
  rectWidth: number;
  rectHeight: number;
  lineWidth: number;
  C: number;
  dash: number;
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

const bkgd = ({ ctx, canvasWidth, canvasHeight }: State) => {
  ctx.fillStyle = 'hsl(100, 40%, 60%)';
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);
};

/**
 * apparently this is coming to canvas at some point
 * @see https://www.chromestatus.com/feature/5678204184428544
 * @see https://github.com/fserb/canvas2D/blob/master/spec/roundrect.md
 */
const roundRect = (
  { ctx }: State,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) => {
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

const gridRect = (
  { ctx, canvasWidth, canvasHeight }: State,
  x: number,
  y: number,
  w: number,
  h: number,
  s: number,
) => {
  ctx.beginPath();

  for (let i = 0; i <= w; i += s) {
    ctx.moveTo(x + i, 0);
    ctx.lineTo(x + i, canvasHeight);
  }

  for (let j = 0; j <= h; j += s) {
    ctx.moveTo(0, y + j);
    ctx.lineTo(canvasWidth, y + j);
  }
};

const getState = (): State => {
  const { width: canvasWidth, height: canvasHeight } = canvas;

  const safeWidth = canvasWidth * 0.8;
  const safeHeight = canvasHeight * 0.8;

  const halfWidth = canvasWidth / 2;
  const halfHeight = canvasHeight / 2;

  const r = min(halfWidth, halfHeight) * 0.2;
  const step = r;

  const rectWidth = floor(safeWidth / step) * step;
  const rectHeight = floor(safeHeight / step) * step;

  const lineWidth = min(rectWidth, rectHeight) * 0.025;
  const C = ππ * r + (rectWidth - r * 2) * 2 + (rectHeight - r * 2) * 2;
  const dash = C / 30;

  return {
    ctx,
    canvasWidth,
    canvasHeight,
    safeWidth,
    safeHeight,
    halfWidth,
    halfHeight,
    r,
    step,
    rectWidth,
    rectHeight,
    lineWidth,
    C,
    dash,
  };
};

const pond = (state: State) => {
  const {
    ctx,
    halfWidth,
    halfHeight,
    rectWidth,
    rectHeight,
    lineWidth,
    dash,
    r,
  } = state;

  // draw a pond
  ctx.strokeStyle = 'hsl(50, 10%, 90%)';
  ctx.lineWidth = lineWidth;

  ctx.setLineDash([dash * (17 / 32), dash * (15 / 32)]);
  roundRect(
    state,
    halfWidth - rectWidth / 2,
    halfHeight - rectHeight / 2,
    rectWidth,
    rectHeight,
    r,
  );
  ctx.stroke();
};

const grid = (state: State) => {
  const { ctx, halfWidth, halfHeight, rectWidth, rectHeight, step } = state;

  // draw a grid
  ctx.strokeStyle = 'hsl(0, 0%, 20%)';
  ctx.lineWidth = 1;

  ctx.setLineDash([]);
  gridRect(
    state,
    halfWidth - rectWidth / 2,
    halfHeight - rectHeight / 2,
    rectWidth,
    rectHeight,
    step,
  );
  ctx.stroke();
};

const draw = () => {
  const state = getState();
  bkgd(state);
  pond(state);
  grid(state);
};

on(window, 'resize', resize);
resize();
