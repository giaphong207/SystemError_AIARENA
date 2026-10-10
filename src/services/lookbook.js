import { normalizeLook, validateLook } from '../contracts/look.js';
export { validateLook };
const STORAGE_KEY='vietphuc_lookbook';
const DRAFT_KEY='vietphuc_draft';
export const STORAGE_EVENT='vietphuc-change';
function notify(){ if(typeof window!=='undefined') window.dispatchEvent(new Event(STORAGE_EVENT)); }
function write(key,value){ try{localStorage.setItem(key,JSON.stringify(value));notify();}catch{throw new Error('Không lưu được trên máy: bộ nhớ đầy hoặc trình duyệt chặn lưu trữ. Hãy xuất JSON để giữ bản phối.');} }
function read(key){ try{const s=localStorage.getItem(key);return s?JSON.parse(s):null;}catch{ return null; } }
export function getSavedLooks(){const d=read(STORAGE_KEY);return Array.isArray(d?.looks)?d.looks.flatMap(raw=>{try{return [{...normalizeLook(raw),createdAt:raw.createdAt,updatedAt:raw.updatedAt}];}catch{return [];}}):[];}
export function saveLook(raw){const x=normalizeLook(raw);const now=new Date().toISOString();const looks=getSavedLooks();const i=looks.findIndex(a=>a.id===x.id);const saved={...x,createdAt:i<0?now:looks[i].createdAt,updatedAt:now};if(i<0 && looks.length>=100)throw new Error('Tối đa 100 bản phối. Hãy xuất và xóa bớt trước khi lưu.');if(i<0)looks.unshift(saved);else looks[i]=saved;write(STORAGE_KEY,{version:1,looks});return saved;}
export function deleteLook(id){write(STORAGE_KEY,{version:1,looks:getSavedLooks().filter(x=>x.id!==id)});}
export function exportLooks(){return JSON.stringify({version:1,looks:getSavedLooks()},null,2);}
export function importLooks(text){let d;try{d=JSON.parse(text);}catch{throw new Error('File JSON không đọc được.');}if(d?.version!==1 || !Array.isArray(d.looks) || d.looks.length>100)throw new Error('File phải là lookbook phiên bản 1, tối đa 100 bản phối.');const incoming=d.looks.map(normalizeLook);const merged=new Map(getSavedLooks().map(x=>[x.id,x]));incoming.forEach(x=>merged.set(x.id,x));if(merged.size>100)throw new Error('Sau nhập sẽ vượt 100 bản phối.');write(STORAGE_KEY,{version:1,looks:[...merged.values()]});return incoming.length;}
export function loadDraft(fallback){const d=read(DRAFT_KEY);return validateLook(d)?normalizeLook(d):{...fallback,accessoryIds:[...fallback.accessoryIds]};}
export function saveDraft(x){write(DRAFT_KEY,normalizeLook(x));}
export function compareLooks(a,b){if(!a||!b)return null;const keys=['garmentId','occasionId','color','fabricId','patternId','hemLength','bottomColor','accessoryIds','backgroundId'];return {lookA:a,lookB:b,diff:Object.fromEntries(keys.filter(k=>JSON.stringify(a[k])!==JSON.stringify(b[k])).map(k=>[k,{A:a[k],B:b[k]}]))};}