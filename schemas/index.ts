import * as z from "zod";

export const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string()
});


export const RegisterSchema = z.object({
    firstName: z.string().min(3, {
        message: "Minimum 3 characters required",
    }),
    lastName: z.string().min(2, {
        message: "Minimum 2 characters required",
    }),
    email: z.string().email({
        message: "Invalid email address",
    }),
    contact: z.string().min(10, {
        message: "Minimum 10 characters required for contact number",
    }),
    address: z.string().min(4, {
        message: "Minimum 4 characters required",
    }),
    password: z.string().min(6, {
        message: "Minimum 6 characters required",
    }),
    confirmPassword: z.string().min(6, {
        message: "Minimum 6 characters required",
    }),
})
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"], // Show the error message in the confirmPassword field
    });