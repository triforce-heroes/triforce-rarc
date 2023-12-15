import { BufferConsumer, ByteOrder } from "@triforce-heroes/triforce-core";

import { parser } from "./parser/parser.js";

export function extract(buffer: Buffer) {
  return parser.parse(
    new BufferConsumer(buffer, undefined, ByteOrder.BIG_ENDIAN),
  );
}
