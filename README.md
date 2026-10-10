# Việt Phục Remix — Nếp xưa. Nét riêng.

Bản sửa từ ZIP nhóm gửi ngày 10/10/2026. Đã sửa folder `hooks`, bổ sung mô hình/font, sửa vị trí quần/giày và tên font tiêu đề. Chi tiết kiểm thử ở `docs/KET_QUA_KIEM_TRA.md`.

## Chạy trong IntelliJ hoặc VS Code

1. Mở thư mục **SystemError_AIARENA** có `package.json`, `src`, `public`, `server` và `tests`.
2. Dùng Node.js **22.16 trở lên**. Kiểm tra bằng `node -v` trong Terminal.
3. Mở Terminal ở thư mục đó:

```bash
npm ci
npm run dev
```

Mở địa chỉ Vite in ra, thường là **http://127.0.0.1:5173**. Giữ Terminal chạy. Lệnh dev bật cả Vite và API Node ở cổng 8787. Không nhấp đúp `index.html`: ứng dụng cần máy chủ phục vụ các module, mô hình và API.

## Kiểm tra và chạy bản build

```bash
npm run lint
npm test
npm run build
npm start
```

Bản build chạy ở **http://127.0.0.1:8787**. `npm run preview` chỉ xem frontend, không tự bật API. `npm start` phục vụ cả ứng dụng và API, hỗ trợ tải lại `/collection` và `/culture`.

Khi chạy dev, giữ `API_PORT=8787` để khớp proxy trong `vite.config.js`. Nếu đổi cổng API cho dev, đổi cả proxy. Khi deploy Node, đặt `HOST=0.0.0.0`, cổng host yêu cầu và `ALLOWED_ORIGIN` tương ứng.

## Bật Gemini

Sao chép `.env.example` thành `.env` cạnh `package.json`; điền khóa thật và model có quyền truy cập trong Google AI Studio, rồi khởi động lại:

```dotenv
GEMINI_API_KEY=YOUR_KEY_HERE
GEMINI_MODEL=gemini-3.8-flash
API_PORT=8787
HOST=127.0.0.1
```

Trong Studio: **Gợi ý cho tôi → nhập sở thích → Hỏi Gemini**. Không cần khóa để dùng **Gợi ý theo quy tắc**. Khóa chỉ được đọc ở máy chủ, không đặt trong biến `VITE_` hay đưa `.env` lên Git. Bản kiểm tra chưa có khóa của đội, chưa gọi Google API thật; các test Gemini dùng phản hồi mô phỏng. Thay model ví dụ nếu tài khoản không có quyền truy cập.

## File cần có

| Đường dẫn | Vai trò |
|---|---|
| `src/hooks/useLookHistory.js` | Hoàn tác/làm lại; folder đúng là `hooks` |
| `public/models/avatar-base.glb` | Nhân vật 3D kèm sẵn |
| `public/fonts/` | 18 font WOFF2 và giấy phép |
| `scripts/source/makehuman-base.obj` | Mesh nguồn để tạo lại GLB |
| `tests/core.test.js`, `tests/gemini.test.js` | Test Node.js của ứng dụng |
| `docs/KET_QUA_KIEM_TRA.md` | Lỗi, thay đổi và kết quả kiểm thử |
| `docs/screens/` | Ảnh từ bản chạy thử |

Folder `test` chứa `pom.xml` là module Maven dư trong ZIP nhóm gửi; ứng dụng web không dùng nó. Test của web nằm trong `tests` cạnh `package.json`.

Tạo lại GLB với Python 3, không cần thư viện ngoài:

```bash
python3 scripts/build-avatar.py
```

## Đưa bản sửa vào repository nhóm

Sao lưu code đang làm. Chép các file trong ZIP vào thư mục repository tương ứng, thay file khi được hỏi và giữ nguyên `.git` hiện có. Chép đầy đủ **public/models**, **public/fonts**, **scripts/source**; chuyển `src/hook/useLookHistory.js` sang **src/hooks/useLookHistory.js**. Chạy lại npm ci, lint, test và build trên máy nhóm. ZIP không chứa node_modules, .git, .idea hoặc API key.

## Phạm vi demo

Ba phom áo, nhân vật 3D, tùy chọn phối, lookbook lưu trong trình duyệt, nhập/xuất JSON và chia sẻ cấu hình qua URL. Người nhận phải mở được địa chỉ ứng dụng; localhost chỉ dùng trên máy đang chạy. Ảnh tham khảo chỉ lấy màu tại trình duyệt. Không thử size theo cơ thể, không mô phỏng vải vật lý hay dựng người giống ảnh.

Nguồn và giấy phép ở `docs/NGUON_TAI_NGUYEN.md`, `public/models/MAKEHUMAN_LICENSE.md` và `public/fonts/*_OFL.txt`.
