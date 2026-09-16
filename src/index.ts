import { join } from "node:path";

export default function globjoin(...globs: Array<string>): string;
export default function globjoin(...globs: Array<string | string[]>): string[];
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function globjoin(...globs: any[]): string | string[] {
  return globs.reduce((result, part) => {
    return _apply(result, (path: string) => {
      return _apply(part, (glob: string) => {
        return _join(path, glob);
      });
    });
  }, "");
}

function _join(path: string, glob: string): string {
  if (glob[0] === "!") {
    return join(
      path[0] === "!" ? path.substring(1) : `!${path}`,
      glob.substring(1),
    );
  }

  return join(path, glob);
}

function _apply<T, R>(values: T, fn: (value: T) => R): R;
function _apply<T, R>(values: T[], fn: (value: T) => R): R[];
function _apply<T, R>(values: T | T[], fn: (value: T) => R): R | R[] {
  if (Array.isArray(values)) {
    return values.reduce(
      (result, value) => result.concat(fn(value)),
      [] as R[],
    );
  }

  return fn(values);
}
