import { DataEntry } from "./parseEntries.js";
import { DataHeader } from "./parseHeader.js";
export interface DataNode {
    identifier: string;
    name: string;
    entries: DataEntry[];
}
export declare function parseNodes(buffer: Buffer, header: DataHeader, names: Map<number, string>, entries: Array<[number, DataEntry]>): DataNode[];
