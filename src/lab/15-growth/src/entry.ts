import { el, rAF } from '../../../lib/core/dom';

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

const canvas = el<HTMLCanvasElement>('canvas');
const context = canvas?.getContext('2d');

if (!context) {
  throw new Error("Couldn't get a `CanvasRenderingContext2D`");
}

rAF(function tick(/* t: DOMHighResTimeStamp */) {
  rAF(tick);
  context.font = '25em';
});
