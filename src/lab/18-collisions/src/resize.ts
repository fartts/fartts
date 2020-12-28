interface ResizeableElement extends HTMLElement {
  width: number;
  height: number;
}

const { max } = Math;
const { devicePixelRatio: dpr } = window;

function nearest(multipleOf = 1, startingAt = 0) {
  return startingAt % multipleOf !== 0
    ? startingAt + (multipleOf - (startingAt % multipleOf))
    : startingAt;
}

export function resize(
  container: HTMLElement,
  target: ResizeableElement,
  scale = 1,
): void {
  const { clientHeight: h, clientWidth: w } = container;

  const width = nearest(scale, w);
  const height = nearest(scale, h);

  target.width = (width * dpr) / scale;
  target.height = (height * dpr) / scale;

  target.style.transform = `scale(${max(w / target.width, h / target.height)})`;
}
