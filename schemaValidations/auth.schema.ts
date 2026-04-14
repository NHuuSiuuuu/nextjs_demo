import { z } from "zod"; // Thư viện tạo schema valide  (luật cho form)

// Register
export const RegisterBody = z
  .object({
    name: z.string().trim().min(2).max(256),
    email: z.string().email(),
    password: z.string().min(6).max(100),
    confirmPassword: z.string().min(6).max(100),
  })
  .strict() // Không cho field lạ ngoài schema

  //   Hàm viết logic cho cả obj: so sánh, tạo lỗi ...(ctx: context: công cụ tạo lỗi, gắn lỗi, báo lỗi)
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword != password) {
      ctx.addIssue({
        /**
         * code có các option loại lỗi
         * custom: lỗi tự tạo
         * invalid_type: sai kiểu dữ liệu
         * too_small: quá ngắn
         * too_big: quá dài
         */
        code: "custom",
        message: "Mật khẩu không khớp",
        path: ["confirmPassword"], // chỉ định lỗi thuộc  field nào
      });
    }
  });

// lấy type từ schema
export type RegisterBodyType = z.infer<typeof RegisterBody>;

// Login
export const LoginBody = z
  .object({
    email: z.string().email(),
    password: z.string().min(6).max(100),
  })
  .strict();

export type LoginBodyType = z.TypeOf<typeof LoginBody>;
