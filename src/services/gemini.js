import { normalizeLook } from '../contracts/look.js';
export async function askGemini({occasionId,preference,look},signal){
    const response=await fetch(`${import.meta.env.BASE_URL}api/recommend`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({occasionId,preference,look}),signal});
    const data=await response.json().catch(()=>({error:'Máy chủ trả dữ liệu không đọc được.'}));
    if(!response.ok)throw new Error(data.error||'Không gọi được Gemini.');
    if(typeof data.reason!=='string' || data.reason.length>2000)throw new Error('Lý do gợi ý không hợp lệ.');
    return {...data,look:normalizeLook(data.look)};
}