import { prepare } from "empirical-cases";
import type { TestSuite } from "empirical-cases";

import { describe, test as vitest } from "vitest";

import globjoin from "./index";

const test = prepare(vitest);

const cases: TestSuite<Array<string | string[]>, string | string[]> = [
  {
    name: "should join single path and single glob",
    value: ["test", "fixture", "app", "*.js"],
    expected: "test/fixture/app/*.js",
  },
  {
    name: "should join single path and multiple globs",
    value: ["test/fixture/app/views", ["*.js", "*.coffee"]],
    expected: [
      "test/fixture/app/views/*.js",
      "test/fixture/app/views/*.coffee",
    ],
  },
  {
    name: "should join multiple paths and single glob",
    value: ["test/fixture/app", ["views", "services"], "*.js"],
    expected: ["test/fixture/app/views/*.js", "test/fixture/app/services/*.js"],
  },
  {
    name: "should join multiple paths and multiple glob",
    value: ["test/fixture/app", ["views", "services"], ["*.js", "*.coffee"]],
    expected: [
      "test/fixture/app/views/*.js",
      "test/fixture/app/views/*.coffee",
      "test/fixture/app/services/*.js",
      "test/fixture/app/services/*.coffee",
    ],
  },
  {
    name: "should handle negative globs and be negatible",
    value: [
      "test/fixture/app",
      ["views", "!services"],
      ["*.js", "!*.{coffee,ts}"],
    ],
    expected: [
      "test/fixture/app/views/*.js",
      "!test/fixture/app/views/*.{coffee,ts}",
      "!test/fixture/app/services/*.js",
      "test/fixture/app/services/*.{coffee,ts}",
    ],
  },
];

describe("globjoin()", () => {
  test(cases, (globs) => {
    return globjoin(...globs);
  });
});
