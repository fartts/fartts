import {
  Component2Length1,
  Component2Length2,
  Component2Length3,
  Component2Length4,
} from './2';

import {
  Component3Length1,
  Component3Length2,
  Component3Length3,
  Component3Length4,
} from './3';

import {
  Component4Length1,
  Component4Length2,
  Component4Length3,
  Component4Length4,
} from './4';

type Component1Length1 = 'r' | 's' | 'x';
type Component1Length2 = 'rr' | 'ss' | 'xx';
type Component1Length3 = 'rrr' | 'sss' | 'xxx';
type Component1Length4 = 'rrrr' | 'ssss' | 'xxxx';

// prettier-ignore
type Swizzled1 =
  { [K in Component1Length1]: number } &
  { [K in Component1Length2]: Swizzled2 } &
  { [K in Component1Length3]: Swizzled3 } &
  { [K in Component1Length4]: Swizzled4 };

export type Swizzled2 = Swizzled1 &
  { [K in Component2Length1]: number } &
  { [K in Component2Length2]: Swizzled2 } &
  { [K in Component2Length3]: Swizzled3 } &
  { [K in Component2Length4]: Swizzled4 };

export type Swizzled3 = Swizzled2 &
  { [K in Component3Length1]: number } &
  { [K in Component3Length2]: Swizzled2 } &
  { [K in Component3Length3]: Swizzled3 } &
  { [K in Component3Length4]: Swizzled4 };

export type Swizzled4 = Swizzled3 &
  { [K in Component4Length1]: number } &
  { [K in Component4Length2]: Swizzled2 } &
  { [K in Component4Length3]: Swizzled3 } &
  { [K in Component4Length4]: Swizzled4 };
