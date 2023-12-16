import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { normalize } from "node:path";

import { fatal } from "@triforce-heroes/triforce-core";

import { extract } from "../Extract.js";

export function ExtractCommand(input: string, output?: string) {
  if (!existsSync(input)) {
    fatal(`File not found: ${input}`);
  }

  const outputPath = normalize(output ?? `${input}.out`);

  process.stdout.write(`Extracting ${normalize(input)} to ${outputPath}... `);

  const nodes = extract(readFileSync(input));

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
