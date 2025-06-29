import { REGEX } from "./regex";

export const validationRules = {
  email: {
    required: "Email wajib diisi",
    pattern: {
      value: REGEX.EMAIL,
      message: "Format email tidak valid",
    },
  },
  phone: {
    required: "Nomor wajib diisi",
    pattern: {
      value: REGEX.PHONE_NUMBER,
      message: "Nomor tidak valid (harus diawali 08)",
    },
  },
  password: {
    required: "Password wajib diisi",
    pattern: {
      value: REGEX.PASSWORD,
      message: "Minimal 8 karakter, huruf besar, kecil, dan angka",
    },
  },
};
