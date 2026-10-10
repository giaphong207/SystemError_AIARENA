import { useMemo, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import { MeshPhysicalMaterial } from 'three';
const url=import.meta.env.BASE_URL+'models/avatar-base.glb';
export default function HumanAvatar({skinColor='#C68D68'}){
  const {scene}=useGLTF(url);
  const object=useMemo(()=>{const s=scene.clone(true);s.traverse(m=>{if(m.isMesh){m.material=new MeshPhysicalMaterial({color:skinColor,vertexColors:true,roughness:.68,metalness:0});m.castShadow=true;}});return s;},[scene,skinColor]);
  useEffect(()=>()=>object.traverse(m=>{if(m.isMesh)m.material.dispose();}),[object]);
  return <group><primitive object={object}/>{[-1,1].map(s=><group key={s} position={[s*.031,1.565,.146]}><mesh scale={[1,.55,.63]}><sphereGeometry args={[.0105,24,16]}/><meshStandardMaterial color="#f1e6dc" roughness={.35}/></mesh><mesh position={[0,0,.008]}><sphereGeometry args={[.004,20,12]}/><meshStandardMaterial color="#483A2C"/></mesh><mesh position={[0,0,.012]}><sphereGeometry args={[.0023,16,10]}/><meshStandardMaterial color="#131313"/></mesh></group>)}</group>;
}