import { input } from './input';

const { floor, PI: π, pow, random, sqrt } = Math;
const ππ = π * 2;

/**
 * here is my ecs implementation, it should solve some cases:
 *
 * 1. boids
 *    - a resource/shared component (center of mass?)
 *    - a position/velocity, updated by a system according to boid rules
 * 2. fireworks
 *    - active component
 *    - position/velocity
 *    - pooled/recycled when they go offscreen
 *
 * @see: https://gist.github.com/mysterycommand/c78c5dc6446dda940d49b36ee6529c45
 * @see: https://kyren.github.io/2018/09/14/rustconf-talk.html#back-to-the-beginning
 */
interface Vec2 {
  x: number;
  y: number;
}

type Factory = () => [string, {}];
type Positions = Map<number, Vec2>;
type Rotations = Map<
  number,
  {
    currentRotation: number;
    rotationSpeed: number;
  }
>;
// type Velocities = Map<number, Vec2>;

const entities: number[] = [];
const components = new Map<string, Map<number, {}>>();

const size = 50;
let positions: Positions;
let rotations: Rotations;
// let velocities: Velocities;

function createEntity() {
  const id = entities.length;
  entities[id] = id;
  return id;
}

function createEntities(count: number, factories: Factory[]) {
  for (let i = 0; i < count; ++i) {
    const id = createEntity();

    factories.forEach(factory => {
      const [name, data] = factory();

      const component = components.has(name)
        ? (components.get(name) as Map<number, {}>)
        : new Map<number, {}>();

      component.set(id, data);
      components.set(name, component);
    });
  }
}

// deploy & recall
// insert & remove
// attach & detach
// add & remove
// create & destroy
// produce & consume
// make & break (or kill)
// activate & deactivate
// enable & disable
export function create(width: number, height: number) {
  // reset entites here
  const rows = floor(height / size);
  const cols = floor(width / size);
  let j = -1;

  const positionFactory: Factory = () => {
    ++j;
    const v = (height - rows * size) / 2;
    const h = (width - cols * size) / 2;

    return [
      'position',
      {
        x: h + (j % cols) * size + size / 2,
        y: v + floor(j / cols) * size + size / 2,
      },
    ];
  };

  const rotationFactory: Factory = () => {
    return [
      'rotation',
      { currentRotation: 0, rotationSpeed: random() * 0.02 - 0.01 },
    ];
  };

  createEntities(rows * cols, [positionFactory, rotationFactory]);

  positions = components.get('position') as Positions;
  rotations = components.get('rotation') as Rotations;
}

function dist(x0: number, y0: number, x1: number, y1: number) {
  return sqrt(pow(x1 - x0, 2) + pow(y1 - y0, 2));
}

export function update(dt: DOMHighResTimeStamp) {
  rotations.forEach(({ currentRotation, rotationSpeed }, key, map) => {
    const pos = positions.get(key) as {
      x: number;
      y: number;
    };

    map.set(key, {
      currentRotation: (currentRotation + rotationSpeed * dt) % ππ,
      rotationSpeed:
        rotationSpeed *
        (input.mouseDown
          ? dist(pos.x, pos.y, input.mouseX, input.mouseY) < 100
            ? 1.1
            : 1.001
          : 0.999),
    });
  });
}

export function render(ctx: CanvasRenderingContext2D) {
  ctx.beginPath();

  positions.forEach(({ x, y }, key) => {
    ctx.save();

    ctx.translate(x, y);
    ctx.rotate(
      (rotations.get(key) as {
        currentRotation: number;
        rotationSpeed: number;
      }).currentRotation,
    );

    ctx.moveTo(-size / 4, 0);
    ctx.lineTo(size / 4, 0);

    ctx.restore();
  });

  ctx.stroke();
}

export function remove() {
  entities.splice(0);
  components.set('position', new Map());
  components.set('rotation', new Map());
}
