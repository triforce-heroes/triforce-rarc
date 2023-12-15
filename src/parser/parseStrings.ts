import { BufferConsumer, ByteOrder } from "@triforce-heroes/triforce-core";

import { DataHeader } from "./parseHeader.js";

export function parseNames(buffer: Buffer, header: DataHeader) {
  const namesOffset = header.length + header.stringsOffset;
  const names = new Map<number, string>();

  const consumer = new BufferConsumer(
    buffer.subarray(namesOffset, namesOffset + header.stringsLength),
    undefined,
    ByteOrder.BIG_ENDIAN,
  );

  while (!consumer.isConsumed()) {
    names.set(consumer.byteOffset, consumer.readNullTerminatedString());
  }

  return names;
}
