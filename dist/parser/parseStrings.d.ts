/// <reference types="node" resolution-mode="require"/>
import { DataHeader } from "./parseHeader.js";
export declare function parseNames(buffer: Buffer, header: DataHeader): Map<number, string>;
