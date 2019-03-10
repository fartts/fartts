import { screen } from './screen';

import './style.css';

const s = screen();

window.addEventListener('resize', () => {
  console.log(s); // tslint:disable-line
});
