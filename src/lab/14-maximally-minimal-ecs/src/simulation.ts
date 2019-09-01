const { floor, PI: π } = Math;
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

const size = 10;
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
// create & delete (or destroy)
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
    return ['rotation', { currentRotation: 0, rotationSpeed: 0.05 }];
  };

  createEntities(rows * cols, [positionFactory, rotationFactory]);

  positions = components.get('position') as Positions;
  rotations = components.get('rotation') as Rotations;
}

export function update(/* ts: DOMHighResTimeStamp */) {
  rotations.forEach(({ currentRotation, rotationSpeed }, key, map) => {
    map.set(key, {
      currentRotation: (currentRotation + rotationSpeed) % ππ,
      rotationSpeed,
    });
  });
}

export function render(ctx: CanvasRenderingContext2D) {
  positions.forEach(({ x, y }, key) => {
    ctx.save();

    ctx.translate(x, y);
    ctx.rotate(
      (rotations.get(key) as {
        currentRotation: number;
        rotationSpeed: number;
      }).currentRotation,
    );

    ctx.beginPath();
    ctx.moveTo(-size / 4, 0);
    ctx.lineTo(size / 4, 0);
    ctx.closePath();
    ctx.stroke();

    ctx.restore();
  });
}

export function remove() {}
