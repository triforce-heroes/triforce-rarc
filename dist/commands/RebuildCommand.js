import{existsSync as e,lstatSync as o,readFileSync as t,readdirSync as r,writeFileSync as i}from"node:fs";import{basename as s,normalize as l}from"node:path";import{fatal as n}from"@triforce-heroes/triforce-core";import{FileSystem as f}from"../FileSystem.js";export function CompressCommand(m,c){e(m)||n(`Directory not found: ${m}`);let p=l(c??`${m}.rarc`);process.stdout.write(`Rebuild ${l(m)} to ${p}... `);let d=new f;!function(e,i,l){let n=l.split("$",2),f=2===n.length?n[0]:"ROOT",m=2===n.length?n[1]:l,c=e.createNode(f,m);for(let e of r(i)){let r=`${i}/${e}`;o(r).isFile()&&c.createFile(s(e),t(r))}}(d,l(m),s(m)),i(p,d.build()),process.stdout.write("OK\n")}