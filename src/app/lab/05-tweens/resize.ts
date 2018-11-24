import { on } from '../../../lib/dom';

const { isInteger } = Number;

function next(a: number, b: number): number {
  while (!isInteger(a / b)) {
    a += 1;
  }

  return a;
}

let shouldResize = true;

export default function resize(
  c: HTMLCanvasElement,
  m: HTMLMainElement,
): boolean {
  if (!shouldResize) {
    return false;
  }

  shouldResize = false;

  let { devicePixelRatio: dpr } = window;
  let { clientWidth: width, clientHeight: height } = m;

  if (dpr === undefined) {
    dpr = 1;
  }

  const scale = 1;
  width = next(width, scale);
  height = next(height, scale);

  const w = (width * dpr) / scale;
  const h = (height * dpr) / scale;

  c.style.width = `${width}px`;
  c.style.height = `${height}px`;

  c.width = w;
  c.height = h;

  return true;
}

on('resize', () => {
  shouldResize = true;
});
