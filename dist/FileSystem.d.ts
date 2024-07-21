declare abstract class NodeEntry {
    readonly name: string;
    constructor(name: string);
}
declare class Node {
    readonly identifier: string;
    readonly name: string;
    readonly entries: NodeEntry[];
    constructor(identifier: string, name: string);
    createFile(name: string, data: Buffer): void;
}
export declare class FileSystem {
    private readonly nodes;
    createNode(identifier: string, name: string): Node;
    build(): Buffer;
}
export {};
