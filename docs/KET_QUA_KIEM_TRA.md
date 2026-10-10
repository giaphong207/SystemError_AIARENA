# Kết quả kiểm tra bản nhóm gửi

Ngày kiểm tra: 10/10/2026. Đầu vào: `SystemError_AIARENA(1).zip`. Đây là kết quả chạy lại trên ZIP mới của nhóm, không sử dụng kết quả bản cũ thay cho việc kiểm tra.

## Kết luận

Bản ZIP gửi lên **chưa build được** do sai tên folder `hook`/`hooks` và còn thiếu tài nguyên 3D/font. Sau khi sửa, bản hoàn thiện đã cài được dependencies, vượt qua lint, 11 test tự động, build và các kiểm tra trình duyệt/API. Không ghi nhận lỗi JavaScript hoặc tài nguyên bị lỗi trong các lượt end-to-end đạt cuối cùng; yêu cầu Gemini thiếu key trả lỗi có chủ đích.

Mã nhóm chép khớp logic với mã đã bàn giao: phần lớn khác biệt chỉ là thụt dòng hoặc thiếu dòng trống cuối file. Không phát hiện đoạn mã nguồn chức năng bị mất trong các file đã chép.

## Lỗi và thay đổi cụ thể

| Mục | Hiện trạng trong ZIP mới | Thay đổi đã thực hiện |
|---|---|---|
| Đường dẫn hook | `StudioPage.jsx` import `../hooks/useLookHistory.js`, nhưng file nằm trong `src/hook/` | Chuyển nguyên file sang `src/hooks/useLookHistory.js` |
| Nhân vật 3D | Thiếu `public/models/avatar-base.glb` | Bổ sung GLB và giấy phép MakeHuman |
| Font | `fonts.css` tham chiếu 18 WOFF2 chưa có | Bổ sung `public/fonts/font-0.woff2` đến `font-17.woff2` cùng hai giấy phép OFL |
| Mesh nguồn | `build-avatar.py` tham chiếu OBJ chưa có | Bổ sung `scripts/source/makehuman-base.obj`; đã chạy script tạo GLB thành công |
| Font tiêu đề | CSS chọn `Lora`, nhưng `@font-face` khai báo `Lora Variable` | Sửa biến font trong `src/styles/global.css` để dùng font đóng gói |
| Quần và giày | Quần quá rộng ở hông, xuyên ra ngoài tà; giày lệch tâm chân | Sửa vị trí và bán kính quần trong `src/three/GarmentSystem.jsx`, sửa vị trí giày trong `src/three/AccessorySystem.jsx` |
| Phần da thừa của mesh | Điều kiện chọn bàn tay cũng giữ vài mảnh ngón chân ở sát nền | Thêm giới hạn chiều cao trong `scripts/build-avatar.py` và tạo lại GLB |
| Lockfile | Metadata vẫn ghi phiên bản 0.0.0, thiếu engines ở gốc | Đồng bộ với `package.json` 1.0.0; giữ nguyên các phiên bản dependencies |
| Hướng dẫn | README còn là template React/Vite | Viết hướng dẫn chạy, bật Gemini, áp dụng bản sửa và giải thích các đường dẫn |
| Git | Chưa bỏ qua cấu hình IntelliJ | Thêm `.idea/` vào `.gitignore` |

Thư mục `test` chứa `pom.xml` là module Maven dư, không được web sử dụng. Nó được giữ lại trong bản nguồn để tránh xóa dữ liệu của đội. Hai file test đúng của ứng dụng đã có ở `tests/core.test.js` và `tests/gemini.test.js`.

## Các lệnh đã chạy

Môi trường: Node.js 24.19.0, npm, Vite 8.3.4, Chromium headless sử dụng WebGL software renderer.

| Kiểm tra | Kết quả |
|---|---|
| `npm ci --offline --ignore-scripts --no-audit --no-fund` | Thành công; cài từ cache đầy đủ 203 package |
| `npm run lint` trên ZIP trước sửa | Đạt |
| `npm test` trên ZIP trước sửa | 11/11 đạt |
| `npm run build` trên ZIP trước sửa | Thất bại vì thiếu `../hooks/useLookHistory.js`; cảnh báo 18 font chưa tồn tại |
| `npm run lint` sau sửa | Đạt |
| `npm test` sau sửa | 11/11 đạt |
| `npm run build` bản cuối | Đạt |
| `python3 scripts/build-avatar.py` | Tạo GLB 444.576 byte, 7.427 đỉnh và 14.676 tam giác |
| Tài nguyên trong `dist` | GLB và 18 font trùng byte với `public` |
| Chạy `scripts/dev.mjs` | Vite khởi động; API qua proxy trả đúng phản hồi |
| Chạy `server/index.js` với bản build | Frontend và API hoạt động; tải lại URL sâu được |

**Lint và unit test đạt không đảm bảo ứng dụng build được.** ZIP ban đầu là ví dụ cụ thể: cả hai đạt, nhưng import sai folder vẫn chặn build.

## Chạy thử giao diện

Các luồng sau đã được thao tác trên trình duyệt chạy bản build của dự án:

- Tải nhân vật, chọn áo dài, áo tứ thân và áo ngũ thân.
- Đổi chất liệu/họa tiết; đổi phom tự điều chỉnh lựa chọn không được hỗ trợ.
- Chọn phụ kiện theo vị trí: chọn nón mới thay phụ kiện đầu cũ.
- Kiểm tra độ dài tà bị khóa với phom không cho thay đổi.
- Hiển thị lưu ý khi dùng phụ kiện hiện đại trong bối cảnh nghi lễ.
- Hoàn tác/làm lại; đổi góc camera; kiểm tra font tiêu đề và ảnh hiển thị sau sửa quần/giày.
- Lưu hai bản phối; mở lại, đổi tên, lưu cập nhật mà không tạo bản trùng.
- Lưu nháp tự động và khôi phục sau khi tải lại.
- So sánh hai mô hình cùng bảng khác biệt; đóng dialog bằng Escape.
- Xuất PNG thật và kiểm tra file tải xuống.
- Xuất lookbook JSON, nhập vào bộ sưu tập trống và tìm theo tên.
- Hủy hoặc xác nhận xóa bản phối.
- Nhập JSON hỏng: hiện lỗi và giữ nguyên bộ sưu tập đang có.
- Sao chép và mở lại liên kết có tên tiếng Việt.
- Dùng gợi ý quy tắc; Gemini chưa cấu hình hiện thông báo đúng.
- Lấy năm màu từ ảnh và áp dụng lên áo.
- Mở ba thẻ văn hóa, tải lại trực tiếp `/culture`.
- Giao diện 390 × 844 không tràn ngang; thao tác chọn áo/phụ kiện được.

Kết quả máy đọc được ở `docs/browser-result.json`, `docs/additional-result.json`, `docs/api-dev-result.json` và `docs/mobile-share-result.json` trong ZIP. Ảnh kiểm tra ở `docs/screens/`.

## Kiểm tra API và file tài nguyên

- `/api/health` trả trạng thái máy chủ và trạng thái cấu hình Gemini.
- API từ chối sai phương thức, sai Content-Type, JSON hỏng, sự kiện không hợp lệ, origin không được cấu hình và payload vượt dung lượng.
- Thiếu API key/model trả lỗi rõ; không giả gợi ý quy tắc thành kết quả Gemini.
- `/`, `/collection` và `/culture` tải được sau build; tài nguyên không tồn tại trả lỗi.
- 18 URL font phục vụ thành công với MIME WOFF2; GLB có header hợp lệ.
- Máy chủ chỉ phục vụ thư mục `dist`; truy cập đường dẫn `/.env` nhận trang SPA fallback, không đọc file `.env` ở gốc.

Payload structured output và model mẫu đã được đối chiếu với tài liệu Google tại thời điểm kiểm tra: [Structured outputs — generateContent](https://ai.google.dev/gemini-api/docs/generate-content/structured-output) và [Gemini 3.8 Flash](https://ai.google.dev/gemini-api/docs/models/gemini-3.8-flash). Việc đối chiếu tài liệu và test mock **không thay thế gọi API thật**.

## Phạm vi chưa kiểm chứng

1. ZIP không có `.env` hoặc API key của đội: chưa gọi Google Gemini thật. Phần Gemini hiện có test payload, validator và lỗi bằng mock.
2. Chưa deploy hoặc push lên GitHub của nhóm; liên kết demo/video cần đội cung cấp thật.
3. Chưa kiểm tra trên Safari, mọi GPU hoặc điện thoại thật. Kết quả giao diện hẹp được kiểm tra bằng Chromium ở kích thước điện thoại.
4. Build vẫn cảnh báo chunk 3D khoảng 1,32 MB, gzip khoảng 369 KB. Đây là cảnh báo dung lượng, không phải lỗi build; lần tải đầu có thể chậm trên mạng yếu.
5. Mô hình vẫn là minh họa 3D, không phải thử size, mô phỏng vải vật lý hoặc tái tạo người từ ảnh.
6. Cài dependencies sử dụng cache trong môi trường kiểm tra; chưa xác minh tải mới từ npm trên mạng và máy của đội. Lockfile đi kèm để cài đúng phiên bản.

## Cách dùng bản đã sửa

1. Tải và giải nén ZIP bản sửa.
2. Trong IntelliJ mở **thư mục có `package.json`**.
3. Nếu đưa vào repository đang làm, sao lưu trước rồi chép các file vào đúng thư mục; giữ nguyên `.git`. Đảm bảo `hooks` có chữ s và chép đủ model/font; file nhị phân không thể bổ sung bằng cách dán văn bản.
4. Mở Terminal và chạy:

```bash
npm ci
npm run dev
```

5. Mở URL Vite in ra, thường là `http://127.0.0.1:5173`.
6. Kiểm tra lại trên máy đội:

```bash
npm run lint
npm test
npm run build
```

7. Nếu cần chạy bản build, dùng `npm start` rồi mở `http://127.0.0.1:8787`.
8. Điền `.env` và thử “Hỏi Gemini” thật trước khi quay minh chứng về AI.

ZIP không kèm node_modules, thư mục Git, cấu hình IDE hay khóa bí mật. Bản build `dist` được kèm để tham khảo; có thể tạo lại bằng lệnh build. Khi mở bản sửa ở thư mục mới, các bản phối lưu trên origin localhost cũ không tự chuyển sang origin khác; dùng xuất/nhập JSON để chuyển lookbook.
