import loop, { stepTime } from '@fartts/lib/game/loop';

let mockTime = 0;
jest.mock('@fartts/lib/dom', () => ({
  rAF: (callback: FrameRequestCallback) => {
    mockTime += 1000 / 60;
    setTimeout(() => callback(mockTime), 1000 / 60);
  },
  cAF: (frameId: number) => clearTimeout(frameId),
}));
jest.useFakeTimers();

test('loop', () => {
  const update = jest.fn();
  const render = jest.fn();
  const { start, stop } = loop(update, render);

  // multiple calls have no effect
  start();
  start();

  jest.advanceTimersByTime(stepTime * 3);

  // multiple calls have no effect
  stop();
  stop();

  expect(update).toHaveBeenCalledTimes(1);
  expect(update).toHaveBeenCalledWith(expect.any(Number), stepTime);

  expect(render).toHaveBeenCalledTimes(3);
  expect(render).toHaveBeenCalledWith(expect.any(Number));
});
