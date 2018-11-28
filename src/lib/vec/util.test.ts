import { vec2, vec3, vec4 } from '.';
import { toArray } from './util';

describe('@fartts/lib/vec/util', () => {
  test.each`
    args                               | result
    ${[1]}                             | ${[1]}
    ${[1, [2]]}                        | ${[1, 2]}
    ${[1, [2], vec2(3, 4)]}            | ${[1, 2, 3, 4]}
    ${[1, [2, 3], vec3(4, 5, 6)]}      | ${[1, 2, 3, 4, 5, 6]}
    ${[[7, [8]]]}                      | ${[7, [8]]}
    ${[1, [2, [3]], vec4(4, 5, 6, 7)]} | ${[1, 2, [3], 4, 5, 6, 7]}
  `(
    /* ^^ demonstrates that it doesn't work recursively, only 1 deep ^^ */
    'expect($args.reduce(toArray, [])).toEqual($result)',
    ({ args, result }) => {
      expect(args.reduce(toArray, [])).toEqual(result);
    },
  );
});
