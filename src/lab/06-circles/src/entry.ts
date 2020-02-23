import './style.css';

import { el, rAF } from '../../../lib/core/dom';
import { shouldResize, resize } from './resize';
import { sinStep } from '../../../lib/core/step';

const c = el('canvas') as HTMLCanvasElement;
const m = el('main') as HTMLElement;
const ctx = c.getContext('2d') as CanvasRenderingContext2D;

const channels = 4;
function index(w: number) {
  return (x: number, y: number) => channels * (y * w + x);
}

interface Color {
  r: number;
  g: number;
  b: number;
  a: number;
}
function pixel(
  getIndex: (x: number, y: number) => number,
  data: Uint8ClampedArray,
) {
  return (x: number, y: number, { r, g, b, a }: Color) => {
    const i = getIndex(x, y);
    // tslint:disable no-bitwise
    data[i + 0] |= r;
    data[i + 1] |= g;
    data[i + 2] |= b;
    data[i + 3] |= a;
    // tslint:enable no-bitwise
  };
}

function renderCircle(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  r: number,
  col = {
    r: 255,
    g: 255,
    b: 255,
    a: 255,
  },
) {
  const {
    canvas: { width: w, height: h },
  } = context;
  const imageData = context.getImageData(0, 0, w, h);
  const { data } = imageData;

  const render = pixel(index(w), data);

  const d = r * 2;

  let i = r - 1;
  let j = 0;
  let di = 1;
  let dj = 1;
  let over = di - d;

  while (i >= j) {
    render(i + x, j + y, col);
    render(j + x, i + y, col);

    render(-i + x, j + y, col);
    render(-j + x, i + y, col);

    render(-i + x, -j + y, col);
    render(-j + x, -i + y, col);

    render(i + x, -j + y, col);
    render(j + x, -i + y, col);

    if (over <= 0) {
      j++;
      over += dj;
      dj += 2;
    }

    if (over > 0) {
      i--;
      di += 2;
      over += -d + di;
    }
  }

  context.putImageData(imageData, 0, 0);
}

const duration = 11000;
const circles = [
  {
    r: 255,
    g: 0,
    b: 0,
    a: 255,
  },
  {
    r: 0,
    g: 255,
    b: 255,
    a: 255,
  },
  {
    r: 0,
    g: 255,
    b: 0,
    a: 255,
  },
  {
    r: 255,
    g: 0,
    b: 255,
    a: 255,
  },
  {
    r: 0,
    g: 0,
    b: 255,
    a: 255,
  },
  {
    r: 255,
    g: 255,
    b: 0,
    a: 255,
  },
].map((color, i, { length }) => ({
  color,
  radius: sinStep(duration, 1, 31, (duration / 2) * (i / length)),
}));

rAF(function tick(time) {
  rAF(tick);

  if (shouldResize()) {
    resize(c, m, 20);
  }

  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, c.width, c.height);

  circles.forEach(({ color, radius }) => {
    renderCircle(ctx, c.width / 2, c.height / 2, radius(time), color);
  });

  renderCircle(ctx, c.width / 2, c.height / 2, 33, circles[0].color);
  renderCircle(ctx, c.width / 2, c.height / 2, 33, circles[2].color);
  renderCircle(ctx, c.width / 2, c.height / 2, 33, circles[4].color);
});
