import * as THREE from 'three';
export function fabricTexture(fabricId,patternId){
  const c=document.createElement('canvas');c.width=256;c.height=256;const ctx=c.getContext('2d');ctx.fillStyle='#fff';ctx.fillRect(0,0,256,256);
  if(fabricId==='dui'){ctx.strokeStyle='#dad7cf';ctx.lineWidth=.5;for(let i=0;i<256;i+=4){ctx.beginPath();ctx.moveTo(i,0);ctx.lineTo(i,256);ctx.moveTo(0,i);ctx.lineTo(256,i);ctx.stroke();}}
  if(fabricId==='brocade'){ctx.strokeStyle='#bfb59c';ctx.lineWidth=2;for(let y=0;y<256;y+=32)for(let x=0;x<256;x+=32){ctx.beginPath();ctx.ellipse(x+16,y+16,8,12,0,0,Math.PI*2);ctx.stroke();}}
  if(patternId==='leaf'){ctx.strokeStyle='#b7a47c';ctx.fillStyle='#c6b184';ctx.lineWidth=2;for(let x=24;x<256;x+=96){ctx.beginPath();ctx.moveTo(x,220);ctx.bezierCurveTo(x+45,150,x-20,90,x+30,20);ctx.stroke();for(let y=35;y<220;y+=25){ctx.beginPath();ctx.ellipse(x+(y%50===35?22:7),y,5,12,.7,0,Math.PI*2);ctx.fill();}}}
  if(patternId==='wave'){ctx.strokeStyle='#bfb08e';ctx.lineWidth=2;for(let y=0;y<256;y+=24){ctx.beginPath();for(let x=0;x<256;x++)ctx.lineTo(x,y+Math.sin(x/13)*6);ctx.stroke();}}
  const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;t.wrapS=t.wrapT=THREE.RepeatWrapping;t.repeat.set(2,2);return t;
}
export function getFabricMaterial(id,color,pattern='none'){
  const t=fabricTexture(id,pattern);
  return new THREE.MeshPhysicalMaterial({color,map:t,side:THREE.DoubleSide,roughness:id==='silk'?.38:id==='brocade'?.64:.95,metalness:0,sheen:id==='silk'?.7:.25,sheenColor:new THREE.Color('#eee4ce'),sheenRoughness:.5,clearcoat:id==='silk'?.12:0});
}