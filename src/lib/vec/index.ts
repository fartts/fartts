// const { isArray } = Array;
const { get, set } = Reflect;
const { concat, slice } = [];

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

function flatten(args: Array<Component | Components>): ArrayLike<number> {
  return concat.apply(
    [],
    args.map(arg => (typeof arg === 'number' ? arg : slice.call(arg))),
  );
}

function getSwizzled(target: IVector, prop: string): Component | Components {
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

function setSwizzled(
  target: IVector,
  prop: string,
  value: Component | Components,
) {
  const keys = prop.split('');
  const values = flatten([value]);

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

const handler: ProxyHandler<IVector> = {
  get(target: IVector, prop: PropertyKey) {
    return typeof prop === 'string' && swizzledKeys.has(prop)
      ? getSwizzled(target, prop)
      : get(target, prop);
  },

  set(target: IVector, prop: PropertyKey, value: Component | Components) {
    return typeof prop === 'string' && swizzledKeys.has(prop)
      ? setSwizzled(target, prop, value)
      : set(target, prop, value);
  },
};

function vec(size: number, args: Array<Component | Components>): IVector {
  const components = flatten(args);

  if (components.length < size) {
    throw new Error('not enough data provided for construction');
  }

  if (components.length > size) {
    throw new Error('too many arguments');
  }

  return new Float32Array(components) as IVector;
}

const vecs = new Array(4)
  .fill(true)
  .reduce(
    (acc: Factory[], _, i: number) =>
      i === 0
        ? acc
        : acc.concat(
            (...args: Array<Component | Components>) =>
              new Proxy(vec(i + 1, args), handler),
          ),
    [],
  );

export const [vec2, vec3, vec4] = vecs;
