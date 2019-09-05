import { attend, ignore } from './events';
import { c } from './page';

let mouseX = c.width / 2;
let mouseY = c.height / 2;
let mouseDown = false;

function onMouseMove({ clientX, clientY }: MouseEvent) {
  mouseX = clientX;
  mouseY = clientY;
}

new MutationObserver(() => {
  mouseX = c.width / 2;
  mouseY = c.height / 2;
}).observe(c, { attributes: true, attributeFilter: ['width', 'height'] });

attend(c, 'mouseenter', ({ buttons }) => {
  attend(c, 'mousemove', onMouseMove);
  mouseDown = buttons !== 0;
});

attend(c, 'mouseleave', ({ buttons }) => {
  ignore(c, 'mousemove', onMouseMove);
  mouseX = c.width / 2;
  mouseY = c.height / 2;
  mouseDown = buttons !== 0;
});

attend(c, 'mousedown', ({ buttons }) => {
  mouseDown = buttons !== 0;
});

attend(c, 'mouseup', ({ buttons }) => {
  mouseDown = buttons !== 0;
});

export const input = {
  get mouseX() {
    return mouseX;
  },
  get mouseY() {
    return mouseY;
  },
  get mouseDown() {
    return mouseDown;
  },
};
