import { factories } from './factories';
import { dot, ρ, θ } from './math';
import { validateRange, toArray } from './util';

import { Components } from './index.d';

export default class Vector extends Array<number> implements Iterable<number> {
  constructor(...args: Components) {
    const components = args.reduce(toArray, []);
    validateRange(components.length, 5, 1);
    super(...components);
  }

  public get dot(): number {
    return dot(this, this);
  }

  public get ρ(): number {
    return ρ(this);
  }

  public get θ(): number {
    const args = [1, ...new Array(this.length - 1).fill(0)];
    const left = factories[this.length - 2](...args);
    return θ(left, this);
  }

  public toString(): string {
    return `vec${this.length}(${super.toString()})`;
  }
}
