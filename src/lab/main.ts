import './main.css';
import { vec2, vec3, vec4 } from '../lib/vec';

console.log(vec2(0)); // tslint:disable-line no-console
console.log(vec3(11, 1, 1).slice()); // tslint:disable-line no-console
console.log(vec4(2, 2, vec2(2, 2)).map(val => val * 2)); // tslint:disable-line no-console
console.log(vec3().xy); // tslint:disable-line no-console
