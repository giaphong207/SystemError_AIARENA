import React from 'react';
import { useGLTF } from '@react-three/drei';

const HumanAvatar = () => {
  // Yêu cầu có file avatar-base.glb chân thực (có đầu, da thịt, pose đứng thẳng)
  const { scene } = useGLTF('/models/avatar-base.glb');
  
  return (
    <primitive object={scene} castShadow receiveShadow />
  );
};

useGLTF.preload('/models/avatar-base.glb');
export default HumanAvatar;