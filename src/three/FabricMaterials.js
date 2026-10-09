import * as THREE from 'three';

export const getFabricMaterial = (fabricId, colorHex) => {
  const baseColor = new THREE.Color(colorHex);

  switch (fabricId) {
    case 'silk': // Lụa: Bóng nhẹ, mềm mại, có clearcoat
      return new THREE.MeshPhysicalMaterial({
        color: baseColor,
        roughness: 0.3,
        metalness: 0.1,
        clearcoat: 0.5,
        clearcoatRoughness: 0.2,
        side: THREE.DoubleSide,
      });
    case 'brocade': // Gấm: Độ nhám trung bình, phản quang kim loại nhẹ ở hoa văn
      return new THREE.MeshPhysicalMaterial({
        color: baseColor,
        roughness: 0.6,
        metalness: 0.3,
        clearcoat: 0.1,
        side: THREE.DoubleSide,
      });
    case 'dui': // Đũi: Thô ráp, mờ, không bóng
      return new THREE.MeshPhysicalMaterial({
        color: baseColor,
        roughness: 0.9,
        metalness: 0.0,
        sheen: 0.5, // Tạo cảm giác lông rụng nhẹ của vải tự nhiên
        sheenRoughness: 0.8,
        side: THREE.DoubleSide,
      });
    default:
      return new THREE.MeshStandardMaterial({ color: baseColor, side: THREE.DoubleSide });
  }
};