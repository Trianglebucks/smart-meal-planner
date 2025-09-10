import { z } from "zod";

export const authSchema = (isRegister: boolean) =>
  z
    .object({
      email: z.string().email("Please enter a valid email address."),
      password: z.string().min(
        isRegister ? 6 : 1, // Stricter password for registration
        isRegister
          ? "Password must be at least 6 characters long."
          : "Password is required."
      ),
      confirmPassword: isRegister
        ? z.string().min(1, "Please confirm your password.")
        : z.string().optional(),
    })
    .refine((data) => !isRegister || data.password === data.confirmPassword, {
      message: "Passwords do not match.",
      path: ["confirmPassword"], // Apply error to the confirmPassword field
    });
