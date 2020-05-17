import { ππ } from '../../../../lib/core/math';

import { env } from '../util/env';
import { state } from '../util/state';

export const render: (ctx: CanvasRenderingContext2D) => void = (ctx) => {
  const { width, height } = env.canvas;
  const { mouse, mouseDown, bounds, intersections, player } = state;

  ctx.clearRect(0, 0, width, height);

  ctx.beginPath();
  ctx.strokeStyle = ctx.fillStyle = 'black';
  bounds.forEach(([a, b]) => {
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
  });
  ctx.stroke();

  ctx.beginPath();
  ctx.strokeStyle = ctx.fillStyle = 'black';
  ctx.ellipse(player.cpos.x, player.cpos.y, 13, 13, 0, 0, ππ);
  mouseDown ? ctx.fill() : ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(player.ppos.x, player.ppos.y);
  ctx.lineTo(player.cpos.x, player.cpos.y);
  ctx.stroke();

  ctx.beginPath();
  ctx.strokeStyle = ctx.fillStyle = 'blue';
  ctx.ellipse(mouse.cpos.x, mouse.cpos.y, 8, 8, 0, 0, ππ);
  mouseDown ? ctx.fill() : ctx.stroke();

  ctx.beginPath();
  ctx.strokeStyle = ctx.fillStyle = 'red';
  ctx.ellipse(mouse.ppos.x, mouse.ppos.y, 5, 5, 0, 0, ππ);
  mouseDown ? ctx.fill() : ctx.stroke();

  ctx.strokeStyle = ctx.fillStyle = 'green';
  intersections.forEach(({ x, y }) => {
    ctx.beginPath();
    ctx.moveTo(x - 3, y - 3);
    ctx.lineTo(x + 3, y + 3);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(x - 3, y + 3);
    ctx.lineTo(x + 3, y - 3);
    ctx.stroke();
  });
};
