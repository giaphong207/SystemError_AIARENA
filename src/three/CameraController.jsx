import { useEffect, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
export default function CameraController({preset,autoRotate,zoom=1,resetKey=0}){
  const {camera}=useThree();const ref=useRef();
  useEffect(()=>{const p={front:[0,1.12,3.25],angle:[2.1,1.20,2.6],back:[0,1.12,-3.25]}[preset]||[0,1.12,3.25];camera.position.set(p[0]/zoom,.86+(p[1]-.86)/zoom,p[2]/zoom);if(ref.current){ref.current.target.set(0,.86,0);ref.current.update();}},[camera,preset,zoom,resetKey]);
  return <OrbitControls ref={ref} makeDefault target={[0,.86,0]} enablePan={false} minDistance={1.4} maxDistance={5} minPolarAngle={.25} maxPolarAngle={Math.PI/2+.1} autoRotate={autoRotate} autoRotateSpeed={1.3}/>;
}