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
import { FaPen } from "react-icons/fa";

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
    interval: false,
  });

  const toggleEdit = (field: keyof typeof editableFields) => {
    setEditableFields((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const form = useForm<EditTaskFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: task.title || "",
      description: task.description || "",
      date: new Date(task.date) || new Date(),
      emergency: task.emergency || false,
      interval: task.interval || 0,
    },
  });

  const onSubmit = (data: EditTaskFormData) => {
    console.log("Form submitted with data:", data);
  }

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

          {renderEditableField(
            "interval",
            "Intervalo (dias)",
            "Insira o intervalo em dias",
            FormFieldType.INPUT
          )}
          <Button
            type="submit"
            className="w-full text-md md:text-lg bg-blue-900 text-white hover:bg-blue-800 transition-colors"
          >
            Editar Tarefa
          </Button>
        </form>
      </Form>
    </div>
  );

}

export default EditTaskForm;