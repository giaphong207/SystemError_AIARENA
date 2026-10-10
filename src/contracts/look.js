import { GARMENTS } from '../data/garments.js';
import { OCCASIONS, FABRICS, PATTERNS, ACCESSORIES, BACKGROUNDS, SKINS } from '../data/options.js';
export const defaultLook = {id:'draft-001',name:'Một thoáng ngọc',garmentId:'ao-dai',occasionId:'photo',color:'#2C5144',fabricId:'silk',patternId:'leaf',hemLength:100,bottomColor:'#FAF9F5',accessoryIds:[],backgroundId:'studio-cream',skinColor:SKINS[0]};
const hex = x => typeof x==='string' && /^#[a-f0-9]{6}$/i.test(x);
const has = (a,id) => a.some(x=>x.id===id);
export function validateLook(x) {
 if(!x || typeof x!=='object' || Array.isArray(x)) return false;
 if(typeof x.id!=='string' || !x.id.length || x.id.length>100 || typeof x.name!=='string' || !x.name.trim() || x.name.length>50) return false;
 const g=GARMENTS[x.garmentId];
 return !!g && has(OCCASIONS,x.occasionId) && hex(x.color) && hex(x.bottomColor) && hex(x.skinColor)
 && has(FABRICS,x.fabricId) && g.supportedFabrics.includes(x.fabricId) && has(PATTERNS,x.patternId) && g.supportedPatterns.includes(x.patternId)
 && Number.isFinite(x.hemLength) && x.hemLength>=75 && x.hemLength<=110
 && has(BACKGROUNDS,x.backgroundId) && Array.isArray(x.accessoryIds) && x.accessoryIds.length<=4
 && new Set(x.accessoryIds).size===x.accessoryIds.length && x.accessoryIds.every(id=>has(ACCESSORIES,id))
 && new Set(x.accessoryIds.map(id=>ACCESSORIES.find(a=>a.id===id).slot)).size===x.accessoryIds.length;
}
// Whitelist fields: imported JSON and AI output cannot inject arbitrary properties.
export function normalizeLook(raw={}) {
 const x={...defaultLook};
 for(const k of Object.keys(x)) if(raw[k]!==undefined) x[k]=raw[k];
 if(!validateLook(x)) throw new Error('Bản phối có giá trị không hợp lệ. Kiểm tra màu, phom áo và phụ kiện.');
 x.name=x.name.trim(); x.accessoryIds=[...x.accessoryIds];
 return x;
}
export function changeGarment(look,id) {
 const g=GARMENTS[id]; if(!g) return look;
 return {...look,garmentId:id,fabricId:g.supportedFabrics.includes(look.fabricId)?look.fabricId:g.supportedFabrics[0],patternId:g.supportedPatterns.includes(look.patternId)?look.patternId:'none',hemLength:g.hasHemLengthAdjustment?look.hemLength:100,bottomColor:g.defaultBottomColor};
}
export function toggleAccessory(look,id) {
 const a=ACCESSORIES.find(a=>a.id===id); if(!a) return look;
 return {...look,accessoryIds:look.accessoryIds.includes(id)?look.accessoryIds.filter(x=>x!==id):[...look.accessoryIds.filter(x=>ACCESSORIES.find(a=>a.id===x).slot!==a.slot),id]};
}