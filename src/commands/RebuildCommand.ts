import {
  existsSync,
  lstatSync,
  readFileSync,
  readdirSync,
  writeFileSync,
} from "node:fs";
import { basename, normalize } from "node:path";

import { fatal } from "@triforce-heroes/triforce-core";

import { FileSystem } from "../FileSystem.js";

function createNode(fileSystem: FileSystem, path: string, nodeName: string) {
  const basenameSplit = nodeName.split("$", 2);
  const identifier = basenameSplit.length === 2 ? basenameSplit[0]! : "ROOT";
  const name = basenameSplit.length === 2 ? basenameSplit[1]! : nodeName;

  const node = fileSystem.createNode(identifier, name);
  const nodeFiles = readdirSync(path);

  for (const file of nodeFiles) {
    const filePath = `${path}/${file}`;

    if (!lstatSync(filePath).isFile()) {
      continue;
    }

    node.createFile(basename(file), readFileSync(filePath));
  }
}

export function CompressCommand(input: string, output?: string) {
  if (!existsSync(input)) {
    fatal(`Directory not found: ${input}`);
  }

  const outputFile = normalize(output ?? `${input}.rarc`);

  process.stdout.write(`Rebuild ${normalize(input)} to ${outputFile}... `);

  const fileSystem = new FileSystem();

  createNode(fileSystem, normalize(input), basename(input));

  writeFileSync(outputFile, fileSystem.build());

  process.stdout.write("OK\n");
}
