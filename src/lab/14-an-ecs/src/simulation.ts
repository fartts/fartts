import { input } from './input';

const { floor, min, PI: π, pow, random, round, sqrt } = Math;
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
    currentRotationSpeed: number;
    initialRotationSpeed: number;
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

    factories.forEach((factory) => {
      const [name, data] = factory();

      const component = components.has(name)
        ? (components.get(name) as Map<number, {}>)
        : new Map<number, {}>();

      component.set(id, data);
      components.set(name, component);
    });
  }
}

const maxRotationSpeed = 0.01;

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
    const r = round(random()) === 0 ? -maxRotationSpeed : maxRotationSpeed;

    return [
      'rotation',
      {
        currentRotation: 0,
        currentRotationSpeed: r,
        initialRotationSpeed: r,
      },
    ];
  };

  createEntities(rows * cols, [positionFactory, rotationFactory]);

  positions = components.get('position') as Positions;
  rotations = components.get('rotation') as Rotations;
}

export function update(dt: DOMHighResTimeStamp) {
  rotations.forEach(
    (
      { currentRotation, currentRotationSpeed, initialRotationSpeed },
      key,
      map,
    ) => {
      const { x: x0, y: y0 } = positions.get(key) as {
        x: number;
        y: number;
      };
      const { mouseDown, mouseX: x1, mouseY: y1 } = input;

      const dist = sqrt(pow(x1 - x0, 2) + pow(y1 - y0, 2));
      const r = mouseDown ? 300 : 100;
      const d = 1 - min(dist, r) / (r * 2);
      const speed = initialRotationSpeed * d;

      map.set(key, {
        currentRotation: (currentRotation + currentRotationSpeed * dt) % ππ,
        currentRotationSpeed: d > 0.5 ? speed : currentRotationSpeed * 0.99,
        initialRotationSpeed,
      });
    },
  );
}

export function render(ctx: CanvasRenderingContext2D) {
  ctx.beginPath();

  positions.forEach(({ x, y }, key) => {
    ctx.save();

    ctx.translate(x, y);
    ctx.rotate(
      (rotations.get(key) as {
        currentRotation: number;
        currentRotationSpeed: number;
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
