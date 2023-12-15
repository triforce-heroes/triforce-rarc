import { ParserCallback } from "@triforce-heroes/triforce-parser";

export interface DataHeader {
  length: number;
  dataOffset: number;
  nodesCount: number;
  nodesOffset: number;
  entriesCount: number;
  entriesOffset: number;
  stringsLength: number;
  stringsOffset: number;
}

// eslint-disable-next-line func-style
export const parseHeader: ParserCallback<DataHeader> = ({
  consumer,
  error,
}) => {
  const magic = consumer.readString(4);

  if (magic !== "RARC") {
    error("Not a RARC file.");
  }

  consumer.skip(
    4, // Length of entire file.
  );

  const length = consumer.readUnsignedInt32();
  const dataOffset = consumer.readUnsignedInt32();

  consumer.skip(
    4 + // Data length.
      4 + // Data length (again).
      4 + // Unknown (always 0).
      4, // Unknown (always 0).
  );

  const nodesCount = consumer.readUnsignedInt32();
  const nodesOffset = consumer.readUnsignedInt32();

  const entriesCount = consumer.readUnsignedInt32();
  const entriesOffset = consumer.readUnsignedInt32();

  const stringsLength = consumer.readUnsignedInt32();
  const stringsOffset = consumer.readUnsignedInt32();

  consumer.skip(
    4 + // Unknown (always 0).
      4, // Unknown (always 0)
  );

  return {
    length,
    dataOffset,
    nodesCount,
    nodesOffset,
    entriesCount,
    entriesOffset,
    stringsLength,
    stringsOffset,
  };
};
