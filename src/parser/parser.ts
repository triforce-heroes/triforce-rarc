import { Parser } from "@triforce-heroes/triforce-parser";

import { parseEntries } from "./parseEntries.js";
import { parseHeader } from "./parseHeader.js";
import { parseNodes } from "./parseNodes.js";
import { parseNames } from "./parseStrings.js";

export const parser = new Parser();

parser.add("header", ({ consumer, consume, error }) => {
  const header = parseHeader({ consumer, consume, error });
  const names = parseNames(consumer.buffer, header);
  const entries = parseEntries(consumer.buffer, header, names);
  const nodes = parseNodes(consumer.buffer, header, names, entries);

  return nodes;
});
