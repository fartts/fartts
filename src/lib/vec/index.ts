import { swizzledKeys, indicesByKey } from './util/keys';
import { toArray } from './util';

const { get, set } = Reflect;

function getSwizzled(target: Vector, prop: string): Component {
  if (prop.length === 1) {
    const i = (indicesByKey.has(prop) && indicesByKey.get(prop)) as number;
    return target[i];
  }

  const factory = factories[prop.length - 2];
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
    throw new Error('not enough data provided for assignment');
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

function createVector(size: number, args: Components): Vector {
  const components = args.reduce(toArray, []);

  if (components.length < size) {
    throw new Error('not enough data provided for construction');
  }

  if (components.length > size) {
    throw new Error('too many arguments');
  }

  return new Float32Array(components) as Vector;
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

const factories = new Array(4)
  .fill(true)
  .reduce(
    (acc: Factory[], _, i: number) =>
      i === 0
        ? acc
        : acc.concat(
            (...args: Components) =>
              new Proxy(createVector(i + 1, args), handler),
          ),
    [],
  );

export const [vec2, vec3, vec4] = factories;
