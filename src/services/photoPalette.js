// Local color quantization; no biometric/skin/body analysis and no upload.
export async function extractPalette(file){
    if(!['image/jpeg','image/png','image/webp'].includes(file.type)||file.size>5*1024*1024)throw new Error('Chọn ảnh JPG, PNG hoặc WebP, tối đa 5 MB.');
    const bitmap=await createImageBitmap(file);
    try{const c=document.createElement('canvas');c.width=64;c.height=64;const ctx=c.getContext('2d',{willReadFrequently:true});ctx.drawImage(bitmap,0,0,64,64);const data=ctx.getImageData(0,0,64,64).data;const bins=new Map();for(let i=0;i<data.length;i+=4){if(data[i+3]<128)continue;const rgb=[data[i],data[i+1],data[i+2]];const k=rgb.map(n=>Math.floor(n/32)).join(',');const item=bins.get(k)||{n:0,sum:[0,0,0]};item.n++;rgb.forEach((n,j)=>item.sum[j]+=n);bins.set(k,item);}return [...bins.values()].sort((a,b)=>b.n-a.n).slice(0,5).map(b=>'#'+b.sum.map(n=>Math.round(n/b.n).toString(16).padStart(2,'0')).join(''));}finally{bitmap.close();}
}