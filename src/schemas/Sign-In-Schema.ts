import * as z from "zod";

export const formSchema = z.object({
    email: z.string().email("Endereço de email inválido"),
    password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
})