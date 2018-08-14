import { cos, sin } from './math';
import {
  wave,
  cosWave,
  sinWave,
  sawWave,
  triWave,
  step,
  cosStep,
  sinStep,
  sawStep,
  triStep,
} from './wave';

// just to keep the tables below consice when testing defaults
const u = undefined;

describe('wave functions', () => {
  test.each`
    fn     | p       | min  | max  | o      | t       | expected
    ${sin} | ${u}    | ${u} | ${u} | ${u}   | ${0}    | ${0}
    ${cos} | ${2000} | ${1} | ${4} | ${500} | ${1000} | ${2.5}
  `(
    'wave over period: $p, between: $min & $max, with offset: $o, at time $t',
    ({ fn, p, min, max, o, t, expected }) => {
      const waveFn = wave(fn, p, min, max, o);
      expect(waveFn(t)).toBeCloseTo(expected);
    },
  );

  test.each`
    p       | min  | max  | o      | t       | expected
    ${u}    | ${u} | ${u} | ${u}   | ${0}    | ${1}
    ${2000} | ${1} | ${4} | ${500} | ${1000} | ${2.5}
  `(
    'cosWave over period: $p, between: $min & $max, with offset: $o, at time $t',
    ({ p, min, max, o, t, expected }) => {
      const cosWaveFn = cosWave(p, min, max, o);
      expect(cosWaveFn(t)).toBeCloseTo(expected);
    },
  );

  test.each`
    p       | min  | max  | o      | t       | expected
    ${u}    | ${u} | ${u} | ${u}   | ${0}    | ${-1}
    ${2000} | ${1} | ${4} | ${500} | ${1000} | ${3.25}
  `(
    'sawWave over period: $p, between: $min & $max, with offset: $o, at time $t',
    ({ p, min, max, o, t, expected }) => {
      const sawWaveFn = sawWave(p, min, max, o);
      expect(sawWaveFn(t)).toBeCloseTo(expected);
    },
  );

  test.each`
    p       | min  | max  | o      | t       | expected
    ${u}    | ${u} | ${u} | ${u}   | ${0}    | ${0}
    ${2000} | ${1} | ${4} | ${500} | ${1000} | ${1}
  `(
    'sinWave over period: $p, between: $min & $max, with offset: $o, at time $t',
    ({ p, min, max, o, t, expected }) => {
      const sinWaveFn = sinWave(p, min, max, o);
      expect(sinWaveFn(t)).toBeCloseTo(expected);
    },
  );

  test.each`
    p       | min  | max  | o      | t       | expected
    ${u}    | ${u} | ${u} | ${u}   | ${0}    | ${-1}
    ${2000} | ${1} | ${4} | ${500} | ${1000} | ${2.5}
  `(
    'triWave over period: $p, between: $min & $max, with offset: $o, at time $t',
    ({ p, min, max, o, t, expected }) => {
      const triWaveFn = triWave(p, min, max, o);
      expect(triWaveFn(t)).toBeCloseTo(expected);
    },
  );
});

describe('step functions', () => {
  test.each`
    fn     | p       | min  | max  | o      | t       | expected
    ${cos} | ${u}    | ${u} | ${u} | ${u}   | ${0}    | ${1}
    ${sin} | ${2000} | ${1} | ${4} | ${500} | ${1000} | ${1}
  `(
    'step over period: $p, between: $min & $max, with offset: $o, at time $t',
    ({ fn, p, min, max, o, t, expected }) => {
      const stepFn = step(fn, p, min, max, o);
      expect(stepFn(t)).toBeCloseTo(expected);
    },
  );

  test.each`
    p       | min  | max  | o      | t       | expected
    ${u}    | ${u} | ${u} | ${u}   | ${0}    | ${1}
    ${2000} | ${1} | ${4} | ${500} | ${1000} | ${2}
  `(
    'cosStep over period: $p, between: $min & $max, with offset: $o, at time $t',
    ({ p, min, max, o, t, expected }) => {
      const cosStepFn = cosStep(p, min, max, o);
      expect(cosStepFn(t)).toBeCloseTo(expected);
    },
  );

  test.each`
    p       | min  | max  | o      | t       | expected
    ${u}    | ${u} | ${u} | ${u}   | ${0}    | ${-1}
    ${2000} | ${1} | ${4} | ${500} | ${1000} | ${3}
  `(
    'sawStep over period: $p, between: $min & $max, with offset: $o, at time $t',
    ({ p, min, max, o, t, expected }) => {
      const sawStepFn = sawStep(p, min, max, o);
      expect(sawStepFn(t)).toBeCloseTo(expected);
    },
  );

  test.each`
    p       | min  | max  | o      | t       | expected
    ${u}    | ${u} | ${u} | ${u}   | ${0}    | ${0}
    ${2000} | ${1} | ${4} | ${500} | ${1000} | ${1}
  `(
    'sinStep over period: $p, between: $min & $max, with offset: $o, at time $t',
    ({ p, min, max, o, t, expected }) => {
      const sinStepFn = sinStep(p, min, max, o);
      expect(sinStepFn(t)).toBeCloseTo(expected);
    },
  );

  test.each`
    p       | min  | max  | o      | t       | expected
    ${u}    | ${u} | ${u} | ${u}   | ${0}    | ${-1}
    ${2000} | ${1} | ${4} | ${500} | ${1000} | ${2}
  `(
    'triStep over period: $p, between: $min & $max, with offset: $o, at time $t',
    ({ p, min, max, o, t, expected }) => {
      const triStepFn = triStep(p, min, max, o);
      expect(triStepFn(t)).toBeCloseTo(expected);
    },
  );
});
