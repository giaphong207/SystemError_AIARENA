import { defaultLook, changeGarment, normalizeLook } from '../contracts/look.js';
import { OCCASIONS } from '../data/options.js';
export function suggestLocally(occasionId,preference='') {
    const id=OCCASIONS.some(x=>x.id===occasionId)?occasionId:'photo';
    const g=id==='festival'?'ao-tu-than':id==='heritage'?'ao-ngu-than':'ao-dai';
    const base=changeGarment(defaultLook,g);
    const casual=id==='daily';
    const look={...base,occasionId:id,name:id==='festival'?'Duyên hội làng':id==='heritage'?'Nếp xưa trang nhã':casual?'Ngọc giữa phố':'Một thoáng thanh lịch',color:id==='festival'?'#785343':id==='heritage'?'#33475F':'#2C5144',accessoryIds:id==='festival'?['non-quai-thao','guoc-moc']:id==='heritage'?['khan-van','guoc-moc']:casual?['giay-the-thao','tui-xach']:['non-la'],hemLength:casual?90:100};
    // Preferences are transparent keyword rules, never labelled as Gemini.
    if(/đỏ/i.test(preference))look.color='#922F42';
    if(/đơn giản|tối giản/i.test(preference)){look.patternId='none';look.accessoryIds=[];}
    return {look:normalizeLook(look),reason:OCCASIONS.find(x=>x.id===id).hint+' '+(g==='ao-tu-than'?'Áo tứ thân cùng váy và nón quai thao gợi không gian dân gian Bắc Bộ.':g==='ao-ngu-than'?'Phom ngũ thân rộng và khăn vấn tạo cảm giác nền nã.':'Áo dài cùng quần dài giữ nét thanh lịch.'),source:'rules'};
}
export function checkHarmony(look){
    const warnings=[];const modern=look.accessoryIds.some(x=>['kinh-ram','giay-the-thao','tui-xach'].includes(x));
    if(look.occasionId==='heritage' && modern)warnings.push('Phụ kiện hiện đại phù hợp bản remix; khi dự nghi lễ, cân nhắc bỏ kính râm và chọn giày trang nhã theo quy định nơi đến.');
    if(look.garmentId==='ao-tu-than' && look.accessoryIds.includes('khan-xep'))warnings.push('Khăn xếp không phải cách kết hợp tiêu biểu của áo tứ thân nữ trong mô tả này. Có thể chọn khăn mỏ quạ hoặc nón quai thao.');
    if(look.garmentId==='ao-ngu-than' && look.hemLength<95)warnings.push('Tà ngắn là cách tân; không nên giới thiệu bản phối này như một phục dựng lịch sử nguyên mẫu.');
    if(look.color.toLowerCase()===look.bottomColor.toLowerCase())warnings.push('Áo và phần dưới cùng màu: có thể thêm điểm nhấn phụ kiện để dễ thấy lớp trang phục.');
    return {warnings,notes:modern?['Bản phối có phụ kiện hiện đại: hãy ghi rõ “remix” khi chia sẻ.']:['Bản 3D minh họa phom dáng; không thay thế mẫu cắt may hay phục dựng khảo chứng.']};
}