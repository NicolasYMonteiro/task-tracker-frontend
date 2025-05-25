"use client";

import { Form } from "@components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomFormField, { FormFieldType } from "@components/ui/custom-form-field";
import * as z from "zod";
import { Button } from "@components/ui/button";
import Image from "next/image";
import Link from "next/link";

import { formSchema } from "schemas/Sign-In-Schema";

type SignInFormData = z.infer<typeof formSchema>;

const SignInForm = () => {

    const form = useForm<SignInFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = (data: SignInFormData) => {
        console.log("Form submitted with data:", data);
    }

    return (
        <div className="max-w-md w-full bg-white/90 backdrop-blur-md md:rounded-2xl md:shadow-xl md:border p-8">

            <h1 className="text-3xl font-serif text-blue-900 text-center mb-2 tracking-wide">
                Atlas Desenvolvimento
            </h1>
            <p className="italic text-sm text-gray-600 text-center mb-6">
                “Conhece-te a ti mesmo” — Oráculo de Delfos
            </p>
            <h2 className="text-lg font-medium text-center mb-4 text-gray-800">
                Acesse sua Conta
            </h2>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <CustomFormField
                        control={form.control}
                        name="email"
                        label="Email"
                        placeholder="Insira seu email"
                        fieldType={FormFieldType.INPUT}
                        error={!!form.formState.errors.email?.message}
                    />
                    <CustomFormField
                        control={form.control}
                        name="password"
                        label="Password"
                        placeholder="Insira sua senha"
                        fieldType={FormFieldType.INPUT}
                        error={!!form.formState.errors.password?.message}
                    />
                    <Button
                        type="submit"
                        className="w-full text-md md:text-lg bg-blue-900 text-white hover:bg-blue-800 transition-colors"
                    >
                        Entrar
                    </Button>
                </form>
            </Form>

            <p className="text-sm text-center mt-4">
                Ainda não tem uma conta?{" "}
                <Link href="/sign-up" className="text-blue-800 underline hover:text-blue-600 transition-colors">
                    Clique aqui.
                </Link>
            </p>
        </div>
    );

}

export default SignInForm;