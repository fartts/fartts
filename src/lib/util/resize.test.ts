import resize from '@fartts/lib/util/resize';

test.each`
  w      | h      | cw     | ch     | dpr
  ${0}   | ${0}   | ${11}  | ${11}  | ${undefined}
  ${0}   | ${0}   | ${11}  | ${11}  | ${1}
  ${0}   | ${0}   | ${11}  | ${11}  | ${2}
  ${300} | ${150} | ${959} | ${539} | ${2}
`('resize', ({ w, h, cw, ch, dpr }) => {
  const mockCanvas = {
    width: w,
    height: h,
    style: { width: `${w}px`, height: `${h}px` },
  } as HTMLCanvasElement;

  const mockMain = { clientWidth: cw, clientHeight: ch } as HTMLMainElement;

  Object.defineProperty(window, 'devicePixelRatio', {
    writable: true,
    value: dpr,
  });

  window.dispatchEvent(new Event('resize'));

  expect(resize(mockCanvas, mockMain)).toBe(true);
  expect(resize(mockCanvas, mockMain)).toBe(false);

  window.dispatchEvent(new Event('resize'));

  expect(resize(mockCanvas, mockMain)).toBe(true);
  expect(resize(mockCanvas, mockMain)).toBe(false);

  expect(mockCanvas).toMatchSnapshot();
});
