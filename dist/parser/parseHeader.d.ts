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
export declare const parseHeader: ParserCallback<DataHeader>;
