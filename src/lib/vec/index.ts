const { isArray } = Array;
const { assign } = Object;
const { construct /* , get, set */ } = Reflect;

function toKeysOfIndices(
  acc: { string?: number },
  key: string,
  i: number,
): { string?: number } {
  return {
    ...acc,
    [key]: i,
  };
}

function toSwizzled(
  keys: string[],
  _: string,
  i: number,
  root: string[],
): string[] {
  const toSwizzledDepth = (acc: string[], key: string): string[] =>
    acc.concat(root.map(k => `${key}${k}`));

  return i > 0 ? keys.reduce(toSwizzledDepth, root) : keys;
}

const keySets = [
  ['x', 'y', 'z', 'w'],
  ['s', 't', 'p', 'q'],
  ['r', 'g', 'b', 'a'],
];

export const swizzledKeys = new Set(
  keySets.reduce(
    (swizzledKeySets, keySet) =>
      swizzledKeySets.concat(keySet.reduceRight(toSwizzled, keySet)),
    [],
  ),
);

export const keyedIndices = keySets.reduce(
  (keyedIndexes, keySet) =>
    assign(keyedIndexes, keySet.reduce(toKeysOfIndices, {})),
  {},
);

export const config = {
  swizzledKeys,
  keyedIndices,
};

export const [Vec2, Vec3, Vec4]: Float32ArrayConstructor[] = new Array(4)
  .fill(0)
  .reduce((acc: Float32ArrayConstructor[], _: number, i: number) => {
    if (i === 0) {
      return acc;
    }

    const size = i + 1;

    return acc.concat(
      new Proxy(Float32Array, {
        construct(target, args) {
          if (args.length > 1 || args[0].length > size || !isArray(args[0])) {
            throw new Error(
              [
                `Incorrect arguments supplied to Vec${size} constructor.`,
                `Expected an array-like with ${size} or fewer elements.`,
              ].join(' '),
            );
          }

          return construct(target, args);
        },
      }),
    );
  }, []);

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
