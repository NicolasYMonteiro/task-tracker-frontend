import SignUpForm from "@components/form/auth-form/auth-signUp-form";
import Image from 'next/image';

const SignUp = () => {
    return (
        <section className="relative min-h-screen flex items-center justify-center px-2">
            <SignUpForm />

        </section>
    );
}

export default SignUp;