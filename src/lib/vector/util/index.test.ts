import { vec2, vec3, vec4 } from '../factories';
import { toArray, validateKeys, validateRange, Validates } from '.';

describe('@fartts/lib/vector/util', () => {
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
    'expect($arguments.reduce(toArray, [])).toEqual($result)',
    ({ args, result }) => {
      expect(args.reduce(toArray, [])).toEqual(result);
    },
  );

  test.each`
    targetSize | receivedSize | validates                 | error
    ${2}       | ${2}         | ${Validates.Construction} | ${null}
    ${2}       | ${2}         | ${Validates.Assignment}   | ${null}
    ${2}       | ${3}         | ${Validates.Construction} | ${'too many'}
    ${2}       | ${3}         | ${Validates.Assignment}   | ${'too many'}
    ${2}       | ${1}         | ${Validates.Construction} | ${'not enough'}
    ${2}       | ${1}         | ${Validates.Assignment}   | ${'not enough'}
  `(
    'validateKeys($targetSize, $receivedSize, $validates)',
    ({ targetSize, receivedSize, validates, error }) => {
      if (error) {
        expect(() => validateKeys(targetSize, receivedSize, validates)).toThrow(
          error,
        );
      } else {
        expect(() =>
          validateKeys(targetSize, receivedSize, validates),
        ).not.toThrow();
      }
    },
  );

  test.each`
    index | upperBound | lowerBound   | error
    ${0}  | ${2}       | ${-1}        | ${null}
    ${0}  | ${2}       | ${undefined} | ${null}
    ${3}  | ${3}       | ${undefined} | ${'out of range'}
    ${0}  | ${3}       | ${0}         | ${'out of range'}
  `(
    'validateRange($index, $upperBound, $lowerBound)',
    ({ index, upperBound, lowerBound, error }) => {
      if (error) {
        expect(() => validateRange(index, upperBound, lowerBound)).toThrow(
          error,
        );
      } else {
        expect(() =>
          validateRange(index, upperBound, lowerBound),
        ).not.toThrow();
      }
    },
  );
});
