import { Sim } from './lib.rs';
import { on, el } from '../../../lib/core/dom';
import loop from '../../../lib/game/loop';
import './style.css';

const sim = Sim.new();
const main = loop(
  (t, dt) => {
    sim.update(t, dt);
  },
  lag => {
    sim.render(lag);
  },
);

on<UIEvent>('resize', (event: UIEvent) => {
  main.stop();
  sim.resize();
});

let pointerDown = false;

function mousePointer(event: MouseEvent) {
  event.preventDefault();
  pointerDown = event.buttons !== 0;
}

function touchPointer(event: TouchEvent) {
  event.preventDefault();
  pointerDown = event.touches.length !== 0;
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
  // event.preventDefault();
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

  sim.draw(clientX, clientY);
}

on<MouseEvent>('mousedown', mousePointer);
on<MouseEvent>('mouseup', mousePointer);
on<MouseEvent>('mouseenter', mousePointer);
on<MouseEvent>('mouseleave', mousePointer);
on<MouseEvent>('mousemove', mousePointerMove);

on<TouchEvent>('touchstart', touchPointer);
on<TouchEvent>('touchend', touchPointer);
on<TouchEvent>('touchmove', touchPointerMove);

// (el('#play-pause') as HTMLInputElement).addEventListener(
//   'change',
//   (event: Event) => {
//     (event.target as HTMLInputElement).checked ? main.start() : main.stop();
//   },
// );

main.start();
