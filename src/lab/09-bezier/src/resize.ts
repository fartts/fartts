import { on } from '../../../lib/core/dom';
import { max } from '../../../lib/core/math';

function nextMultiple(multipleOf = 1, startingFrom = 0) {
  return startingFrom % multipleOf !== 0
    ? startingFrom + (multipleOf - (startingFrom % multipleOf))
    : startingFrom;
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

  const width = nextMultiple(scale, w);
  const height = nextMultiple(scale, h);

  canvas.width = (width * dpr) / scale;
  canvas.height = (height * dpr) / scale;

  canvas.style.transform = `scale(${max(w / canvas.width, h / canvas.height)})`;
}
