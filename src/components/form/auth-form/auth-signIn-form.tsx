"use client";

import { Form } from "@components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomFormField, { FormFieldType } from "@components/ui/custom-form-field";
import * as z from "zod";
import { Button } from "@components/ui/button";
import Link from "next/link";
import { signIn } from "@actions/auth/auth.actions";
import { toast } from "react-toastify";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { SignInSchema } from "schemas/Sign-In-Schema";
import router from "next/router";

type SignInFormData = z.infer<typeof SignInSchema>;

const SignInForm = () => {
    const [isLoading, setIsLoading] = useState(false);


    const form = useForm<SignInFormData>({
        resolver: zodResolver(SignInSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (data: SignInFormData) => {
        setIsLoading(true);

        const formData = new FormData();
        formData.append("email", data.email);
        formData.append("password", data.password);

        try {
            const result = await signIn(formData);

            if (result?.error) {
                toast.error(result.message || "Erro ao fazer login");
                return;
            }
            toast.success(result?.message || "Login realizado com sucesso");
            window.location.href = "/sign-in";
        } catch (error) {
            console.error("Erro inesperado ao criar conta:", error);
            form.setError("root", { message: "Erro inesperado ao criar conta" });
        } finally {
            setIsLoading(false);
            router.push("/home");
        }
    };

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
                        type="password"
                        placeholder="Insira sua senha"
                        fieldType={FormFieldType.INPUT}
                        error={!!form.formState.errors.password?.message}
                    />
                    <Button
                        type="submit"
                        className="w-full text-md md:text-lg bg-blue-900 text-white hover:bg-blue-800 transition-colors"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Processando...
                            </>
                        ) : (
                            "Entrar"
                        )}
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