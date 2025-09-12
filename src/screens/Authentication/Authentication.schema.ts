import { z } from "zod";

export const authSchema = (isRegister: boolean) =>
  z
    .object({
      username: z.string().optional(),
      email: z.string().email("Please enter a valid email address."),
      password: z
        .string()
        .min(6, "Password must be at least 6 characters long."),
      confirmPassword: z.string().optional(),
    })
    .refine(
      (data) => {
        if (isRegister) {
          return data.password === data.confirmPassword;
        }
        return true;
      },
      {
        message: "Passwords do not match.",
        path: ["confirmPassword"],
      }
    )
    .refine(
      (data) => {
        if (isRegister) {
          return !!data.username && data.username.length >= 3;
        }
        return true;
      },
      {
        message: "Username must be at least 3 characters long.",
        path: ["username"],
      }
    );
