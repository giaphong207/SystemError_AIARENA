import React, { useEffect, useMemo } from 'react';
import { useGLTF } from '@react-three/drei';
import { getFabricMaterial } from './FabricMaterials';

const GarmentSystem = ({ look }) => {
  // Map ID trang phục sang đường dẫn file thật
  const modelPaths = {
    'ao-dai': '/models/ao-dai.glb',
    'ao-tu-than': '/models/ao-tu-than.glb',
    'ao-ngu-than': '/models/ao-ngu-than.glb'
  };

  const currentPath = modelPaths[look.garmentId];
  
  // Tải model trang phục. Sẽ throw lỗi nếu file không tồn tại (xử lý ở ErrorBoundary)
  const { scene } = useGLTF(currentPath);
  
  // Clone scene để tránh mutate asset gốc khi thay đổi material
  const clonedScene = useMemo(() => scene.clone(), [scene]);

  useEffect(() => {
    // Traverse qua các mesh của trang phục để áp dụng chất liệu
    clonedScene.traverse((child) => {
      if (child.isMesh) {
        // Có thể mở rộng logic: nếu child.name === 'quần', dùng look.bottomColor
        const mat = getFabricMaterial(look.fabricId, look.color);
        child.material = mat;
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [clonedScene, look.color, look.fabricId]);

  return <primitive object={clonedScene} />;
};

// Khai báo để Preload tài nguyên mượt hơn
useGLTF.preload('/models/ao-dai.glb');
useGLTF.preload('/models/ao-tu-than.glb');
useGLTF.preload('/models/ao-ngu-than.glb');

export default GarmentSystem;