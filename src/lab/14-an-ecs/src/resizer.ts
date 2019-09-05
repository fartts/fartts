import { attend } from './events';

interface ResizeableElement extends HTMLElement {
  width: number;
  height: number;
}

const { max } = Math;
const { devicePixelRatio: dpr } = window;

let shouldResize = true;

attend(window, 'resize', () => {
  shouldResize = true;
});

function nearest(multipleOf = 1, startingAt = 0) {
  return startingAt % multipleOf !== 0
    ? startingAt + (multipleOf - (startingAt % multipleOf))
    : startingAt;
}

function resize(container: HTMLElement, target: ResizeableElement, scale = 1) {
  const { clientHeight: h, clientWidth: w } = container;

  const width = nearest(scale, w);
  const height = nearest(scale, h);

  target.width = (width * dpr) / scale;
  target.height = (height * dpr) / scale;

  target.style.transform = `scale(${max(w / target.width, h / target.height)})`;

  shouldResize = false;
}

export const resizer = {
  get shouldResize() {
    return shouldResize;
  },
  resize,
};
