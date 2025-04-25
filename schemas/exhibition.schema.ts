import * as z from "zod";

export const ExhibitionSchema = z.object({
    exhibitionTitle: z
        .string()
        .min(1, { message: "Exhibition title is required" })
        .max(50, { message: "Title must not exceed 50 characters" })
        .trim()
        .refine(
            (val) => val.length >= 4,
            "Exhibition title must be at least 4 characters"
        ),
    exhibitionVenue: z
        .string()
        .min(1, { message: "Venue is required" })
        .max(50, { message: "Venue must not exceed 50 characters" })
        .trim()
        .refine(
            (val) => val.length >= 4,
            "Venue must be at least 4 characters"
        ),
    exhibitionDates: z
        .array(z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format"))
        .min(1, "At least one date is required"),
});
