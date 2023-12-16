import { readFileSync } from "node:fs";

import { describe, expect, it } from "vitest";

import { FileSystem } from "../src/FileSystem.js";

describe("class FileSystem", () => {
  it("method createFile() #1", () => {
    const sample = new FileSystem();
    const node = sample.createNode("ROOT", "sample");

    node.createFile("hello", Buffer.from("Hello!"));
    node.createFile("world", Buffer.from("World!"));

    const build = sample.build();

    expect(build).toStrictEqual(
      readFileSync(`${__dirname}/fixtures/hello.rarc`),
    );
  });

  it("method createFile() #2", () => {
    const sample = new FileSystem();
    const node = sample.createNode("ROOT", "sample");

    node.createFile("HelloWorld", Buffer.from("Hello!"));

    const build = sample.build();

    expect(build).toStrictEqual(
      readFileSync(`${__dirname}/fixtures/hello2.rarc`),
    );
  });

  it("method createFile() with invalid identifier", () => {
    expect(() => new FileSystem().createNode("INVALID", "invalid")).toThrow(
      "Invalid identifier: INVALID",
    );
  });
});
