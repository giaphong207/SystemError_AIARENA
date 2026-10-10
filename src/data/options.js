export const OCCASIONS = [
 {id:'photo',name:'Một buổi chụp ảnh',hint:'Chọn sắc màu nổi bật và phụ kiện tạo điểm nhấn.'},
 {id:'school',name:'Đi học / sự kiện trường',hint:'Ưu tiên trang phục kín đáo, đơn giản, dễ di chuyển.'},
 {id:'festival',name:'Lễ hội văn hóa',hint:'Giữ phom áo và phụ kiện phù hợp với bối cảnh lễ hội.'},
 {id:'heritage',name:'Thăm di tích / nghi lễ',hint:'Ưu tiên sự trang nhã, kín đáo; tìm hiểu quy định của nơi đến.'},
 {id:'daily',name:'Dạo phố',hint:'Phối hiện đại với giày và túi gọn nhẹ.'}
];
export const FABRICS = [{id:'silk',name:'Lụa',note:'Mềm, óng nhẹ'},{id:'brocade',name:'Gấm',note:'Vân dệt nổi'},{id:'dui',name:'Đũi',note:'Mộc, ít bóng'}];
export const PATTERNS = [{id:'none',name:'Trơn'},{id:'leaf',name:'Nhánh lá'},{id:'wave',name:'Sóng nhẹ'}];
export const ACCESSORIES = [
 {id:'khan-van',name:'Khăn vấn',slot:'head'}, {id:'non-la',name:'Nón lá',slot:'head'},
 {id:'non-quai-thao',name:'Nón quai thao',slot:'head'}, {id:'mo-qua',name:'Khăn mỏ quạ',slot:'head'},
 {id:'khan-xep',name:'Khăn xếp',slot:'head'}, {id:'tui-xach',name:'Túi mây',slot:'bag'},
 {id:'giay-cao-got',name:'Giày cao gót',slot:'feet'}, {id:'guoc-moc',name:'Guốc mộc',slot:'feet'},
 {id:'giay-the-thao',name:'Sneaker',slot:'feet'}, {id:'kinh-ram',name:'Kính râm',slot:'eyes'}
];
export const COLORS = ['#2C5144','#922F42','#C79944','#E9DFC8','#BC8093','#33475F','#77617D','#785343'];
export const BACKGROUNDS = [{id:'studio-cream',name:'Kem',color:'#F1EEE5'},{id:'studio-gray',name:'Xám',color:'#DEE4DE'},{id:'studio-dark',name:'Chàm',color:'#253A39'}];
export const SKINS = ['#C68D68','#E0B394','#9B6247'];
export const getName = (items,id) => items.find(x=>x.id===id)?.name || id;