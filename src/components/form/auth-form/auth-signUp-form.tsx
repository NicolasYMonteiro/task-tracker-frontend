"use client";

import { Form } from "@components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomFormField, { FormFieldType } from "@components/ui/custom-form-field";
import * as z from "zod";
import { Button } from "@components/ui/button";
import Link from "next/link";
import { formSchema } from "schemas/sign-up-schema";
import { signUp } from "@actions/auth/auth.actions";
import { toast } from "react-toastify";
import { useState } from "react";
import { Loader2 } from "lucide-react";

type SignUnFormData = z.infer<typeof formSchema>;

const SignUpForm = () => {
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<SignUnFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    const onSubmit = async (data: SignUnFormData) => {
        setIsLoading(true);

        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("email", data.email);
        formData.append("password", data.password);
        formData.append("confirmPassword", data.confirmPassword);

        try {
            const result = await signUp(formData);

            if (result?.error) {
                toast.error(result.message || "Erro ao fazer registro");
                return;
            }
            toast.success(result?.message || "Registro realizado com sucesso");
            window.location.href = "/sign-in";
        } catch (error) {
            console.error("Erro inesperado ao criar conta:", error);
            form.setError("root", { message: "Erro inesperado ao criar conta" });
        } finally {
            setIsLoading(false); // Desativa o estado de loading
        }
    };

    const fields: {
        name: keyof SignUnFormData;
        label: string;
        placeholder: string;
        fieldType: FormFieldType;
        type?: string;
    }[] = [
            { name: "name", label: "Nome", placeholder: "Insira seu nome", fieldType: FormFieldType.INPUT },
            { name: "email", label: "Email", placeholder: "Insira seu email", fieldType: FormFieldType.INPUT },
            { name: "password", label: "Senha", placeholder: "Insira sua senha", fieldType: FormFieldType.INPUT, type: "password" },
            { name: "confirmPassword", label: "Confirme a Senha", placeholder: "Confirme sua senha", fieldType: FormFieldType.INPUT, type: "password" },
        ];
    return (
        <div className="max-w-md w-full bg-white/90 backdrop-blur-md md:rounded-2xl md:shadow-xl md:border p-8">

            <h1 className="text-3xl font-serif font-bold text-blue-900 text-center mb-2 tracking-wide">
                Atlas Desenvolvimento
            </h1>
            <p className="italic text-lg text-brack text-center mb-6">
                “Conhece-te a ti mesmo” — Oráculo de Delfos
            </p>
            <h2 className="text-lg font-medium text-center mb-4 text-gray-800">
                Bem-vindo ao seu novo ciclo de crescimento
            </h2>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {fields.map((field) => (
                        <CustomFormField
                            key={field.name}
                            control={form.control}
                            name={field.name}
                            label={field.label}
                            placeholder={field.placeholder}
                            fieldType={field.fieldType}
                            type={field.type}
                            error={!!form.formState.errors[field.name]?.message}
                        />
                    ))}
                    <Button
                        type="submit"
                        className="w-full text-md md:text-lg bg-gradient-to-r bg-blue-900 text-white hover:brightness-110 transition-all duration-300 shadow-md shadow-yellow-900/40"
                        disabled={isLoading} // Desabilita o botão durante o loading
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Processando...
                            </>
                        ) : (
                            "Começar jornada"
                        )}
                    </Button>
                </form>
            </Form>
            <p className="text-sm text-center mt-4">
                Já possui uma conta?{" "}
                <Link href="/sign-in" className="text-blue-900 underline hover:text-yellow-900/90 transition-colors">
                    Clique aqui.
                </Link>
            </p>
        </div>
    );
}

export default SignUpForm;