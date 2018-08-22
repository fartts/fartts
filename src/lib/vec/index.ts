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

function vec(size: number, args: Array<number | number[]>): Float32Array {
  const components = concat.apply([], args);

  if (components.length < size) {
    throw new Error('not enough data provided for construction');
  }

  if (components.length > size) {
    throw new Error('too many arguments');
  }

  return new Float32Array(components);
}

const handler = {
  get(target: Float32Array, prop: PropertyKey) {
    return get(target, prop);
  },

  set(target: Float32Array, prop: PropertyKey, value: number | number[]) {
    return set(target, prop, value);
  },
};

export const [vec2, vec3, vec4] = new Array(4)
  .fill(true)
  .reduce(
    (vecs, _: boolean, i: number) =>
      i === 0
        ? vecs
        : vecs.concat(
            (...args: Array<number | number[]>) =>
              new Proxy(vec(i + 1, args), handler),
          ),
    [],
  );

/**
 * TODO: @mysterycommand - don't worry about "fill forward" GLSL throws: "not
 * enough data provided for construction"
 * @see: https://github.com/Popmotion/vekta#fill-forward
 */

// export const [Vec2, Vec3, Vec4]: Float32ArrayConstructor[] = new Array(4)
//   .fill(0)
//   .reduce((acc: Float32ArrayConstructor[], _: number, i: number) => {
//     if (i === 0) {
//       return acc;
//     }

//     const size = i + 1;

//     return acc.concat(
//       new Proxy(Float32Array, {
//         construct(target, args) {
//           if (args.length > 1 || args[0].length > size || !isArray(args[0])) {
//             throw new Error(
//               [
//                 `Incorrect arguments supplied to Vec${size} constructor.`,
//                 `Expected an array-like with ${size} or fewer elements.`,
//               ].join(' '),
//             );
//           }

//           return construct(target, args);
//         },
//       }),
//     );
//   }, []);

// const getSwizzled = (target: any[], key: string): any =>
//   key.split('').map((k: string) => target[axisToIndexMap[k]]);

// const setSwizzled = (target: any[], key: string, val: any): boolean => true;

// const handler: ProxyHandler = {
//   get(target: any[], key: PropertyKey, receiver?: any): any {
//     return isString(key) && swizzledKeys.has(key)
//       ? getSwizzled(target, key)
//       : get(target, key, receiver);
//   },

//   set(target: any[], key: PropertyKey, val: any, receiver?: any): boolean {
//     return isString(key) && swizzledKeys.has(key)
//       ? setSwizzled(target, key, val)
//       : set(target, key, val, receiver);
//   },
// };

// return acc.concat(
//   () =>
//     new Proxy(Float32Array, {
//       construct(...args): void {
//         return construct(...args);
//       },
//     }),
// );
