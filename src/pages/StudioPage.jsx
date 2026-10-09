import React, { useState } from 'react';
import { defaultLook } from '../contracts/look';
import '../styles/studio.css';
import AvatarViewer from '../three/AvatarViewer';

const StudioPage = () => {
  const [currentLook, setCurrentLook] = useState(defaultLook);

  return (
    <div className="studio-layout">
      {/* Cột trái: Tủ đồ Việt */}
      <aside className="studio-sidebar left">
        <h3>Tủ đồ Việt</h3>
        <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', marginTop: '8px' }}>
          Hôm nay, bạn đi đâu?
        </p>
        {/* Component GarmentSelector, AccessorySelector sẽ nằm ở đây */}
      </aside>

      {/* Cột giữa: Không gian 3D */}
      <main className="studio-workspace">
        <AvatarViewer look={currentLook} autoRotate={false} cameraPreset="front" />
      </main>

      {/* Cột phải: Nét riêng của bạn */}
      <aside className="studio-sidebar right">
        <h3>Nét riêng của bạn</h3>
        <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', marginTop: '8px' }}>
          Màu sắc & Chất liệu
        </p>
        {/* Component ColorPicker, MaterialSelector sẽ nằm ở đây */}
      </aside>
    </div>
  );
};

export default StudioPage;