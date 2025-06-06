import * as z from "zod";

export const formSchema = z.object({
    title: z.string().min(1, "O título é obrigatório"),
    description: z.string().min(1, "A descrição é obrigatória"),
    date: z.date().refine((date) => {
        const today = new Date();
        const due = new Date(date);
        today.setHours(0, 0, 0, 0);
        due.setHours(0, 0, 0, 0);
        return due >= today;
    }
        , {
            message: "A data de vencimento deve ser hoje ou uma data futura",
        }),
    emergency: z.boolean().optional(),
    interval: z.number().min(0, "1 intervalo deve ser pelo menos 1 dia").max(30, "O intervalo não deve ser maior que 30 dias").optional(),
    status: z.enum(["PENDING", "COMPLETED", "IN-PROGRESS", "CANCELLED"]),
})