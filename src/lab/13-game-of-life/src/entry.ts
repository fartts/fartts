import { Sim } from './lib.rs';
import { el } from '../../../lib/core/dom';
import loop from '../../../lib/game/loop';
import './style.css';

const sim = Sim.new();
const main = loop(
  (t, dt) => {
    sim.update(t, dt);
  },
  (lag) => {
    sim.render(lag);
  },
);

let pointerDown = false;

function mousePointer(event: MouseEvent) {
  event.preventDefault();
  pointerDown = event.buttons !== 0;
  pointerDown ? main.stop() : main.start();
  mousePointerMove(event);
}

function touchPointer(event: TouchEvent) {
  event.preventDefault();
  pointerDown = event.touches.length !== 0;
  pointerDown ? main.stop() : main.start();
  touchPointerMove(event);
}

function mousePointerMove(event: MouseEvent) {
  event.preventDefault();
  if (!pointerDown) {
    return;
  }

  const { clientX, clientY } = event;
  sim.draw(clientX, clientY);
}

function touchPointerMove(event: TouchEvent) {
  event.preventDefault();
  if (!pointerDown) {
    return;
  }

  const touches = Array.from(event.touches);

  // handle multiple touches by averaging them, will sort of draw "in the
  // middle" of all the touches
  const { clientX, clientY } = touches.reduce(
    (acc, touch) => ({
      clientX: acc.clientX + touch.clientX,
      clientY: acc.clientY + touch.clientY,
    }),
    {
      clientX: 0,
      clientY: 0,
    },
  );

  sim.draw(clientX / touches.length, clientY / touches.length);
}

function on<
  T extends EventTarget,
  U extends keyof DocumentEventMap,
  V = (this: T, event: DocumentEventMap[U]) => any
>(target: T, forEvent: U, listener: V) {
  target.addEventListener(forEvent, (listener as unknown) as EventListener);
}

const canvas = el('canvas') as HTMLCanvasElement;

on(canvas, 'mousedown', mousePointer);
on(canvas, 'mouseup', mousePointer);
on(canvas, 'mouseenter', mousePointer);
on(canvas, 'mouseleave', mousePointer);
on(canvas, 'mousemove', mousePointerMove);
on(canvas, 'touchstart', touchPointer);
on(canvas, 'touchend', touchPointer);
on(canvas, 'touchmove', touchPointerMove);

on(window, 'resize', () => {
  main.stop();
  sim.resize();
});

main.start();
