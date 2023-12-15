import { readFileSync } from "node:fs";

import { describe, expect, it } from "vitest";

import { FileSystem } from "../src/FileSystem.js";

describe("class FileSystem", () => {
  it("create hello sample", () => {
    const sample = new FileSystem();
    const node = sample.createNode("ROOT", "sample");

    node.createFile("hello", Buffer.from("Hello!"));
    node.createFile("world", Buffer.from("World!"));

    const build = sample.build();

    expect(build).toStrictEqual(
      readFileSync(`${__dirname}/fixtures/hello.rarc`),
    );
  });
});
