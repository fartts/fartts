const { isInteger } = Number;

export function next(a: number, b: number): number {
  while (!isInteger(a / b)) {
    a += 1;
  }

  return a;
}
