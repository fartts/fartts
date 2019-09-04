import { attend } from './events';
import { c } from './page';

let mouseX = c.width / 2;
let mouseY = c.height / 2;

attend(c, 'mousemove', ({ clientX, clientY }) => {
  mouseX = clientX;
  mouseY = clientY;
});

export const input = {
  get mouseX() {
    return mouseY;
  },
  get mouseY() {
    return mouseX;
  },
};
