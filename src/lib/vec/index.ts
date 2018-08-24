import { swizzledKeys, indicesByKey } from './util/keys';

const { get, set } = Reflect;
const { slice } = [];

function toArray(acc: number[], arg: Component): number[] {
  return acc.concat(typeof arg === 'number' ? arg : slice.call(arg));
}

function getSwizzled(target: Vector, prop: string): Component {
  if (prop.length === 1) {
    return target[(indicesByKey.has(prop) && indicesByKey.get(prop)) as number];
  }

  const factory = vecs[prop.length - 2];
  const keys = prop.split('');

  return factory(
    keys.map(k => {
      const i = (indicesByKey.has(k) && indicesByKey.get(k)) as number;
      return target[i];
    }),
  );
}

function setSwizzled(target: Vector, prop: string, value: Component) {
  const keys = prop.split('');
  const values = [value].reduce(toArray, []);

  if (keys.length > values.length) {
    throw new Error('not enough data provided for construction');
  }

  if (keys.length < values.length) {
    throw new Error('too many arguments');
  }

  keys.forEach(k => {
    const i = (indicesByKey.has(k) && indicesByKey.get(k)) as number;
    target[i] = values[i];
  });

  return true;
}

const handler: ProxyHandler<Vector> = {
  get(target: Vector, prop: PropertyKey) {
    return typeof prop === 'string' && swizzledKeys.has(prop)
      ? getSwizzled(target, prop)
      : get(target, prop);
  },

  set(target: Vector, prop: PropertyKey, value: Component) {
    return typeof prop === 'string' && swizzledKeys.has(prop)
      ? setSwizzled(target, prop, value)
      : set(target, prop, value);
  },
};

function vec(size: number, args: Components): Vector {
  const components = args.reduce(toArray, []);

  if (components.length < size) {
    throw new Error('not enough data provided for construction');
  }

  if (components.length > size) {
    throw new Error('too many arguments');
  }

  return new Float32Array(components) as Vector;
}

const vecs = new Array(4)
  .fill(true)
  .reduce(
    (acc: Factory[], _, i: number) =>
      i === 0
        ? acc
        : acc.concat(
            (...args: Components) => new Proxy(vec(i + 1, args), handler),
          ),
    [],
  );

export const [vec2, vec3, vec4] = vecs;
