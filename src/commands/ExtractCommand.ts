import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { basename, dirname, normalize } from "node:path";

import { fatal } from "@triforce-heroes/triforce-core/Console";

import { extract } from "../Extract.js";

export function ExtractCommand(input: string, output?: string) {
  if (!existsSync(input)) {
    fatal(`File not found: ${input}`);
  }

  const inputDirname = dirname(input);
  const inputBasename = basename(input, ".rarc");

  const outputNormalized = normalize(
    output ?? `${inputDirname}/${inputBasename}`,
  );

  process.stdout.write(
    `Extracting ${normalize(input)} to ${outputNormalized}... `,
  );

  const nodes = extract(readFileSync(input));

  for (const node of nodes) {
    const nodeIdentifier =
      node.identifier === "ROOT" ? "" : `${node.identifier}$`;

    const nodePath =
      node.identifier === "ROOT" && node.name === inputBasename
        ? normalize(`${inputDirname}/${nodeIdentifier}${node.name}`)
        : normalize(`${outputNormalized}/${nodeIdentifier}${node.name}`);

    mkdirSync(nodePath, { recursive: true });

    for (const entry of node.entries) {
      writeFileSync(`${nodePath}/${entry.name}`, entry.data);
    }
  }

  process.stdout.write("OK\n");
}
