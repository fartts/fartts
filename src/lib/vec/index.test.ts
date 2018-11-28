import { vec2, vec3, vec4 } from '.';
import Vec2 from './2';
import Vec3 from './3';
import Vec4 from './4';

describe('@fartts/lib/vec', () => {
  describe('vec2', () => {
    test.each`
      args                          | result       | error
      ${[]}                         | ${[0, 0]}    | ${undefined}
      ${[1]}                        | ${[1, 1]}    | ${undefined}
      ${[1, 2]}                     | ${[1, 2]}    | ${undefined}
      ${[[1, 2]]}                   | ${[1, 2]}    | ${undefined}
      ${[new Float32Array([1, 2])]} | ${[1, 2]}    | ${undefined}
      ${[1, 2, 3]}                  | ${undefined} | ${'Too many'}
    `(
      'vec2($args) === new Vec2($result) // or throws $error',
      ({ args, result, error }) => {
        if (error === undefined) {
          expect(vec2(...args)).toEqual(new Vec2(result));
        } else {
          expect(() => {
            vec2(...args);
          }).toThrow(error);
        }
      },
    );
  });

  describe('vec3', () => {
    test.each`
      args                             | result       | error
      ${[]}                            | ${[0, 0, 0]} | ${undefined}
      ${[1]}                           | ${[1, 1, 1]} | ${undefined}
      ${[[1, 2], 3]}                   | ${[1, 2, 3]} | ${undefined}
      ${[0, new Float32Array([1, 2])]} | ${[0, 1, 2]} | ${undefined}
      ${[1, 2]}                        | ${undefined} | ${'Not enough'}
      ${[1, 2, 3, 4]}                  | ${undefined} | ${'Too many'}
    `(
      'vec3($args) === new Vec3($result) // or throws $error',
      ({ args, result, error }) => {
        if (error === undefined) {
          expect(vec3(...args)).toEqual(new Vec3(result));
        } else {
          expect(() => {
            vec3(...args);
          }).toThrow(error);
        }
      },
    );
  });

  describe('vec4', () => {
    test.each`
      args                                | result          | error
      ${[]}                               | ${[0, 0, 0, 0]} | ${undefined}
      ${[1]}                              | ${[1, 1, 1, 1]} | ${undefined}
      ${[[1, 2], 3, 4]}                   | ${[1, 2, 3, 4]} | ${undefined}
      ${[0, new Float32Array([1, 2]), 3]} | ${[0, 1, 2, 3]} | ${undefined}
      ${[1, 2, 3]}                        | ${undefined}    | ${'Not enough'}
      ${[1, 2, 3, 4, 5]}                  | ${undefined}    | ${'Too many'}
    `(
      'vec4($args) === new Vec4($result) // or throws $error',
      ({ args, result, error }) => {
        if (error === undefined) {
          expect(vec4(...args)).toEqual(new Vec4(result));
        } else {
          expect(() => {
            vec4(...args);
          }).toThrow(error);
        }
      },
    );
  });
});
