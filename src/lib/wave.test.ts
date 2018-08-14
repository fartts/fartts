import { cos, sin } from './math';
import { step, wave } from './wave';

// just to keep the table below consice when testing defaults
const u = undefined;

test.each`
  fn     | p       | min   | max  | o      | t       | expected
  ${sin} | ${u}    | ${u}  | ${u} | ${u}   | ${0}    | ${0}
  ${sin} | ${1000} | ${-1} | ${1} | ${0}   | ${250}  | ${1}
  ${sin} | ${1000} | ${-1} | ${1} | ${0}   | ${750}  | ${-1}
  ${sin} | ${2000} | ${0}  | ${3} | ${500} | ${1000} | ${0}
  ${cos} | ${u}    | ${u}  | ${u} | ${u}   | ${0}    | ${1}
  ${cos} | ${1000} | ${-1} | ${1} | ${0}   | ${250}  | ${0}
  ${cos} | ${1000} | ${-1} | ${1} | ${0}   | ${750}  | ${0}
  ${cos} | ${2000} | ${0}  | ${3} | ${500} | ${1000} | ${1.5}
`(
  'wave over period: $p, between: $min & $max, with offset: $o, at time $t',
  ({ fn, p, min, max, o, t, expected }) => {
    const waveFn = wave(fn, p, min, max, o);
    expect(waveFn(t)).toBeCloseTo(expected);
  },
);

test.each`
  fn     | p       | min   | max  | o      | t       | expected
  ${sin} | ${u}    | ${u}  | ${u} | ${u}   | ${0}    | ${0}
  ${sin} | ${1000} | ${-1} | ${1} | ${0}   | ${250}  | ${1}
  ${sin} | ${1000} | ${-1} | ${1} | ${0}   | ${750}  | ${-1}
  ${sin} | ${2000} | ${0}  | ${3} | ${500} | ${1000} | ${0}
  ${cos} | ${u}    | ${u}  | ${u} | ${u}   | ${0}    | ${1}
  ${cos} | ${1000} | ${-1} | ${1} | ${0}   | ${250}  | ${0}
  ${cos} | ${1000} | ${-1} | ${1} | ${0}   | ${750}  | ${-1}
  ${cos} | ${2000} | ${0}  | ${3} | ${500} | ${1000} | ${1}
`(
  'step over period: $p, between: $min & $max, with offset: $o, at time $t',
  ({ fn, p, min, max, o, t, expected }) => {
    const stepFn = step(fn, p, min, max, o);
    expect(stepFn(t)).toBeCloseTo(expected);
  },
);
