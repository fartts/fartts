const { get, set } = Reflect;
const { concat } = [];

const baseKeys = [
  ['x', 'y', 'z', 'w'],
  ['s', 't', 'p', 'q'],
  ['r', 'g', 'b', 'a'],
];

function toSwizzled(
  swizzled: string[],
  _: string,
  i: number,
  keys: string[],
): string[] {
  const toSwizzledDepth = (swizzledDepth: string[], key: string): string[] =>
    swizzledDepth.concat(keys.map(k => `${key}${k}`));

  return i > 0 ? swizzled.reduce(toSwizzledDepth, keys) : swizzled;
}

export const swizzledKeys = new Set(
  baseKeys.reduce(
    (acc: string[], keys: string[]) => [
      ...acc,
      ...keys.reduceRight(toSwizzled, keys),
    ],
    [],
  ),
);

function toIndicesByKey(
  acc: Array<[string, number]>,
  key: string,
  i: number,
): Array<[string, number]> {
  return [...acc, [key, i]];
}

export const indicesByKey = new Map(
  baseKeys.reduce(
    (acc: Array<[string, number]>, keys: string[]) => [
      ...acc,
      ...keys.reduce(toIndicesByKey, []),
    ],
    [],
  ),
);

type Components = number | number[] | Float32Array;
type Factory = (...args: Components[]) => Float32Array;

function getSwizzled(target: Float32Array, prop: string): Float32Array {
  const factory = vecs[prop.length - 2];
  const keys = prop.split('');
  return factory(
    keys.map(k => {
      const i = indicesByKey.has(k) && indicesByKey.get(k);

      if (i === undefined || typeof i !== 'number') {
        throw new Error();
      }

      return target[i];
    }),
  );
}

function vec(size: number, args: Components[]): Float32Array {
  const components = concat.apply([], args);

  if (components.length < size) {
    throw new Error('not enough data provided for construction');
  }

  if (components.length > size) {
    throw new Error('too many arguments');
  }

  return new Float32Array(components);
}

const handler: ProxyHandler<Float32Array> = {
  get(target: Float32Array, prop: PropertyKey) {
    return typeof prop === 'string' && swizzledKeys.has(prop)
      ? getSwizzled(target, prop)
      : get(target, prop);
  },

  set(target: Float32Array, prop: PropertyKey, value: Components) {
    return typeof prop === 'string' && swizzledKeys.has(prop)
      ? false
      : set(target, prop, value);
  },
};

const vecs = new Array(4)
  .fill(true)
  .reduce(
    (acc: Factory[], _, i: number) =>
      i === 0
        ? acc
        : acc.concat(
            (...args: Components[]) => new Proxy(vec(i + 1, args), handler),
          ),
    [],
  );

export const [vec2, vec3, vec4] = vecs;
