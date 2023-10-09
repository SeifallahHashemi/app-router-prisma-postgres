import {z} from "zod";

export const addPostSchema = z.object({
    username: z.string().min(3, "at least 3 characters").max(8, "at least 8 characters"),
    title: z.string().min(3, "at least 3 characters"),
    content: z.string().min(3, "at least 3 characters")
})

export type TAddPostSchema = z.infer<typeof addPostSchema>