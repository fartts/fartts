import loop, { stepTime } from '@fartts/lib/game/loop';

test('loop', done => {
  const update = jest.fn();
  const render = jest.fn();
  const { start, stop } = loop(update, render);

  // multiple calls have no effect
  start();
  start();

  setTimeout(() => {
    // multiple calls have no effect
    stop();
    stop();

    expect(update).toHaveBeenCalledTimes(1);
    expect(update).toHaveBeenCalledWith(expect.any(Number), stepTime);

    expect(render).toHaveBeenCalledTimes(2);
    expect(render).toHaveBeenCalledWith(expect.any(Number));

    done();
  }, stepTime * 3);
});
