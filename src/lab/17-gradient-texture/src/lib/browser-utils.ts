export const {
  requestAnimationFrame: raf,
  cancelAnimationFrame: caf,
  devicePixelRatio: dpr,
} = window;

export const el = <T extends Element>(selectors: string): T => {
  const element = document.querySelector<T>(selectors);
  if (element !== null) return element;

  throw new Error(`Couldn't get "${selectors}" element`);
};

interface Listener<K extends keyof HTMLElementEventMap> extends EventListener {
  (event: HTMLElementEventMap[K]): void;
}

type Toggler = <
  T extends EventTarget,
  U extends keyof HTMLElementEventMap | keyof DocumentEventMap,
  V extends EventListenerOptions
>(
  target: T,
  forEvent: U,
  listener: Listener<U>,
  options?: boolean | V,
) => void;

export const on: Toggler = (target, forEvent, listener, options = false) =>
  target.addEventListener(forEvent, listener, options);

export const off: Toggler = (target, forEvent, listener, options = false) =>
  target.removeEventListener(forEvent, listener, options);
