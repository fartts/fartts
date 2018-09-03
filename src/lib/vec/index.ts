import { dot, ρ, θ } from './math';
import { toArray } from './util';

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
  public static readonly origin: [Vector, Vector, Vector] = [
    new Vector(0, 0),
    new Vector(0, 0, 0),
    new Vector(0, 0, 0, 0),
  ];

  public static readonly left: [Vector, Vector, Vector] = [
    new Vector(1, 0),
    new Vector(1, 0, 0),
    new Vector(1, 0, 0, 0),
  ];

  /**
   * ## constructor
   *
   * @param {...Components} args
   * @memberof Vector
   */
  constructor(...args: Components) {
    const components = args.reduce(toArray, []);
    if (components.length === 1 && typeof components[0] === 'number') {
      super(components[0]);
    } else {
      super(...components);
    }
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
    return θ(Vector.left[this.length - 2], this);
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
