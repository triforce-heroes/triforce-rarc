import { BufferConsumer } from "@triforce-heroes/triforce-core/BufferConsumer";
import { ByteOrder } from "@triforce-heroes/triforce-core/types/ByteOrder";

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
