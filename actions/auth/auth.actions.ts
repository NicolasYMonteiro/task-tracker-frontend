import { SignInSchema } from "schemas/Sign-In-Schema";
import { formSchema } from "schemas/sign-up-schema";

export async function signIn(formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const validatedFields = SignInSchema.safeParse({ email, password });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Preencha todos os campos corretamente.",
            error: true,
        };
    }
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/user/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: 'include',
            body: JSON.stringify({ email, password }),
        });

        const responseBody = await response.json();

        if (!response.ok) {
            const message = responseBody?.message ?? "Erro ao fazer login";
            return { error: true, message };
        }

        return {
            error: false,
            message: "Login realizado com sucesso",
            user: responseBody.user,
        };
    } catch (error: unknown) {
        console.error("Erro ao fazer login:", error);
        return {
            error: true,
            message: "Erro inesperado no login",
        };
    }

}

export async function signUp(formData: FormData) {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string; 

    const validatedFields = formSchema.safeParse({
        name,
        email,
        password,
        confirmPassword,
    });


    if (!validatedFields.success) {
        console.log("Erro de validação:", validatedFields.error.flatten().fieldErrors);
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Preencha todos os campos corretamente.",
            error: true,
        };
    }

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/user/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: 'include',
            body: JSON.stringify({ name, email, password }),
        });

        const responseBody = await response.json();

        if (!response.ok) {
            const message = responseBody?.message ?? "Erro ao fazer cadastro";
            return { error: true, message };
        } else {
            window.location.href = "/home";
        }

        return {
            error: false,
            message: "Cadastro realizado com sucesso",
            user: responseBody.user,
        };
    } catch (error: unknown) {
        console.error("Erro ao fazer cadastro:", error);
        return {
            error: true,
            message: "Erro inesperado no cadastro",
        };
    }
}

