import { Suspense, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import SceneEnvironment from './SceneEnvironment.jsx';
import CameraController from './CameraController.jsx';
import HumanAvatar from './HumanAvatar.jsx';
import GarmentSystem from './GarmentSystem.jsx';
import AccessorySystem from './AccessorySystem.jsx';
import ErrorBoundary from '../components/ErrorBoundary.jsx';
function Ready({callback}){useEffect(()=>{callback?.();},[callback]);return null;}
export default function AvatarViewer({look,cameraPreset='front',autoRotate=false,zoom=1,resetKey=0,onReady,onModelReady,onError}){
  return <ErrorBoundary onError={onError}><Canvas frameloop="demand" shadows dpr={[1,1.5]} camera={{position:[0,1.12,3.25],fov:37}} gl={{preserveDrawingBuffer:true,antialias:true}} onCreated={({gl})=>onReady?.(gl.domElement)} fallback={<div role="alert">Thiết bị chưa hỗ trợ WebGL. Bạn vẫn có thể chọn đồ và lưu bản phối.</div>}>
    <SceneEnvironment backgroundId={look.backgroundId}/><CameraController preset={cameraPreset} autoRotate={autoRotate} zoom={zoom} resetKey={resetKey}/><Suspense fallback={null}><HumanAvatar skinColor={look.skinColor}/><GarmentSystem look={look}/><AccessorySystem ids={look.accessoryIds}/><Ready callback={onModelReady}/></Suspense></Canvas></ErrorBoundary>;
}