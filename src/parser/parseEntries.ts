import { BufferConsumer } from "@triforce-heroes/triforce-core/BufferConsumer";
import { ByteOrder } from "@triforce-heroes/triforce-core/types/ByteOrder";

import { DataHeader } from "./parseHeader.js";

export interface DataEntry {
  name: string;
  data: Buffer;
}

function parseEntry(
  buffer: Buffer,
  consumer: BufferConsumer,
  header: DataHeader,
  names: Map<number, string>,
): DataEntry {
  consumer.skip(
    2 + // Index.
      2 + // Hash.
      2, // Type (folder/file).
  );

  const nameOffset = consumer.readUnsignedInt16();
  const dataOffset =
    header.length + header.dataOffset + consumer.readUnsignedInt32();
  const dataLength = consumer.readUnsignedInt32();

  consumer.skip(
    4, // Unknown (always 0).
  );

  return {
    name: names.get(nameOffset)!,
    data: buffer.subarray(dataOffset, dataOffset + dataLength),
  };
}

export function parseEntries(
  buffer: Buffer,
  header: DataHeader,
  names: Map<number, string>,
) {
  const entries: Array<[number, DataEntry]> = [];

  const consumerOffset = header.length + header.entriesOffset;
  const consumer = new BufferConsumer(
    buffer.subarray(consumerOffset, consumerOffset + header.entriesCount * 20),
    undefined,
    ByteOrder.BIG_ENDIAN,
  );

  for (let i = 0; i < header.entriesCount; i++) {
    entries.push([
      consumer.byteOffset,
      parseEntry(buffer, consumer, header, names),
    ]);
  }

  return entries;
}
