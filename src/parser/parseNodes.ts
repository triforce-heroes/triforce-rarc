import { BufferConsumer, ByteOrder } from "@triforce-heroes/triforce-core";

import { DataEntry } from "./parseEntries.js";
import { DataHeader } from "./parseHeader.js";

export interface DataNode {
  identifier: string;
  name: string;
  entries: DataEntry[];
}

function parseNode(
  consumer: BufferConsumer,
  names: Map<number, string>,
  entries: Array<[number, DataEntry]>,
): DataNode {
  const identifier = consumer.readString(4);
  const stringOffset = consumer.readUnsignedInt32();

  consumer.skip(
    2, // Hash.
  );

  const entriesCount = consumer.readUnsignedInt16();
  const entryOffset = consumer.readUnsignedInt32();

  const entryIndex = entries.findIndex(([offset]) => offset === entryOffset);

  return {
    identifier,
    name: names.get(stringOffset)!,
    entries: entries
      .slice(entryIndex, entryIndex + entriesCount)
      .map(([, entry]) => entry),
  };
}

export function parseNodes(
  buffer: Buffer,
  header: DataHeader,
  names: Map<number, string>,
  entries: Array<[number, DataEntry]>,
) {
  const nodes: DataNode[] = [];

  const consumerOffset = header.length + header.nodesOffset;
  const consumer = new BufferConsumer(
    buffer.subarray(consumerOffset, consumerOffset + header.nodesCount * 16),
    undefined,
    ByteOrder.BIG_ENDIAN,
  );

  for (let i = 0; i < header.nodesCount; i++) {
    nodes.push(parseNode(consumer, names, entries));
  }

  return nodes;
}
