import { z } from "zod";
export const usernameValidation = z
  .string()
  .min(2, "usernmae must be atleat two characters")
  .max(20, "usrname must be atmost 20 characters")
  .regex(/^[a-zA-Z0-9]+$/, "username must be alphanumeric only");

  export const signUpSchema = z.object({
    username: usernameValidation,
    email: z.string().email({message:"invalid email address"}),
    password: z.string().min(6, {message:"password must be atleast 6 characters"}),
  });
