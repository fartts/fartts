// // const { isArray } = Array;
// // const { isInteger } = Number;

// const vec = new Proxy(Float32Array, {
//   construct(target, args) {
//     // only accept integer or array (with length <= 4) constructor args
//     return Reflect.construct(target, args);
//   },

//   // get(target, key, receiver) {
//   //   return Reflect.get(target, key, receiver);
//   // },

//   // set(target, key, value, receiver) {
//   //   return Reflect.set(target, key, value, receiver);
//   // },
// });

// const { construct /* , get, set */ } = Reflect;

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

function toSwizzledKeySet(
  keys: string[],
  _: string,
  i: number,
  root: string[],
): string[] {
  const toSwizzledKeys = (acc: string[], key: string): string[] =>
    acc.concat(root.map(k => `${key}${k}`));

  return i > 0 ? keys.reduce(toSwizzledKeys, root) : keys;
}

// function isString(s: any): s is string {
//   return typeof s === 'string';
// }

type VectorFactory = () => Float32Array;
interface IVectorFactoryConfig {
  keyedIndices: { string: number };
  swizzledKeys: Set<string>;
}

const keySets: string[][] = [
  ['x', 'y', 'z', 'w'],
  ['s', 't', 'p', 'q'],
  ['r', 'g', 'b', 'a'],
];

const config = keySets.reduce(
  (acc: IVectorFactoryConfig, axes: string[]): IVectorFactoryConfig => {
    const keyedIndices = axes.reduce(toKeysOfIndices, {});
    const swizzledKeys = new Set(axes.reduceRight(toSwizzledKeySet, axes));

    return {
      keyedIndices: {
        ...acc.keyedIndices,
        ...keyedIndices,
      },
      swizzledKeys: new Set([...acc.swizzledKeys, ...swizzledKeys]),
    };
  },
  {} as IVectorFactoryConfig,
);

// export const [vec2, vec3, vec4]: VectorFactory[] = [, ,].fill(0).map(() => {
//   return () =>
//     new Proxy(Float32Array, {
//       construct(...args) {
//         return Reflect.construct(...args);
//       },
//     });
// });

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
