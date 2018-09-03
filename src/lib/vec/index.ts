import { dot, ρ, θ } from './math';
import { validateRange, toArray } from './util';

import { Components } from './index.d';

/**
 * # Vector
 *
 * @export
 * @class Vector
 * @extends {Array<number>}
 * @implements {Iterable<number>}
 */
export default class Vector extends Array<number> implements Iterable<number> {
  /**
   * ## constructor
   * Creates an instance of Vector.
   *
   * @param {...Components} args
   * @memberof Vector
   */
  constructor(...args: Components) {
    const components = args.reduce(toArray, []);
    validateRange(components.length, 5, 1);
    super(...components);
  }

  /**
   * ## dot
   *
   * @readonly
   * @type {number}
   * @memberof Vector
   */
  public get dot(): number {
    return dot(this, this);
  }

  /**
   * ## ρ
   *
   * @readonly
   * @type {number}
   * @memberof Vector
   */
  public get ρ(): number {
    return ρ(this);
  }

  /**
   * get θ
   *
   * @readonly
   * @type {number}
   * @memberof Vector
   */
  public get θ(): number {
    const args = new Array(this.length).fill(1).fill(0, 1);
    const left = new Vector(...args);
    return θ(left, this);
  }

  /**
   * ## toString
   *
   * @returns {string}
   * @memberof Vector
   */
  public toString(): string {
    return `vec${this.length}(${super.toString()})`;
  }
}
