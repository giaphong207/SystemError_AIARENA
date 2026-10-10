import { Component } from 'react';
export default class ErrorBoundary extends Component {
 state={error:null};
 static getDerivedStateFromError(error){return {error};}
 componentDidCatch(error){this.props.onError?.(error);}
 render(){if(this.state.error)return <div className="viewer-error" role="alert"><h3>Không tải được không gian 3D</h3><p>Hãy thử lại hoặc dùng trình duyệt có hỗ trợ 3D. Bạn vẫn có thể chọn đồ và lưu bản phối.</p><button onClick={()=>this.setState({error:null})}>Thử lại</button></div>;return this.props.children;}
}