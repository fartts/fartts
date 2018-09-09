export const { requestAnimationFrame: rAF, cancelAnimationFrame: cAF } = window;

export function el(selectors: string): Element | null {
  return document.querySelector(selectors);
}

export function on(type: string, listener: EventListener): void {
  return window.addEventListener(type, listener);
}
