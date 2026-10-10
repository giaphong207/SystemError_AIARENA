# Nguồn và giấy phép

1. **Mesh giải phẫu**: MakeHuman Community, `makehuman/data/3dobjs/base.obj`, tài sản đồ họa CC0. Nguồn: https://github.com/makehumancommunity/makehuman/blob/master/makehuman/data/3dobjs/base.obj . File gốc được kèm trong `scripts/source/makehuman-base.obj`; script nhóm tạo lại GLB với tư thế tay và phần da nhìn thấy. Giấy phép dự án phân biệt code AGPL và graphical assets CC0: `public/models/MAKEHUMAN_LICENSE.md`. Không sử dụng code của MakeHuman để chạy ứng dụng.
2. **Font**: Be Vietnam Pro và Lora, Google Fonts, SIL Open Font License. Bytes lấy từ font nhúng của HTML tham khảo được người dùng gửi; giấy phép kèm tại `public/fonts/BE_VIETNAM_PRO_OFL.txt` và `LORA_OFL.txt`.
3. **Chất liệu và phụ kiện**: geometry, texture Canvas và CSS được sinh bằng code trong dự án, không dùng asset tải ngoài lúc chạy.
4. **Tư liệu văn hóa tổng quan**: Vietnam Tourism, https://image.vietnam.travel/things-to-do/ao-dai-vietnam ; Bảo tàng Phụ nữ Việt Nam, https://baotangphunu.org.vn/suu-tap/ . Thông tin được diễn giải thận trọng, không chép nguyên bài và không coi mỗi link là bằng chứng cho mọi chi tiết của từng phom áo.
5. **Gemini API**: tài liệu chính thức Google, https://ai.google.dev/api/generate-content và https://ai.google.dev/gemini-api/docs/structured-output . Sử dụng REST `generateContent`, cấu hình `responseFormat.text` cho JSON/schema; vẫn kiểm tra toàn bộ dữ liệu phía server.

Ngày tra cứu: 10/10/2026. Tên model là biến môi trường để điều chỉnh khi model/quyền truy cập thay đổi. Khóa Gemini của nhóm chưa được cung cấp nên kiểm thử tích hợp hiện dùng phản hồi mô phỏng.
