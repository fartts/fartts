import { el, on } from './dom';

test('el', () => {
  const querySelectorSpy = jest.spyOn(document, 'querySelector');
  const body = el('body');

  expect(querySelectorSpy).toHaveBeenCalledTimes(1);
  expect(querySelectorSpy).toHaveBeenCalledWith('body');
  expect(body).toBeInstanceOf(HTMLBodyElement);
});

test('on', () => {
  const addEventlistenerSpy = jest.spyOn(window, 'addEventListener');
  const listener = jest.fn();

  on('resize', listener);
  window.dispatchEvent(new Event('resize'));

  expect(addEventlistenerSpy).toHaveBeenCalledTimes(1);
  expect(addEventlistenerSpy).toHaveBeenCalledWith('resize', listener);
  expect(listener).toHaveBeenCalledTimes(1);
});
