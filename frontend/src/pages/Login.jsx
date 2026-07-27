import Logo from "../components/auth/Logo";
import LoginForm from "../components/auth/LoginForm";
import LoginIllustration from "../components/auth/LoginIllustration";

const Login = () => {
  return (
    <div className="min-h-screen bg-slate-50">

      <div className="mx-auto flex min-h-screen max-w-7xl items-center justify-between px-8">

        {/* Left */}

        <div className="hidden w-1/2 lg:block">
          <Logo />
          <div className="mt-16">
            <LoginIllustration />
          </div>
        </div>

        {/* Right */}

        <div className="flex w-full justify-center lg:w-1/2">
          <LoginForm />
        </div>

      </div>

    </div>
  );
};

export default Login;