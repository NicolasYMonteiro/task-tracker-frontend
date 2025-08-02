"use client";

import { Form } from "@components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomFormField, { FormFieldType } from "@components/ui/custom-form-field";
import * as z from "zod";
import { Button } from "@components/ui/button";
import { formSchema } from "schemas/task-schema";
import { useState } from "react";
import { Task } from "@sharedTypes/task";
import { FaPen, FaTrash } from "react-icons/fa";
import { updateTask, deleteTask } from "@actions/task/task.actions";
import { toast } from "react-toastify";
type EditTaskFormData = z.infer<typeof formSchema>;

interface EditTaskModalProps {
  task: Task;
}

const EditTaskForm = ({ task }: EditTaskModalProps) => {
  const [editableFields, setEditableFields] = useState<Record<string, boolean>>({
    title: false,
    description: false,
    date: false,
    emergency: false,
    status: false,
    interval: false,
  });

  const toggleEdit = (field: keyof typeof editableFields) => {
    setEditableFields((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: task.title || "",
      description: task.description || "",
      date: new Date(task.date) || new Date(),
      emergency: task.emergency || false,
      status: task.status || "PENDING",
      interval: task.interval || undefined,
    },
  });

  const onSubmit = async (data: EditTaskFormData) => {
    const result = formSchema.safeParse(data);

    if (!result.success) {
      console.log("Erro de validação:", result.error);
      return;
    }
    try {
      const response = await updateTask(task.id, data)
      if (response.success) {
        toast.success("Tarefa modificada com sucesso!");
        window.location.reload();

      } else {
        toast.error(response.message || "Erro ao criar tarefa");
      }
    }
    catch (error) {
      console.error("Erro inesperado ao atualizar tarefa:", error);
    }
  }
  const handleDelete = async () => {
    try {
      await deleteTask(task.id);
      toast.success("Tarefa excluída com sucesso!");
      window.location.reload();
    }
    catch (error) {
      console.error("Erro ao excluir tarefa:", error);
      toast.error("Erro ao excluir tarefa");
    }
  };

  const renderEditableField = (
    name: keyof EditTaskFormData,
    label: string,
    placeholder: string,
    fieldType: FormFieldType
  ) => (
    <div className="flex items-end gap-2">
      <div className="w-full">
        <CustomFormField
          control={form.control}
          name={name}
          label={label}
          placeholder={placeholder}
          fieldType={fieldType}
          disabled={!editableFields[name]}
          error={!!form.formState.errors[name]?.message}
        />
      </div>
      <FaPen className="h-auto w-auto text-gray-500 text-xl border rounded-lg p-2 cursor-pointer hover:text-gray-700"
        onClick={() => toggleEdit(name)}
      />
    </div>
  );

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {renderEditableField("title", "Título", "Insira o título da tarefa", FormFieldType.INPUT)}

          {renderEditableField(
            "description",
            "Descrição",
            "Insira a descrição da tarefa",
            FormFieldType.TEXTAREA
          )}

          {renderEditableField(
            "date",
            "Data de Conclusão",
            "Insira a data de conclusão",
            FormFieldType.DATE_PICKER
          )}

          {renderEditableField(
            "emergency",
            "Tarefa de Emergência",
            "",
            FormFieldType.CHECKBOX
          )}

          {task.interval && (
            renderEditableField(
              "interval",
              "Intervalo (dias)",
              "Insira o intervalo em dias",
              FormFieldType.INPUT
            )
          )}


          <div className="flex justify-center align-center ">
            <Button
              type="submit"
              className="w-full text-md md:text-lg bg-blue-900 text-white hover:bg-blue-800 transition-colors"
            >
              Editar Tarefa
            </Button>

            <Button
              type="button"
              onClick={handleDelete}
              className="w-fit ml-2 text-red-700 hover:text-red-800 hover:bg-gray-50 bg-white border border-gray-300"
            >
              <FaTrash className="h-auto w-auto"
                title="Excluir Tarefa"
                aria-label="Excluir Tarefa"
                width={20}
                height={20}
              />
            </Button>
          </div>


        </form>
      </Form>
    </div>
  );

}

export default EditTaskForm;