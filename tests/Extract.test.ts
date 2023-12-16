import { readFileSync } from "node:fs";

import * as core from "@triforce-heroes/triforce-core";
import { describe, expect, it, vi } from "vitest";

import { extract } from "../src/Extract.js";
import { DataNode } from "../src/parser/parseNodes.js";

describe("extract", () => {
  const samples: Array<[string, DataNode[]]> = [
    [
      "hello",
      [
        {
          identifier: "ROOT",
          name: "sample",
          entries: [
            { name: "hello", data: Buffer.from("Hello!") },
            { name: "world", data: Buffer.from("World!") },
          ],
        },
      ],
    ],
    [
      "hello2",
      [
        {
          identifier: "ROOT",
          name: "sample",
          entries: [{ name: "HelloWorld", data: Buffer.from("Hello!") }],
        },
      ],
    ],
  ];

  it.each(samples)("extract(%s.rarc)", (name, structure) => {
    expect(structure).toStrictEqual(
      extract(readFileSync(`${__dirname}/fixtures/${name}.rarc`)),
    );
  });

  it("extract(invalid.rarc) must thrown Error", () => {
    expect.assertions(1);

    vi.spyOn(core, "fatal").mockImplementationOnce(() => {
      throw new Error("ERROR");
    });

    expect(() =>
      extract(readFileSync(`${__dirname}/fixtures/invalid.rarc`)),
    ).toThrow("ERROR");
  });
});
