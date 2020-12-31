import type { Listener } from './types';

export const el = <T extends keyof HTMLElementTagNameMap>(
  selector: T,
): HTMLElementTagNameMap[T] =>
  document.querySelector(selector) ?? document.createElement(selector);

export const on = <T extends EventTarget, U extends keyof DocumentEventMap>(
  target: T,
  forEvent: U,
  listener: Listener<U>,
  options: boolean | AddEventListenerOptions = false,
): void => target.addEventListener(forEvent, listener, options);
