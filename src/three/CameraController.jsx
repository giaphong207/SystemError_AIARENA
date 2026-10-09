import React, { useEffect, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import gsap from 'gsap';

const CameraController = ({ preset, autoRotate }) => {
  const { camera, controls } = useThree();
  const controlsRef = useRef();

  useEffect(() => {
    if (!controlsRef.current) return;

    // Các góc quay chuẩn (x, y, z) tính theo hệ tọa độ Three.js
    const positions = {
      front: { x: 0, y: 1.2, z: 4 },
      angle: { x: -2.5, y: 1.2, z: 3 },
      back: { x: 0, y: 1.2, z: -4 }
    };

    const targetPos = positions[preset] || positions.front;

    // Dùng GSAP hoặc lerp để chuyển góc mượt mà
    gsap.to(camera.position, {
      x: targetPos.x,
      y: targetPos.y,
      z: targetPos.z,
      duration: 1,
      ease: 'power2.inOut',
      onUpdate: () => controlsRef.current.update()
    });

  }, [preset, camera]);

  return (
    <OrbitControls 
      ref={controlsRef}
      target={[0, 1, 0]} // Trọng tâm là phần ngực/eo người mẫu
      enablePan={false}
      minDistance={1.5}
      maxDistance={6}
      maxPolarAngle={Math.PI / 2 + 0.1} // Không cho lật camera xuống dưới sàn
      autoRotate={autoRotate}
      autoRotateSpeed={2.0}
    />
  );
};

export default CameraController;