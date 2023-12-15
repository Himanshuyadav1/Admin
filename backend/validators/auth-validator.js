import { z } from "zod";

const signupSchema = z.object({
    username: z
        .string({ required_error: "Username is required" })
        .trim()
        .min(3, { message: "Username must be at least of 3 characters" })
        .max(20, { message: "Username must not be more than 20 characters" }),
    email: z
        .string({ required_error: "Email is required" })
        .trim()
        .email({ message: "Invalid email address" })
        .min(3, { message: "Email must be at least of 3 characters" })
        .max(50, { message: "Email must not be more than 50 characters" }),
    phone: z
        .string({ required_error: "Phone is required" })
        .trim()
        .min(10, { message: "Phone must be at least of 10 characters" })
        .max(20, { message: "Phone must not be more than 20 characters" }),
    password: z
        .string({ required_error: "Password is required" })
        .trim()
        .min(5, { message: "Password must be at least of 5 characters" })
        .max(10, { message: "Password must not be more than 10 characters" }),
});

const loginSchema = z.object({
    email: z
        .string({ required_error: "Email is required" })
        .trim()
        .email({ message: "Invalid email address" })
        .min(3, { message: "Email must be at least of 3 characters" })
        .max(50, { message: "Email must not be more than 50 characters" }),
    password: z
        .string({ required_error: "Password is required" })
        .trim()
        .min(5, { message: "Password must be at least of 5 characters" })
        .max(10, { message: "Password must not be more than 10 characters" }),
});

export { signupSchema, loginSchema };