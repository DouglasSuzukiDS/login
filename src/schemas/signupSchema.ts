import { z } from "zod";

export const signupSchema = z.object({
   name: z.string().min(3, "O nome precisa conter pelo menos 3 caracteres."),
   login: z.string().min(3, "O login precisa conter ao menos 3 caracteres."),
   password: z.string().min(3, "A senha precisa conter pelo menos 3 caracteres."),
   isAdmin: z.boolean().default(false)
})