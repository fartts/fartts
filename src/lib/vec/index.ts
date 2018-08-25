import { swizzledKeys, indicesByKey } from './util/keys';
import { toArray, validate, Validates } from './util';

const { get, set } = Reflect;

/**
 * ## getSwizzled
 *
 * @param {Vector} target
 * @param {string} prop
 * @returns {Component}
 */
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

      if (i >= target.length) {
        throw new Error('vector field selection out of range');
      }

      return target[i];
    }),
  );
}

/**
 * ## setSwizzled
 *
 * @param {Vector} target
 * @param {string} prop
 * @param {Component} value
 * @returns
 */
function setSwizzled(target: Vector, prop: string, value: Component) {
  const keys = prop.split('');
  const components = [value].reduce(toArray, []);

  /**
   * TODO: @mysterycommand - should I need this, if Float32Array.set is working
   * below as expected? maybe for 'not enough arguments' I guess?
   * @see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/set
   */
  const size = keys.length; // just for consistency with `createVector` below
  validate(size, components.length, Validates.Assignment);

  keys.forEach((k, i) => {
    const j = (indicesByKey.has(k) && indicesByKey.get(k)) as number;
    target[j] = components[i];
  });

  return true;
}

/**
 * ## createVector
 *
 * @param {number} size
 * @param {Components} args
 * @returns {Vector}
 */
function createVector(size: number, args: Components): Vector {
  const components = args.reduce(toArray, []);
  validate(size, components.length, Validates.Construction);
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
