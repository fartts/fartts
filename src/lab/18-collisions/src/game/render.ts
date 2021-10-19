import { hypot, ππ } from '../../../../lib/core/math';

import { env } from '../util/env';
import { state } from '../util/state';
import { adds, addv, Line, Vec2 } from '../util/vec2';

const es = 12 / env.scale;

// radii: large, medium, small
const rl = 13 * es;
const rm = 8 * es;
const rs = 5 * es;

// sizes: cross, plus
const sc = 3 * es;
const sp = hypot(sc, sc);

const line: (ctx: CanvasRenderingContext2D, a: Vec2, b: Vec2) => void = (
  ctx,
  a,
  b,
) => {
  ctx.beginPath();
  ctx.moveTo(a.x, a.y);
  ctx.lineTo(b.x, b.y);
  ctx.stroke();
};

const chain: (ctx: CanvasRenderingContext2D, lines: Line[]) => void = (
  ctx,
  lines,
) => {
  ctx.beginPath();
  lines.forEach(([a, b]) => {
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
  });
  ctx.stroke();
};

const cross: (ctx: CanvasRenderingContext2D, v: Vec2, s: number) => void = (
  ctx,
  v,
  s,
) => {
  line(ctx, adds(v, -s), adds(v, s));
  line(ctx, addv(v, { x: -s, y: s }), addv(v, { x: s, y: -s }));
};

const plus: (ctx: CanvasRenderingContext2D, v: Vec2, s: number) => void = (
  ctx,
  v,
  s,
) => {
  line(ctx, addv(v, { x: 0, y: -s }), addv(v, { x: 0, y: s }));
  line(ctx, addv(v, { x: -s, y: 0 }), addv(v, { x: s, y: 0 }));
};

export const render: (ctx: CanvasRenderingContext2D) => void = (ctx) => {
  const { width, height } = env.canvas;
  const { mouse, mouseDown, bounds, intersections, player } = state;

  ctx.clearRect(0, 0, width, height);

  ctx.strokeStyle = ctx.fillStyle = 'black';
  chain(ctx, bounds);

  ctx.strokeStyle = ctx.fillStyle = 'black';
  ctx.beginPath();
  ctx.ellipse(player.cpos.x, player.cpos.y, rl, rl, 0, 0, ππ);
  mouseDown ? ctx.fill() : ctx.stroke();

  ctx.strokeStyle = ctx.fillStyle = 'cyan';
  plus(ctx, player.cpos, sp);

  ctx.strokeStyle = ctx.fillStyle = 'blue';
  ctx.beginPath();
  ctx.ellipse(mouse.cpos.x, mouse.cpos.y, rm, rm, 0, 0, ππ);
  mouseDown ? ctx.fill() : ctx.stroke();

  ctx.strokeStyle = ctx.fillStyle = 'red';
  ctx.beginPath();
  ctx.ellipse(mouse.ppos.x, mouse.ppos.y, rs, rs, 0, 0, ππ);
  mouseDown ? ctx.fill() : ctx.stroke();

  ctx.strokeStyle = ctx.fillStyle = 'green';

  // prettier-ignore
  intersections.forEach(([/* [a, b] */, /* [c, d] */, ipos]) => {
    cross(ctx, ipos, sc);

    // // debugging
    // const v = subv(d, c);
    // const n = nrml(perp(subv(b, a)));

    // ctx.strokeStyle = ctx.fillStyle = 'orange';
    // line(ctx, ipos, addv(ipos, muls(nrml(perp(subv(a, ipos))), 100)));

    // ctx.strokeStyle = ctx.fillStyle = 'teal';
    // line(ctx, ipos, addv(ipos, subv(v, muls(n, 2 * dotp(v, n)))));
  });

  ctx.strokeStyle = ctx.fillStyle = 'magenta';
  line(ctx, player.ppos, player.cpos);
};
