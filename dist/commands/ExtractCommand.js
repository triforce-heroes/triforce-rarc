import{existsSync as e,mkdirSync as r,readFileSync as t,writeFileSync as o}from"node:fs";import{basename as i,dirname as n,normalize as f}from"node:path";import{fatal as $}from"@triforce-heroes/triforce-core/Console";import{extract as m}from"../Extract.js";export function ExtractCommand(a,s){e(a)||$(`File not found: ${a}`);let c=n(a),d=i(a,".rarc"),p=f(s??`${c}/${d}`);for(let e of(process.stdout.write(`Extracting ${f(a)} to ${p}... `),m(t(a)))){let t="ROOT"===e.identifier?"":`${e.identifier}$`,i="ROOT"===e.identifier&&e.name===d?f(`${c}/${t}${e.name}`):f(`${p}/${t}${e.name}`);for(let t of(r(i,{recursive:!0}),e.entries))o(`${i}/${t.name}`,t.data)}process.stdout.write("OK\n")}