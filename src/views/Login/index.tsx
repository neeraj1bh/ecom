import React, { useEffect, useState } from "react";
import Button from "../../components/Button";
import TextLink from "../../components/TextLink";
import { useRouter } from "next/router";
import { useAuthenticated } from "~/hooks/useAuthenticated";
import Input, { PasswordInput } from "../../components/Input";
import useLoginForm from "~/forms/useLoginForm";
import toast from "react-hot-toast";
import SpinnerIcon from "~/assets/SpinnerIcon";

const Login: React.FC = () => {
  const router = useRouter();
  const isAuthenticated = useAuthenticated();
  const [loading, setLoading] = useState(false);

  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useLoginForm();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);

  const onSubmit = async () => {
    setLoading(true);
    const { email, password } = getValues();
    try {
      const response = await fetch("/api/login/route", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const { id, name } = data.message;

        localStorage.setItem(
          "userData",
          JSON.stringify({ id, name, email, isLoggedIn: true }),
        );
        router.push("/dashboard");
        toast.success(`Welcome back, ${name}!`);
      } else {
        toast.error(`Invalid credentials for ${email}`);
        localStorage.removeItem("userData");
      }
      setLoading(false);
    } catch (error) {
      console.error("Error logging in:", error);
      localStorage.removeItem("userData");
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto my-12 flex min-h-[600px] w-[550px] flex-col rounded-2xl border border-[#C1C1C1] py-10">
      <div>
        <h2 className="text-center text-3xl font-bold text-black">Login</h2>
        <p className="mt-6 text-center text-xl font-semibold text-black">
          Welcome back to ECOMMERCE
        </p>
        <p className="text-center text-base font-normal text-black">
          The next-gen business marketplace
        </p>
      </div>

      <div className="mx-auto mt-10 w-full max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="Enter"
            label="Email"
            error={errors.email?.message}
            {...register("email")}
          />

          <PasswordInput
            id="password"
            autoComplete="current-password"
            placeholder="Enter"
            label="Password"
            error={errors.password?.message}
            {...register("password")}
          />
          {loading ? (
            <Button className="flex items-center justify-center">
              <SpinnerIcon className="mr-4 animate-spin" />
              Logging In
            </Button>
          ) : (
            <Button type="submit">LOGIN</Button>
          )}
        </form>
        <hr className="mt-8 border-gray-300" />
        <TextLink
          href="/signup"
          regularText="Don't have an account?"
          linkText="SIGN UP"
        />
      </div>
    </div>
  );
};

export default Login;
