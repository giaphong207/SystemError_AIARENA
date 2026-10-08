import React, { useState } from 'react';
import { defaultLook } from '../contracts/look';
import '../styles/studio.css';

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
        <div className="placeholder-3d">
          <h2>KHÔNG GIAN 3D</h2>
          <p>Mô hình {currentLook.garmentId} đang được tích hợp bởi Thành viên 2</p>
        </div>
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