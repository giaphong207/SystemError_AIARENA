import React from 'react';
import { Environment, ContactShadows } from '@react-three/drei';

const SceneEnvironment = ({ backgroundId }) => {
  // Map backgroundId từ UI sang màu sắc/HDRi tương ứng
  const bgColor = backgroundId === 'studio-cream' ? '#FAF9F5' : '#E7E9E1';

  return (
    <>
      <color attach="background" args={[bgColor]} />
      <ambientLight intensity={0.6} />
      {/* Key light: Chiếu sáng chính từ trên chéo góc */}
      <directionalLight 
        position={[5, 10, 5]} 
        intensity={1.2} 
        castShadow 
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      {/* Fill light: Bù sáng vùng tối */}
      <directionalLight position={[-5, 5, 5]} intensity={0.4} color="#b3c2ff" />
      {/* Rim light: Tách chủ thể khỏi nền */}
      <directionalLight position={[0, 5, -5]} intensity={0.8} color="#ffd8b3" />
      
      {/* Môi trường phản xạ chân thực cho chất liệu kim loại/lụa */}
      <Environment preset="city" />
      
      {/* Bóng đổ tiếp xúc dưới chân mềm mại */}
      <ContactShadows 
        position={[0, 0, 0]} 
        opacity={0.7} 
        scale={10} 
        blur={2} 
        far={4} 
      />
    </>
  );
};

export default SceneEnvironment;