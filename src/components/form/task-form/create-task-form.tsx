"use client";

import { Form } from "@components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomFormField, { FormFieldType } from "@components/ui/custom-form-field";
import * as z from "zod";
import { Button } from "@components/ui/button";
import { formSchema } from "schemas/task-schema";
import { Checkbox } from "@components/ui/checkbox";
import { useState } from "react";
import { createTask } from "@actions/task/task.actions";
import { toast } from "react-toastify";


type CreateTaskFormData = z.infer<typeof formSchema>;
type CreateTaskFormProps = {
    onSuccess?: () => void;
};

const CreateTaskForm = ({ onSuccess }: CreateTaskFormProps) => {
    const [isPeriodic, setIsPeriodic] = useState(false);

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "",
            date: new Date(),
            emergency: false,
            status: "PENDING",
            interval: 0,
        },
    });

    const onSubmit = async (data: CreateTaskFormData) => {
        try {
            const result = formSchema.safeParse(data);

            if (!result.success) {
                console.log("Erro de validação:", result.error);
            }
            const response = await createTask(data);
            if (response.success) {
                toast.success("Tarefa criada com sucesso!");
                form.reset();
                window.location.reload();

            } else {
                toast.error(response.message || "Erro ao criar tarefa");
            }
        } catch (error) {
            console.error(error);
            toast.error("Erro inesperado ao criar tarefa");
        }
    }

    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <CustomFormField
                        control={form.control}
                        name="title"
                        label="Título"
                        placeholder="Insira o título da tarefa"
                        fieldType={FormFieldType.INPUT}
                        error={!!form.formState.errors.title?.message}
                    />
                    <CustomFormField
                        control={form.control}
                        name="description"
                        label="Descrição"
                        placeholder="Insira a descrição da tarefa"
                        fieldType={FormFieldType.TEXTAREA}
                        error={!!form.formState.errors.description?.message}
                    />
                    <CustomFormField
                        control={form.control}
                        name="date"
                        label="Data de Conclusão"
                        placeholder="Insira a data de conclusão da tarefa"
                        fieldType={FormFieldType.DATE_PICKER}
                        error={!!form.formState.errors.date?.message}
                    />
                    <CustomFormField
                        control={form.control}
                        name="emergency"
                        label="Tarefa de Emergência"
                        fieldType={FormFieldType.CHECKBOX}
                        error={!!form.formState.errors.emergency?.message}
                    />
                    <div className="flex items-center space-x-4">
                        <Checkbox
                            id="periodic-checkbox"
                            checked={isPeriodic}
                            onCheckedChange={(checked) => setIsPeriodic(!!checked)}
                        />
                        <label
                            htmlFor="periodic-checkbox"
                            className="text-md font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            A tarefa é Periódica?
                        </label>
                    </div>
                    {isPeriodic && (
                        <CustomFormField
                            control={form.control}
                            name="interval"
                            label="Intervalo (dias)"
                            placeholder="Insira o intervalo em dias"
                            fieldType={FormFieldType.INPUT}
                            error={!!form.formState.errors.interval?.message}
                        />
                    )}

                    <Button
                        type="submit"
                        className="w-full text-md md:text-lg bg-blue-900 text-white hover:bg-blue-800 transition-colors"
                    >
                        Adicionar Tarefa
                    </Button>
                </form>
            </Form>
        </div>
    );

}

export default CreateTaskForm;