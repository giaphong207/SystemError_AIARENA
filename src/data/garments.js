export const GARMENTS = {
    "ao-dai": {
        id: "ao-dai",
        name: "Áo dài",
        description: "Trang phục thanh thoát, mềm mại mang tính biểu tượng của người Việt.",
        supportedFabrics: ["silk", "brocade"],
        supportedPatterns: ["none", "leaf", "wave"],
        hasHemLengthAdjustment: true,
        defaultBottomColor: "#FFFFFF",
        compatibleAccessories: ["non-la", "khan-van", "tui-xach", "giay-cao-got"]
    },
    "ao-tu-than": {
        id: "ao-tu-than",
        name: "Áo tứ thân",
        description: "Trang phục dân gian Bắc Bộ với nhiều lớp áo, dải lụa và sắc độ phong phú.",
        supportedFabrics: ["dui", "silk"],
        supportedPatterns: ["none", "leaf"],
        hasHemLengthAdjustment: false,
        defaultBottomColor: "#1A1A1A", // Váy đụp đen
        compatibleAccessories: ["non-quai-thao", "mo-qua", "guoc-moc"]
    },
    "ao-ngu-than": {
        id: "ao-ngu-than",
        name: "Áo ngũ thân",
        description: "Trang phục đĩnh đạc, nền nã hình thành từ thời chúa Nguyễn, tiền thân của áo dài.",
        supportedFabrics: ["silk", "brocade", "dui"],
        supportedPatterns: ["none", "wave"],
        hasHemLengthAdjustment: false,
        defaultBottomColor: "#FFFFFF",
        compatibleAccessories: ["khan-van", "khan-xep", "giay-the-thao", "guoc-moc"]
    }
};