import { vec2, vec3, vec4 } from './factories';
import { dot, ρ, θ } from './math';
import { slice } from './util';

export default class Vector extends Float32Array implements Iterable<number> {
  public get dot(): number {
    return dot(this, this);
  }

  public get ρ(): number {
    return ρ(this);
  }

  public get θ(): number {
    const args = [1, ...new Array(this.length - 1).fill(0)];
    const left = [vec2, vec3, vec4][this.length - 2](...args);
    return θ(left, this);
  }

  public toArray(): number[] {
    return slice.call(this);
  }

  public toString(): string {
    return `vec${this.length}(${this.toArray().toString()})`;
  }
}
