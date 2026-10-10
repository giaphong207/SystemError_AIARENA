import { useMemo, useEffect } from 'react';
import * as THREE from 'three';
import { getFabricMaterial } from './FabricMaterials.js';
// Surfaces have real UVs; separate front/back panels preserve the áo dài slit.
function surface(profiles,start=0,end=Math.PI*2,folds=0){
  const pos=[],uv=[],index=[];const n=64;
  profiles.forEach(([y,rx,rz],j)=>{for(let i=0;i<=n;i++){const a=start+(end-start)*i/n;const ripple=1+folds*Math.sin(a*18);pos.push(Math.sin(a)*rx*ripple,y,Math.cos(a)*rz*ripple+.018);uv.push(i/n,j/(profiles.length-1));}});
  for(let j=0;j<profiles.length-1;j++)for(let i=0;i<n;i++){const a=j*(n+1)+i,b=a+n+1;index.push(a,b,a+1,b,b+1,a+1);}
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));g.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));g.setIndex(index);g.computeVertexNormals();return g;
}
function Sleeve({side,material}){const start=new THREE.Vector3(side*.14,1.335,.015);const end=new THREE.Vector3(side*.294,.98,.055);const delta=end.clone().sub(start);const q=new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0,1,0),delta.clone().normalize());return <mesh position={start.clone().add(end).multiplyScalar(.5)} quaternion={q} material={material} castShadow><cylinderGeometry args={[.048,.061,delta.length(),40,8,true]}/></mesh>;}
export default function GarmentSystem({look}){
  const tu=look.garmentId==='ao-tu-than',ngu=look.garmentId==='ao-ngu-than';
  const material=useMemo(()=>getFabricMaterial(look.fabricId,look.color,look.patternId),[look.fabricId,look.color,look.patternId]);
  const hem=.23+(110-look.hemLength)*.009;
  const surfaces=useMemo(()=>{
    const torso=[[1.405,.058,.063],[1.365,.17,.08],[1.30,.18,.116],[1.20,ngu?.175:.145,.118],[1.105,ngu?.17:.125,.091],[1.04,ngu?.18:.14,.115]];
    const profiles=[[1.042,ngu?.18:.14,.12],[.91,.185,.133],[.72,.20,.14],[.50,.225,.151],[hem,.25,.17]];
    const body=tu?surface(torso,.6,Math.PI*2-.6):surface(torso);
    const panels=tu?[surface(profiles,.38,Math.PI-.1,.025),surface(profiles,Math.PI+.1,2*Math.PI-.38,.025)]:[surface(profiles,-Math.PI/2+.09,Math.PI/2-.09,.02),surface(profiles,Math.PI/2+.09,3*Math.PI/2-.09,.02)];
    return {body,panels,bib:surface(torso.map(([y,x,z])=>[y,x*.93,z*.87])),skirt:surface([[1.03,.14,.10],[.77,.165,.11],[.47,.195,.125],[.10,.23,.14]],0,Math.PI*2,.025)};
  },[tu,ngu,hem]);
  useEffect(()=>()=>{material.map?.dispose();material.dispose();},[material]);
  useEffect(()=>()=>Object.values(surfaces).flat().forEach(g=>g.dispose()),[surfaces]);
  return <group><mesh geometry={surfaces.body} material={material} castShadow/>{surfaces.panels.map((g,i)=><mesh key={i} geometry={g} material={material} castShadow/>)}<Sleeve side={1} material={material}/><Sleeve side={-1} material={material}/>
    {tu?<><mesh geometry={surfaces.skirt} castShadow><meshStandardMaterial color={look.bottomColor} side={THREE.DoubleSide} roughness={.9}/></mesh><mesh geometry={surfaces.bib}><meshStandardMaterial color="#E9CFA0" side={THREE.DoubleSide} roughness={.85}/></mesh><mesh position={[0,1.055,.02]} rotation={[Math.PI/2,0,0]} scale={[1,1,.7]}><torusGeometry args={[.153,.015,10,60]}/><meshStandardMaterial color="#C8A668"/></mesh><mesh position={[.055,.88,.159]} rotation={[0,0,-.12]}><boxGeometry args={[.025,.31,.008]}/><meshStandardMaterial color="#C8A668"/></mesh></>:<>{[-1,1].map(s=><mesh key={s} position={[s*.082,.56,.019]} castShadow><cylinderGeometry args={[.057,.075,.96,40,12]}/><meshStandardMaterial color={look.bottomColor} roughness={.83}/></mesh>)}</>}
    {!tu&&<mesh position={[0,1.407,.018]} material={material}><cylinderGeometry args={[.061,.063,.045,40,1,true]}/></mesh>}
    {ngu&&[1.34,1.28,1.21,1.14,1.07].map(y=><mesh key={y} position={[.10,y,.12]}><sphereGeometry args={[.008,12,8]}/><meshStandardMaterial color="#C6AA73"/></mesh>)}
  </group>;
}
