export const el = (s: string) => document.querySelector(s);
export const on = (e: string, fn: EventListener) =>
  window.addEventListener(e, fn);
