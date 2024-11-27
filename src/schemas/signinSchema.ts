import { z } from "zod";

export const signinSchema = z.object({
   login: z.string().min(3, "O login precisa conter ao menos 3 caracteres."),
   password: z.string().min(3, "A senha precisa conter pelo menos 3 caracteres."),
})