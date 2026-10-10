import AvatarViewer from '../three/AvatarViewer.jsx';
import { compareLooks } from '../services/lookbook.js';
import { GARMENTS } from '../data/garments.js';
import { OCCASIONS,FABRICS,PATTERNS,ACCESSORIES,BACKGROUNDS,getName } from '../data/options.js';
export default function LookComparison({a,b}){
 const result=compareLooks(a,b);if(!result)return <p>Chọn hai bản phối để so sánh.</p>;
 const rows=[['Phom áo','garmentId',v=>GARMENTS[v]?.name],['Sự kiện','occasionId',v=>getName(OCCASIONS,v)],['Màu áo','color'],['Chất liệu','fabricId',v=>getName(FABRICS,v)],['Họa tiết','patternId',v=>getName(PATTERNS,v)],['Độ dài tà','hemLength',v=>v+'%'],['Màu phần dưới','bottomColor'],['Phụ kiện','accessoryIds',v=>v.map(id=>getName(ACCESSORIES,id)).join(', ')||'Không'],['Phông nền','backgroundId',v=>getName(BACKGROUNDS,v)]];
 return <><div className="comparison-views">{[a,b].map((look,i)=><section key={i}><h3>{look.name}</h3><div className="compare-canvas"><AvatarViewer look={look}/></div></section>)}</div><div className="table-wrap"><table><thead><tr><th>Tiêu chí</th><th>{a.name}</th><th>{b.name}</th></tr></thead><tbody>{rows.map(([label,k,format])=><tr key={k} className={result.diff[k]?'different':''}><th>{label}</th>{[a,b].map((x,i)=><td key={i}>{format?format(x[k]):x[k]}</td>)}</tr>)}</tbody></table></div><p className="muted">Những hàng nền xanh là điểm khác nhau. Kéo từng mô hình để xem góc khác.</p></>;
}