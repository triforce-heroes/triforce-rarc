import{BufferConsumer as r}from"@triforce-heroes/triforce-core";import{parser as e}from"./parser/parser.js";export function extract(o){return e.parse(new r(o,void 0,1))}