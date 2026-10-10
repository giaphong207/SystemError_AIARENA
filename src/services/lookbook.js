// src/services/lookbook.js

const STORAGE_KEY = 'vietphuc_lookbook';
const CURRENT_SCHEMA_VERSION = 1;

/**
 * Khởi tạo dữ liệu mẫu nếu chưa có
 */
const initStorage = () => {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
        const emptyLookbook = {
            version: CURRENT_SCHEMA_VERSION,
            looks: []
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(emptyLookbook));
        return emptyLookbook;
    }
    try {
        return JSON.parse(data);
    } catch (error) {
        console.error("Dữ liệu lookbook bị hỏng, khởi tạo lại.");
        return { version: CURRENT_SCHEMA_VERSION, looks: [] };
    }
};

/**
 * Validate một look object trước khi lưu
 */
export const validateLook = (look) => {
    const requiredKeys = ['id', 'name', 'garmentId', 'color', 'fabricId'];
    for (let key of requiredKeys) {
        if (!look[key]) return false;
    }
    if (look.name.length > 50) return false; // Tránh tên quá dài
    // Kiểm tra Hex color hợp lệ
    if (!/^#[0-9A-F]{6}$/i.test(look.color)) return false;
    return true;
};

/**
 * Lấy toàn bộ bản phối đã lưu
 */
export const getSavedLooks = () => {
    const data = initStorage();
    return data.looks || [];
};

/**
 * Lưu hoặc cập nhật bản phối
 */
export const saveLook = (look) => {
    if (!validateLook(look)) {
        throw new Error("Dữ liệu bản phối không hợp lệ.");
    }

    const data = initStorage();
    const existingIndex = data.looks.findIndex(l => l.id === look.id);

    const lookToSave = {
        ...look,
        updatedAt: new Date().toISOString(),
        createdAt: look.createdAt || new Date().toISOString()
    };

    if (existingIndex >= 0) {
        data.looks[existingIndex] = lookToSave;
    } else {
        data.looks.push(lookToSave);
    }

    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        return lookToSave;
    } catch (e) {
        throw new Error("Không thể lưu (LocalStorage có thể đã đầy).");
    }
};

/**
 * Xóa một bản phối theo ID
 */
export const deleteLook = (id) => {
    const data = initStorage();
    data.looks = data.looks.filter(l => l.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

/**
 * Xuất toàn bộ lookbook ra JSON string
 */
export const exportLooks = () => {
    const data = initStorage();
    return JSON.stringify(data, null, 2);
};

/**
 * So sánh 2 bản phối (Trả về Object chứa các trường khác biệt)
 */
export const compareLooks = (lookA, lookB) => {
    if (!lookA || !lookB) return null;

    const diff = {};
    const keysToCompare = ['garmentId', 'color', 'fabricId', 'patternId', 'bottomColor'];

    keysToCompare.forEach(key => {
        if (lookA[key] !== lookB[key]) {
            diff[key] = { A: lookA[key], B: lookB[key] };
        }
    });

    return {
        lookA,
        lookB,
        diff
    };
};