import React, { Suspense, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import SceneEnvironment from './SceneEnvironment';
import CameraController from './CameraController';
import HumanAvatar from './HumanAvatar';
import GarmentSystem from './GarmentSystem';

// Một component nhỏ để trigger callback onReady khi tải xong
const LoadReporter = ({ onReady }) => {
  useEffect(() => {
    if (onReady) onReady();
  }, [onReady]);
  return null;
};

const AvatarViewer = ({ 
  look, 
  cameraPreset = 'front', 
  autoRotate = false, 
  background = 'studio-cream',
  onReady, 
  onError 
}) => {
  
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <Canvas 
        shadows 
        camera={{ position: [0, 1.2, 4], fov: 45 }}
        gl={{ preserveDrawingBuffer: true, antialias: true }} // preserveDrawingBuffer để hỗ trợ chụp ảnh màn hình
      >
        <SceneEnvironment backgroundId={background} />
        <CameraController preset={cameraPreset} autoRotate={autoRotate} />
        
        {/* Xử lý lỗi tải model (Lưu ý: Trong thực tế cần ErrorBoundary bọc ngoài Canvas) */}
        <Suspense fallback={null}>
          <group position={[0, -1, 0]}> {/* Căn chỉnh cho chân chạm đất */}
            <HumanAvatar />
            <GarmentSystem look={look} />
          </group>
          <LoadReporter onReady={onReady} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default AvatarViewer;