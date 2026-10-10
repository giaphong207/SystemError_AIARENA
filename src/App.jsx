import { Routes,Route,Link } from 'react-router-dom';
import Header from './components/Header.jsx';
import StudioPage from './pages/StudioPage.jsx';
import CollectionPage from './pages/CollectionPage.jsx';
import CulturePage from './pages/CulturePage.jsx';
export default function App(){return <div className="app-container"><Header/><main className="main-content"><Routes><Route path="/" element={<StudioPage/>}/><Route path="/collection" element={<CollectionPage/>}/><Route path="/culture" element={<CulturePage/>}/><Route path="*" element={<div className="empty-state"><h1>Không tìm thấy trang</h1><Link className="button primary" to="/">Về Studio</Link></div>}/></Routes></main><footer>Việt Phục Remix · Di sản trong một diện mạo mới · Bản phối lưu trên thiết bị của bạn.</footer></div>;}