import {readdir,readFile,mkdir,writeFile,rm,cp} from 'node:fs/promises';
import path from 'node:path';
const buildDate=new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Ulaanbaatar',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
const assets={};const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.png':'image/png','.jpg':'image/jpeg','.pdf':'application/pdf','.svg':'image/svg+xml'};
async function walk(dir){for(const e of await readdir(dir,{withFileTypes:true})){const f=path.join(dir,e.name);if(e.isDirectory())await walk(f);else assets['/'+path.relative('public',f)]={type:types[path.extname(f)]||'application/octet-stream',data:(await readFile(f)).toString('base64')};}}
await walk('public');
const html=Buffer.from(assets['/index.html'].data,'base64').toString('utf8').replaceAll('{{BUILD_DATE_ISO}}',buildDate).replaceAll('{{BUILD_DATE_LABEL}}',buildDate.replaceAll('-','.'));
assets['/index.html'].data=Buffer.from(html).toString('base64');
await rm('dist',{recursive:true,force:true});await mkdir('dist/server',{recursive:true});await mkdir('dist/.openai',{recursive:true});await writeFile('dist/server/index.js','const ASSETS='+JSON.stringify(assets)+';\n'+await readFile('worker/index.js','utf8'));await cp('.openai/hosting.json','dist/.openai/hosting.json');await cp('drizzle','dist/.openai/drizzle',{recursive:true});console.log('Built Worker with',Object.keys(assets).length,'assets');
