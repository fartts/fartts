import { dot, magnitude, direction } from '@fartts/lib/vec/math';
import { Components } from '@fartts/lib/vec/types';
import { toArray } from '@fartts/lib/vec/util';

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
   * ## get dot
   *
   * @readonly
   * @type {number}
   * @memberof Vector
   */
  public get dot(): number {
    return dot(this, this);
  }

  /**
   * ## get magnitude
   *
   * @readonly
   * @type {number}
   * @memberof Vector
   */
  public get magnitude(): number {
    return magnitude(this);
  }

  /**
   * ## get direction
   *
   * @readonly
   * @type {number}
   * @memberof Vector
   */
  public get direction(): number {
    return direction(this);
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
