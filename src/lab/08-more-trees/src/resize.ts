import { on } from '../../../lib/core/dom';
import { max } from '../../../lib/core/math';

function next(multipleOf = 1, startingAt = 0) {
  return startingAt % multipleOf !== 0
    ? startingAt + (multipleOf - (startingAt % multipleOf))
    : startingAt;
}

let didResizeWindow = true;
on('resize', () => {
  didResizeWindow = true;
});

export function shouldResize() {
  return didResizeWindow;
}

export function resize(
  canvas: HTMLCanvasElement,
  container: HTMLElement,
  scale = 1,
): void {
  if (!didResizeWindow) {
    return;
  }

  didResizeWindow = false;

  const { devicePixelRatio: dpr } = window;
  const { clientHeight: h, clientWidth: w } = container;

  const width = next(scale, w);
  const height = next(scale, h);

  canvas.width = (width * dpr) / scale;
  canvas.height = (height * dpr) / scale;

  canvas.style.transform = `scale(${max(w / canvas.width, h / canvas.height)})`;
}
