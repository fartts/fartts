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
    let left;

    switch (this.length) {
      case 2:
        left = vec2(1, 0);
        break;
      case 3:
        left = vec3(1, 0, 0);
        break;
      case 4:
        left = vec4(1, 0, 0, 0);
        break;
      default:
        throw new Error('');
    }

    return θ(left, this);
  }

  public toArray(): number[] {
    return slice.call(this);
  }

  public toString(): string {
    return `vec${this.length}(${this.toArray().toString()})`;
  }
}
