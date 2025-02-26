import { z } from "zod";
export const signInSchema = z.object({
  identifier: z
    .string()
    .length(6, { message: "code must be atleast 6 characters" }), // here identifier can be either email or username
  password: z
    .string()
    .min(6, { message: "password must be atleast 6 characters" }),
});
