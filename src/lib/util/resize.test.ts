import resize from './resize';

describe('@fartts/lib/util/resize', () => {
  test.each`
    w      | h      | cw     | ch     | dpr
    ${300} | ${150} | ${391} | ${291} | ${undefined}
    ${300} | ${150} | ${715} | ${475} | ${1}
    ${300} | ${150} | ${800} | ${450} | ${2}
    ${300} | ${150} | ${959} | ${539} | ${3}
  `('resize [$w, $h] to [$cw, $ch] at dpr: $dpr', ({ w, h, cw, ch, dpr }) => {
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
});
