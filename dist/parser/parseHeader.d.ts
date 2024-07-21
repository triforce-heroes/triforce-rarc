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
export declare function parseHeader(buffer: Buffer): {
    length: number;
    dataOffset: number;
    nodesCount: number;
    nodesOffset: number;
    entriesCount: number;
    entriesOffset: number;
    stringsLength: number;
    stringsOffset: number;
};
