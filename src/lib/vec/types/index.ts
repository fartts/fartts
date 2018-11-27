import {
  Components2Length1,
  Components2Length2,
  Components2Length3,
  Components2Length4,
} from './2';

import {
  Components3Length1,
  Components3Length2,
  Components3Length3,
  Components3Length4,
} from './3';

import {
  Components4Length1,
  Components4Length2,
  Components4Length3,
  Components4Length4,
} from './4';

type Components1Length1 = 'r' | 's' | 'x';
type Components1Length2 = 'rr' | 'ss' | 'xx';
type Components1Length3 = 'rrr' | 'sss' | 'xxx';
type Components1Length4 = 'rrrr' | 'ssss' | 'xxxx';

// prettier-ignore
type Swizzled1 =
  { [K in Components1Length1]: number } &
  { [K in Components1Length2]: Swizzled2 } &
  { [K in Components1Length3]: Swizzled3 } &
  { [K in Components1Length4]: Swizzled4 };

export type Swizzled2 = Swizzled1 &
  { [K in Components2Length1]: number } &
  { [K in Components2Length2]: Swizzled2 } &
  { [K in Components2Length3]: Swizzled3 } &
  { [K in Components2Length4]: Swizzled4 };

export type Swizzled3 = Swizzled2 &
  { [K in Components3Length1]: number } &
  { [K in Components3Length2]: Swizzled2 } &
  { [K in Components3Length3]: Swizzled3 } &
  { [K in Components3Length4]: Swizzled4 };

export type Swizzled4 = Swizzled3 &
  { [K in Components4Length1]: number } &
  { [K in Components4Length2]: Swizzled2 } &
  { [K in Components4Length3]: Swizzled3 } &
  { [K in Components4Length4]: Swizzled4 };
