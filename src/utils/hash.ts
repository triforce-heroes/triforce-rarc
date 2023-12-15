export function hash(name: string): number {
  let result = 0;

  for (let i = 0; i < name.length; i++) {
    result *= 3;
    result += name.codePointAt(i)!;

    if (result > 0xff_ff) {
      result &= 0xff_ff;
    }
  }

  return result;
}
