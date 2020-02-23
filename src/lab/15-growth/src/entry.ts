import { el, rAF } from '../../../lib/core/dom';
import {
  random,
  randomRange,
  randomBool,
  randomInt,
} from '../../../lib/core/rand';

import { attend } from './events';
import { resize } from './resize';

import './style.css';

/**
 * the original:
 * ```js
 * function u(t) {
 *   eval(unescape(escape`𭱩𭁨𚁸𚑦𫱲𚁩🐷𞐬𩡯𫡴🐧𜠵𩑭𘠧𛁴🱔👲🐾𬠪𞀪𣑡𭁨𛡲𨑮𩁯𫐨𚐺𩡩𫁬𥁥𮁴𚀧𡱒𣱗𥁈𙰬𝠰𛀷𜀰𚐻𪐭𛐻𚑦𪑬𫁓𭁹𫁥👒𚁩𛁩𚠳𚐬𩱥𭁉𫑡𩱥𡁡𭁡𚁘👔𚀲𝀰𚐬𦐽𥀨𜠰𜀩𛀱𛀱𚐮𩁡𭁡𦰳𧐦𙡙🀷𝐰𛑴𚠷𙠦𩡩𫁬𤡥𨱴𚁘𚱔𚀲𚐭𜐴𛁙𚱔𚀲𚐭𜐹𛀹𛀹𚐻`.replace(/u../g,'')))
 * } // 140/140
 * ```
 *
 * escaped/prettified:
 * ```js
 * function u(t) {
 *   with (x)
 *     for (
 *       i = 79,
 *         font = '25em"',
 *         t ? (T = r => r * 8 * Math.random()) : fillText('GROWTH', 60, 700);
 *       i--;
 *
 *     )
 *       (fillStyle = R(i, i * 3)),
 *         getImageData((X = T(240)), (Y = T(200)), 1, 1).data[3] &&
 *           Y < 750 - t * 7 &&
 *           fillRect(X + T(2) - 14, Y + T(2) - 19, 9, 9);
 * } // 140/140
 * ```
 *
 * u(t) is called 60 times per second.
 * t: elapsed time in seconds.
 * c: A 1920x1080 canvas.
 * x: A 2D context for that canvas.
 * S: Math.sin
 * C: Math.cos
 * T: Math.tan
 * R: Generates rgba-strings, ex.: R(255, 255, 255, 0.5)
 *
 * @see https://www.dwitter.net/d/17559
 */

const main = el<HTMLElement>('main');
const canvas = el<HTMLCanvasElement>('canvas');
const context = canvas.getContext('2d');

if (!context) {
  throw new Error("Couldn't get a `CanvasRenderingContext2D`");
}

let shouldResize = true;

attend(window, 'resize', () => {
  shouldResize = true;
});

const scale = 8;
let ft: number;

const flowers = [
  `hsla(60, 90%, 60%, 1)`,
  `hsla(30, 90%, 50%, 1)`,
  `hsla(0, 80%, 60%, 1)`,
  `hsla(290, 80%, 50%, 1)`,
  `hsla(320, 80%, 50%, 1)`,
  `hsla(200, 80%, 70%, 1)`,
];

rAF(function tick(t: DOMHighResTimeStamp) {
  rAF(tick);

  ft || (ft = t); // tslint:disable-line:no-unused-expression

  if (shouldResize) {
    resize(main, canvas, scale);
    shouldResize = false;
    ft = t;
  }

  const nt = t - ft;
  const s = nt / 1_000;
  const { width: w, height: h } = canvas;

  if (s === 0) {
    const hw = w / 2;
    const hh = h / 2;

    context.clearRect(0, 0, w, h);

    context.font = '4em"'; // this double quote in here is magic
    context.fillStyle = '#fff';
    context.textAlign = 'center';
    context.textBaseline = 'middle';

    context.fillText('plantlife', hw, hh);
    return;
  }

  for (let i = 500; i > 0; --i) {
    const x = w * scale * random();
    const y = h * scale * random();
    const [r, g, b, a] = context.getImageData(x, y, 1, 1).data;

    if (a /* && y < 750 - s * 7 */) {
      context.fillStyle =
        r < 40 && g > 120 && b < 40 && randomBool()
          ? flowers[randomInt(flowers.length)]
          : `hsla(${100 + 40 * random()}, ${50 + 20 * random()}%, ${20 +
              30 * random()}%, 1)`;
      context.fillRect(x - 1 - randomRange(-2, 2), y - 6 * random(), 2, 2);
    }
  }
});
