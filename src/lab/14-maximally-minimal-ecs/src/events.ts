type Listener<K extends keyof HTMLElementEventMap> = (
  event: HTMLElementEventMap[K],
) => void;

export function attend<
  T extends EventTarget,
  U extends keyof HTMLElementEventMap
>(
  target: T,
  forEvent: U,
  listener: Listener<U>,
  options: boolean | AddEventListenerOptions = false,
) {
  target.addEventListener(forEvent, listener as EventListener, options);
}

export function ignore<
  T extends EventTarget,
  U extends keyof HTMLElementEventMap
>(
  target: T,
  forEvent: U,
  listener: Listener<U>,
  options: boolean | AddEventListenerOptions = false,
) {
  target.removeEventListener(forEvent, listener as EventListener, options);
}
