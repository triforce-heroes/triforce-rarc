/// <reference types="node" resolution-mode="require"/>
import { DataHeader } from "./parseHeader.js";
export interface DataEntry {
    name: string;
    data: Buffer;
}
export declare function parseEntries(buffer: Buffer, header: DataHeader, names: Map<number, string>): [number, DataEntry][];
