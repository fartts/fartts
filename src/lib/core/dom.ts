export const {
  requestAnimationFrame: rAF,
  cancelAnimationFrame: cAF,
  devicePixelRatio: dpr,
} = window;

export function el(selectors: string): Element | null {
  return document.querySelector(selectors);
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
