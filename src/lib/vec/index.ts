import { dot, ρ, θ } from './math';
import { slice } from './util';

export default class Vector extends Float32Array {
  public get ρ(): number {
    return ρ(this);
  }

  public get θ(): number {
    const o = new Vector(this.toArray().fill(0));
    return θ(o, this);
  }

  public dot(): number {
    return dot(this, this);
  }

  public toArray(): number[] {
    return slice.call(this);
  }

  public toString(): string {
    return `vec${this.length}(${super.toString()})`;
  }
}
