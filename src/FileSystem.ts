import { BufferBuilder, ByteOrder } from "@triforce-heroes/triforce-core";

import { EntryType } from "./types/EntryType.js";
import { hash } from "./utils/hash.js";

abstract class NodeEntry {
  public constructor(public readonly name: string) {}
}

class NodeFile extends NodeEntry {
  public constructor(
    name: string,
    public readonly data: Buffer,
  ) {
    super(name);
  }
}

class Node {
  public readonly entries: NodeEntry[] = [];

  public constructor(
    public readonly identifier: string,
    public readonly name: string,
  ) {
    if (identifier.length !== 4) {
      throw new Error(`Invalid identifier: ${identifier}`);
    }
  }

  public createFile(name: string, data: Buffer) {
    this.entries.push(new NodeFile(name, data));
  }
}

export class FileSystem {
  private readonly nodes: Node[] = [];

  public createNode(identifier: string, name: string) {
    const node = new Node(identifier, name);

    this.nodes.push(node);

    return node;
  }

  public build() {
    const headerBuilder = new BufferBuilder(ByteOrder.BIG_ENDIAN);
    const infoBuilder = new BufferBuilder(ByteOrder.BIG_ENDIAN);
    const nodesBuilder = new BufferBuilder(ByteOrder.BIG_ENDIAN);
    const entriesBuilder = new BufferBuilder(ByteOrder.BIG_ENDIAN);
    const namesBuilder = new BufferBuilder(ByteOrder.BIG_ENDIAN);
    const dataBuilder = new BufferBuilder(ByteOrder.BIG_ENDIAN);

    const headerLength = 0x20;
    const infoLength = 0x20;

    let entriesIndex = 0;

    for (const node of this.nodes) {
      const nodeBuilder = new BufferBuilder(ByteOrder.BIG_ENDIAN);

      nodeBuilder.writeString(node.identifier);
      nodeBuilder.writeUnsignedInt32(namesBuilder.length);
      nodeBuilder.writeUnsignedInt16(hash(node.name));
      nodeBuilder.writeUnsignedInt16(node.entries.length);
      nodeBuilder.writeUnsignedInt32(entriesBuilder.length);

      namesBuilder.writeNullTerminatedString(node.name);

      for (const entry of node.entries as NodeFile[]) {
        const entryBuilder = new BufferBuilder(ByteOrder.BIG_ENDIAN);

        entryBuilder.writeUnsignedInt16(entriesIndex++);
        entryBuilder.writeUnsignedInt16(hash(entry.name));
        entryBuilder.writeUnsignedInt16(EntryType.FILE);
        entryBuilder.writeUnsignedInt16(namesBuilder.length);
        entryBuilder.writeUnsignedInt32(dataBuilder.length);
        entryBuilder.writeUnsignedInt32(entry.data.length);
        entryBuilder.writeUnsignedInt32(0);

        namesBuilder.writeNullTerminatedString(entry.name);

        dataBuilder.push(entry.data);
        entriesBuilder.push(entryBuilder.build());
      }

      nodesBuilder.push(nodeBuilder.build());
    }

    const nodesBuffer = nodesBuilder.build();
    const nodesOffset = infoLength;

    const entriesBuffer = entriesBuilder.build();
    const entriesOffset = nodesOffset + nodesBuffer.length;

    const namesBuffer = namesBuilder.build();
    const namesOffset = entriesOffset + entriesBuffer.length;

    const dataBuffer = dataBuilder.build();
    const dataOffset = namesOffset + namesBuffer.length;

    infoBuilder.writeUnsignedInt32(this.nodes.length);
    infoBuilder.writeUnsignedInt32(infoLength);
    infoBuilder.writeUnsignedInt32(entriesIndex);
    infoBuilder.writeUnsignedInt32(entriesOffset);
    infoBuilder.writeUnsignedInt32(namesBuffer.length);
    infoBuilder.writeUnsignedInt32(namesOffset);
    infoBuilder.writeUnsignedInt32(0);
    infoBuilder.writeUnsignedInt32(0);

    const infoBuffer = infoBuilder.build();

    headerBuilder.writeString("RARC");
    headerBuilder.writeUnsignedInt32(
      headerLength +
        infoLength +
        nodesBuffer.length +
        entriesBuffer.length +
        namesBuffer.length +
        dataBuffer.length,
    );
    headerBuilder.writeUnsignedInt32(headerLength);
    headerBuilder.writeUnsignedInt32(dataOffset);
    headerBuilder.writeUnsignedInt32(dataBuffer.length);
    headerBuilder.writeUnsignedInt32(dataBuffer.length);
    headerBuilder.writeUnsignedInt32(0);
    headerBuilder.writeUnsignedInt32(0);

    return Buffer.concat([
      headerBuilder.build(),
      infoBuffer,
      nodesBuffer,
      entriesBuffer,
      namesBuffer,
      dataBuffer,
    ]);
  }
}
