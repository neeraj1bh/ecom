import React, { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Button from "../../components/Button";
import TextLink from "../../components/TextLink";
import Input, { PasswordInput } from "../../components/Input";
import useSignupForm from "~/forms/useSignupForm";
import toast from "react-hot-toast";
import SpinnerIcon from "~/assets/SpinnerIcon";

const Signup: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useSignupForm();

  const onSubmit = async () => {
    setLoading(true);
    const { name, email, password } = getValues();

    const response = await fetch("/api/email/send/route", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
    });
    const data = await response.json();
    if (!response.ok) {
      toast.error(data.message ?? "Failed to send email)");
      setLoading(false);
    } else {
      toast.success("Email sent successfully");
      setLoading(false);
      router.push(`/verify-email?email=${email}`);
    }
  };

  return (
    <>
      <Head>
        <title>Signup</title>
        <meta name="description" content="Signup | Ecom" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="mx-auto my-12 flex min-h-[600px] w-[550px] flex-col rounded-2xl border border-[#C1C1C1]  py-10">
        <h2 className="text-center text-3xl font-semibold text-black">
          Create your account
        </h2>

        <div className="mx-auto mt-10 w-full max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <Input
              id="name"
              autoComplete="name"
              placeholder="Enter your name"
              label="Name"
              error={errors.name?.message}
              {...register("name")}
            />
            <Input
              id="email"
              type="text"
              autoComplete="email"
              placeholder="Enter your email"
              label="Email"
              error={errors.email?.message}
              {...register("email")}
            />
            <PasswordInput
              id="password"
              autoComplete="current-password"
              placeholder="Add a password"
              label="Password"
              error={errors.password?.message}
              {...register("password")}
            />

            {loading ? (
              <Button className="flex items-center justify-center">
                <SpinnerIcon className="mr-4 animate-spin" />
                Creating Account
              </Button>
            ) : (
              <Button type="submit">Create Account</Button>
            )}
          </form>

          <TextLink href="/" regularText="Have an account?" linkText="LOGIN" />
        </div>
      </div>
    </>
  );
};

export default Signup;
