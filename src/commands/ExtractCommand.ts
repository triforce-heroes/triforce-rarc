import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { normalize } from "node:path";

import {
  BufferConsumer,
  ByteOrder,
  fatal,
} from "@triforce-heroes/triforce-core";

import { DataNode } from "../parser/parseNodes.js";
import { parser } from "../parser/parser.js";

export function ExtractCommand(input: string, output?: string) {
  if (!existsSync(input)) {
    fatal(`File not found: ${input}`);
  }

  const outputPath = normalize(output ?? `${input}.out`);

  process.stdout.write(`Extracting ${normalize(input)} to ${outputPath}... `);

  const nodes = parser.parse(
    new BufferConsumer(readFileSync(input), undefined, ByteOrder.BIG_ENDIAN),
  ) as DataNode[];

  for (const node of nodes) {
    const nodeIdentifier =
      node.identifier === "ROOT" ? "" : `${node.identifier}$`;
    const nodePath = normalize(`${outputPath}/${nodeIdentifier}${node.name}`);

    mkdirSync(nodePath, { recursive: true });

    for (const entry of node.entries) {
      writeFileSync(`${nodePath}/${entry.name}`, entry.data);
    }
  }

  process.stdout.write("OK\n");
}
