import { screen } from './screen';
import { update, draw } from './lib.rs';

import './style.css';
import { rAF } from '../../../lib/core/dom';
import { min } from '../../../lib/core/math';

const s = screen();

const stepTime = 1000 / 60;

let frameId = -1;

let firstTime = 0;
let previousTime = 0;

let overTime = 0;

let currentTime = 0;
let deltaTime = 0;

function frame(t: DOMHighResTimeStamp) {
  frameId = rAF(frame);

  currentTime = t - firstTime;
  deltaTime = currentTime - previousTime;

  previousTime = currentTime;
  overTime += deltaTime;

  overTime = min(overTime, 1000);

  while (overTime >= stepTime) {
    update(currentTime);
    overTime -= stepTime;
  }

  draw(s.context, s.canvasWidth, s.canvasHeight);
}

rAF((t: DOMHighResTimeStamp) => {
  if (frameId !== -1) {
    return;
  }

  frameId = rAF(frame);

  firstTime = t;
  previousTime = 0;
});
