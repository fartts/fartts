import { toArray } from './';

describe('@fartts/lib/vec/util', () => {
  test.each`
    args                                        | result
    ${[1]}                                      | ${[1]}
    ${[1, [2]]}                                 | ${[1, 2]}
    ${[1, [2], new Float32Array([3])]}          | ${[1, 2, 3]}
    ${[1, [2, 3], new Float32Array([4, 5, 6])]} | ${[1, 2, 3, 4, 5, 6]}
    ${[1, [2, [3]], new Float32Array([4, 5, 6])]} | ${[1, 2, [3], 4, 5, 6] /*
      ^^^ demonstrates that it doesn't work recursively, only 1 deep ^^^
    */}
  `(
    'expect($arguments.reduce(toArray, [])).toEqual($result)',
    ({ args, result }) => {
      expect(args.reduce(toArray, [])).toEqual(result);
    },
  );
});
