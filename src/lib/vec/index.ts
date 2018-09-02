import { dot, ρ, θ } from './math';

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
    return [...this];
  }

  public toString(): string {
    return `vec${this.length}(${super.toString()})`;
  }
}
