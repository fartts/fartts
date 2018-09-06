export const { requestAnimationFrame, cancelAnimationFrame } = window;

export function el(selectors: string): Element | null {
  return document.querySelector(selectors);
}

export function on(type: string, listener: EventListener): void {
  return window.addEventListener(type, listener);
}
