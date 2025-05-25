import SignInForm from '@components/form/auth-signIn-form';
import Image from 'next/image';

const SignIn = () => {

  return (
    <section className="relative min-h-screen flex items-center justify-center px-2">
      <div className="hidden md:block absolute inset-0 -z-10">
        <Image
          src="/greciaFundo.png"
          alt="Templo Grego"
          fill
          className="object-cover"
          priority
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-black/15 via-black/5 to-black/15" />
      <SignInForm />

    </section>


  );

}

export default SignIn;