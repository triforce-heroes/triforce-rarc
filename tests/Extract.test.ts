import { readFileSync } from "node:fs";

import { BufferConsumer, ByteOrder } from "@triforce-heroes/triforce-core";
import { describe, expect, it } from "vitest";

import { DataNode } from "../src/parser/parseNodes.js";
import { parser } from "../src/parser/parser.js";

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
      parser.parse(
        new BufferConsumer(
          readFileSync(`${__dirname}/fixtures/${name}.rarc`),
          undefined,
          ByteOrder.BIG_ENDIAN,
        ),
      ),
    );
  });
});
