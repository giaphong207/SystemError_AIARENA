import http from 'node:http';
import { readFile,stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { recommend } from './gemini.js';
try{process.loadEnvFile();}catch(e){if(e.code!=='ENOENT')throw e;}
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../dist');
const port=Number(process.env.API_PORT||process.env.PORT||8787),host=process.env.HOST||'127.0.0.1';
const limits=new Map();
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.glb':'model/gltf-binary','.woff2':'font/woff2','.svg':'image/svg+xml','.png':'image/png','.json':'application/json'};
function json(res,status,data){res.writeHead(status,{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store'});res.end(JSON.stringify(data));}
async function body(req){let s='';for await(const chunk of req){s+=chunk;if(Buffer.byteLength(s)>16384)throw Object.assign(new Error('Yêu cầu quá lớn.'),{status:413});}try{return JSON.parse(s);}catch{throw Object.assign(new Error('JSON không hợp lệ.'),{status:400});}}
export const server=http.createServer(async(req,res)=>{
 res.setHeader('X-Content-Type-Options','nosniff');res.setHeader('Referrer-Policy','same-origin');
 try{
  const url=new URL(req.url,'http://localhost');
  if(url.pathname==='/api/health'&&req.method==='GET')return json(res,200,{ok:true,geminiConfigured:!!(process.env.GEMINI_API_KEY&&process.env.GEMINI_MODEL)});
  if(url.pathname==='/api/recommend'){
   if(req.method!=='POST')return json(res,405,{error:'Chỉ hỗ trợ POST.'});
   if(!req.headers['content-type']?.startsWith('application/json'))return json(res,415,{error:'Yêu cầu phải là JSON.'});
   const origin=req.headers.origin;
   if(origin){const hostname=new URL(origin).hostname;const local=['localhost','127.0.0.1','[::1]'].includes(hostname);if(!local&&origin!==process.env.ALLOWED_ORIGIN)return json(res,403,{error:'Địa chỉ truy cập chưa được cấu hình.'});}
   const key=req.socket.remoteAddress;const now=Date.now();if(limits.size>10000)limits.clear();const entry=limits.get(key)||{start:now,n:0};if(now-entry.start>60000){entry.start=now;entry.n=0;}entry.n++;limits.set(key,entry);if(entry.n>10)return json(res,429,{error:'Tối đa 10 gợi ý mỗi phút. Thử lại sau.'});
   return json(res,200,await recommend(await body(req)));
  }
  if(url.pathname.startsWith('/api/'))return json(res,404,{error:'Không tìm thấy API.'});
  if(!['GET','HEAD'].includes(req.method))return json(res,405,{error:'Không hỗ trợ phương thức này.'});
  const relative=decodeURIComponent(url.pathname).replace(/^\/+/,'');let target=path.resolve(root,relative||'index.html');
  if(!target.startsWith(root+path.sep)&&target!==root)return json(res,403,{error:'Đường dẫn không hợp lệ.'});
  try{if(!(await stat(target)).isFile())target=path.join(root,'index.html');}catch{if(path.extname(target))return json(res,404,{error:'Không tìm thấy tài nguyên.'});target=path.join(root,'index.html');}
  const bytes=await readFile(target);res.writeHead(200,{'Content-Type':types[path.extname(target)]||'application/octet-stream','Cache-Control':target.includes(path.sep+'assets'+path.sep)?'public, max-age=31536000, immutable':'no-cache'});res.end(req.method==='HEAD'?undefined:bytes);
 }catch(e){json(res,e.status||502,{error:e.name==='TimeoutError'?'Gemini phản hồi quá lâu. Thử lại sau.':e.status?e.message:'Máy chủ không xử lý được yêu cầu. Kiểm tra kết nối và cấu hình.'});}
});
server.listen(port,host,()=>console.log(`Việt Phục Remix server: http://${host}:${port}`));