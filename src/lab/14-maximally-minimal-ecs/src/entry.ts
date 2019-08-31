import { rAF, el } from '../../../lib/core/dom';

import resizer from './resizer';

import './style.css';

const { floor, random, round } = Math;

const m = el('main') as HTMLElement;
const c = el('canvas') as HTMLCanvasElement;
const ctx = c.getContext('2d') as CanvasRenderingContext2D;
const scale = 10;

const hsl = (h = round(random() * 360), s = 60, l = 40) =>
  `hsl(${h}, ${s}%, ${l}%)`;

/**
 * here is my ecs implementation
 *
 * @see: https://gist.github.com/mysterycommand/c78c5dc6446dda940d49b36ee6529c45
 * @see: https://kyren.github.io/2018/09/14/rustconf-talk.html#back-to-the-beginning
 */
interface Vec2 {
  x: number;
  y: number;
}

type ComponentFactory = () => [string, {}];
type Positions = Map<number, Vec2>;
type Velocities = Map<number, Vec2>;

const entities: number[] = [];
const components = new Map<string, Map<number, {}>>();

const size = 10;
let rows = floor(c.height / size);
let cols = floor(c.width / size);
let j = -1;

let positions: Positions;
let velocities: Velocities;

function createEntity() {
  const id = entities.length;
  entities[id] = id;
  return id;
}

function createEntities(count: number, componentFactories: ComponentFactory[]) {
  for (let i = 0; i < count; ++i) {
    const id = createEntity();

    componentFactories.forEach(factory => {
      const [name, data] = factory();
      components.has(name)
        ? (components.get(name) as Map<number, {}>).set(id, data)
        : components.set(name, new Map<number, {}>().set(id, data));
    });
  }
}

function positionFactory(): [string, {}] {
  ++j;
  const v = (c.height - rows * size) / 2;
  const h = (c.width - cols * size) / 2;

  return [
    'position',
    {
      x: h + (j % cols) * size + size / 2,
      y: v + floor(j / cols) * size + size / 2,
    },
  ];
}

rAF(function step(/* ts: DOMHighResTimeStamp */) {
  rAF(step);

  if (resizer.shouldResize) {
    resizer.resize(m, c, scale);

    ctx.fillStyle = hsl();
    ctx.fillRect(0, 0, c.width, c.height);

    // reset entites here
    rows = floor(c.height / size);
    cols = floor(c.width / size);
    j = -1;

    createEntities(rows * cols, [positionFactory]);
    positions = components.get('position') as Positions;
  }

  ctx.strokeStyle = `1px solid ${hsl(0, 0, 0)}`;
  positions.forEach(({ x, y }) => {
    ctx.beginPath();
    ctx.moveTo(x - size / 4, y);
    ctx.lineTo(x + size / 4, y);
    ctx.closePath();
    ctx.stroke();
  });
});
