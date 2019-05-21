import { Sim } from './lib.rs';
import { on } from '../../../lib/core/dom';
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

on<MouseEvent>('click', (/* event: MouseEvent */) => {
  main.isRunning ? main.stop() : main.start();
  // sim.update(performance.now(), 1000 / 16);
  // sim.render(1);
});

on<TouchEvent>('touchstart', (/* event: TouchEvent */) => {
  main.isRunning ? main.stop() : main.start();
  // sim.update(performance.now(), 1000 / 16);
  // sim.render(1);
});
