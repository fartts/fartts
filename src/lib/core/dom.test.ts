import { el, on, off } from './dom';

describe('@fartts/lib/dom', () => {
  test('el', () => {
    const querySelectorSpy = jest.spyOn(document, 'querySelector');
    const body = el('body');

    expect(querySelectorSpy).toHaveBeenCalledTimes(1);
    expect(querySelectorSpy).toHaveBeenCalledWith('body');
    expect(body).toBeInstanceOf(HTMLBodyElement);

    expect(() => el('foo')).toThrow(`Couldn't get "foo" element`);
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

  test('on', () => {
    const removeEventlistenerSpy = jest.spyOn(window, 'removeEventListener');
    const listener = jest.fn();

    on('resize', listener);
    off('resize', listener);
    window.dispatchEvent(new Event('resize'));

    expect(removeEventlistenerSpy).toHaveBeenCalledTimes(1);
    expect(removeEventlistenerSpy).toHaveBeenCalledWith('resize', listener);
    expect(listener).toHaveBeenCalledTimes(0);
  });
});
