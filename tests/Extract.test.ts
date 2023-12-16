import { readFileSync } from "node:fs";

import { describe, expect, it } from "vitest";

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
  ];

  it.each(samples)("extract %s.rarc", (name, structure) => {
    expect(structure).toStrictEqual(
      extract(readFileSync(`${__dirname}/fixtures/${name}.rarc`)),
    );
  });
});
