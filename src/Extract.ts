import { parseEntries } from "./parser/parseEntries.js";
import { parseHeader } from "./parser/parseHeader.js";
import { parseNodes } from "./parser/parseNodes.js";
import { parseNames } from "./parser/parseStrings.js";

export function extract(buffer: Buffer) {
  const header = parseHeader(buffer);
  const names = parseNames(buffer, header);
  const entries = parseEntries(buffer, header, names);
  const nodes = parseNodes(buffer, header, names, entries);

  return nodes;
}
