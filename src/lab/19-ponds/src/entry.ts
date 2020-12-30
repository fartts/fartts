import { ceil, floor, min, ππ } from '../../../lib/core/math';
import { el, on } from './dom-utils';
import {
  bottomLeft,
  bottomRight,
  gridRect,
  roundRect,
  topLeft,
  topRight,
} from './drawing-utils';
import { generate } from './map';
import './style.css';
import type { AppState } from './types';

const canvas = el('canvas');
const ctx = canvas.getContext('2d');

if (!ctx) {
  throw new Error(`Expected \`CanvasRenderingContext2D\` but got ${ctx}`);
}

const resize = () => {
  const { innerWidth, innerHeight } = window;
  const doubleWidth = ceil(innerWidth * 2);
  const doubleHeight = ceil(innerHeight * 2);

  canvas.width = doubleWidth;
  canvas.height = doubleHeight;
  canvas.style.width = `${doubleWidth}px`;
  canvas.style.height = `${doubleHeight}px`;
  canvas.style.transform = 'scale(0.5)';

  draw();
};

const getState = (): AppState => {
  const { width: canvasWidth, height: canvasHeight } = canvas;

  const safeWidth = canvasWidth * 0.9;
  const safeHeight = canvasHeight * 0.9;

  const halfWidth = canvasWidth / 2;
  const halfHeight = canvasHeight / 2;

  const r = min(halfWidth, halfHeight) * 0.05;
  const lineWidth = r / 2;

  const step = r * 2;
  const cols = floor(safeWidth / step);
  const rows = floor(safeHeight / step);
  const rectWidth = cols * step;
  const rectHeight = rows * step;

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
    map: generate(cols + 2, rows + 2),
  };
};

const bkgd = ({ ctx, canvasWidth, canvasHeight }: AppState) => {
  ctx.fillStyle = 'hsl(100, 40%, 60%)';
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);
};

const pond = ({
  ctx,
  halfWidth,
  halfHeight,
  rectWidth,
  rectHeight,
  lineWidth,
  step,
  r,
  map,
}: AppState) => {
  ctx.strokeStyle = 'hsl(50, 10%, 90%)';
  ctx.lineWidth = lineWidth;

  ctx.save();
  ctx.translate(
    halfWidth - rectWidth / 2 - step,
    halfHeight - rectHeight / 2 - step,
  );

  map.forEach((row, i) =>
    row.forEach((cell, j) => {
      ctx.beginPath();

      switch (cell) {
        case '╭':
          topLeft({ ctx }, j * step + step, i * step + step, r);
          break;
        case '╮':
          topRight({ ctx }, j * step, i * step + step, r);
          break;
        case '╯':
          bottomRight({ ctx }, j * step, i * step, r);
          break;
        case '╰':
          bottomLeft({ ctx }, j * step + step, i * step, r);
          break;
        case '│':
          ctx.moveTo(j * step + step / 2, i * step);
          ctx.lineTo(j * step + step / 2, i * step + step);
          break;
        case '─':
          ctx.moveTo(j * step, i * step + step / 2);
          ctx.lineTo(j * step + step, i * step + step / 2);
          break;
        case '∙':
          break;
      }

      ctx.stroke();
    }),
  );

  ctx.restore();
};

const grid = ({
  ctx,
  canvasWidth,
  canvasHeight,
  halfWidth,
  halfHeight,
  rectWidth,
  rectHeight,
  step,
}: AppState) => {
  ctx.strokeStyle = 'hsla(0, 0%, 20%, 20%)';
  ctx.lineWidth = 1;

  ctx.setLineDash([]);
  gridRect(
    { ctx, canvasWidth, canvasHeight },
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

  if (process.env.NODE_ENV === 'development') {
    grid(state);
  }

  pond(state);
};

on(window, 'resize', resize);
resize();
