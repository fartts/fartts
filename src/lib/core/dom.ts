export const {
  requestAnimationFrame: rAF,
  cancelAnimationFrame: cAF,
  devicePixelRatio: dpr,
} = window;

export function el<T extends Element>(selectors: string): T {
  const element = document.querySelector<T>(selectors);

  if (!element) {
    throw new Error(`Couldn't get "${selectors}" element`);
  }

  return element;
}

type Listener<T extends Event> = (event: T) => void;

export function on<T extends Event>(type: string, listener: Listener<T>): void {
  return window.addEventListener(type, listener as EventListener);
}

export function off<T extends Event>(
  type: string,
  listener: Listener<T>,
): void {
  return window.removeEventListener(type, listener as EventListener);
}
