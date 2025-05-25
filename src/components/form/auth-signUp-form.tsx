"use client";

import { Form } from "@components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomFormField, { FormFieldType } from "@components/ui/custom-form-field";
import * as z from "zod";
import { Button } from "@components/ui/button";
import Image from "next/image";
import Link from "next/link";

import { formSchema } from "schemas/sign-up-schema";

type SignUnFormData = z.infer<typeof formSchema>;

const SignUpForm = () => {

    const form = useForm<SignUnFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    const onSubmit = (data: SignUnFormData) => {
        console.log("Form submitted with data:", data);
    }
    const fields: {
        name: keyof SignUnFormData;
        label: string;
        placeholder: string;
        type: FormFieldType;
    }[] = [
            { name: "name", label: "Nome", placeholder: "Insira seu nome", type: FormFieldType.INPUT },
            { name: "email", label: "Email", placeholder: "Insira seu email", type: FormFieldType.INPUT },
            { name: "password", label: "Senha", placeholder: "Insira sua senha", type: FormFieldType.INPUT },
            { name: "confirmPassword", label: "Confirme a Senha", placeholder: "Confirme sua senha", type: FormFieldType.INPUT },
        ];
    return (
        <div className="relative min-h-screen flex items-center justify-center">
            <div className="hidden md:block absolute inset-0 -z-10">
                <Image
                    src="/greciaFundo.png"
                    alt="Templo Grego"
                    fill
                    className="object-cover"
                />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-black/15 via-black/5 to-black/15" />

            <div className="max-w-md w-full bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border p-8">

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
                                fieldType={field.type}
                                error={!!form.formState.errors[field.name]?.message}
                            />
                        ))}
                        <Button
                            type="submit"
                            className="w-full text-md md:text-lg bg-gradient-to-r bg-blue-900 text-white hover:brightness-110 transition-all duration-300 shadow-md shadow-yellow-900/40"
                        >
                            Começar jornada
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
        </div>
    );

}

export default SignUpForm;