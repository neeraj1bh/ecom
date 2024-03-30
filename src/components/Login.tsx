import React, { type FormEvent, useState } from "react";
import Button from "./Button";
import TextLink from "./TextLink";

const Login: React.FC = () => {
  const [passwordShown, setPasswordShown] = useState(false);

  function togglePasswordVisibility() {
    setPasswordShown(!passwordShown);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    console.log({ email, password });
  }

  return (
    <div className="mx-auto my-12 flex h-[600px] w-[550px] flex-col rounded-2xl border border-[#C1C1C1]">
      <div>
        <h2 className="mt-10 text-center text-3xl font-bold text-black">
          Login
        </h2>
        <p className="mt-6 text-center text-xl font-semibold text-black">
          Welcome back to ECOMMERCE
        </p>
        <p className="text-center text-base font-normal text-black">
          The next-gen business marketplace
        </p>
      </div>

      <div className="mx-auto mt-10 w-full max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="text-base font-normal leading-6 text-black"
            >
              Email
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="Enter"
                className="w-full rounded-md border-2 px-4 py-2 text-sm leading-6 text-black placeholder:text-gray-400"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="text-base font-normal leading-6 text-black"
            >
              Password
            </label>
            <div className="relative mt-2">
              <input
                id="password"
                name="password"
                type={passwordShown ? "text" : "password"}
                autoComplete="current-password"
                required
                placeholder="Enter"
                className="w-full rounded-md border-2 px-4 py-2 text-sm leading-6 text-black  placeholder:text-gray-400 "
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 p-2 text-sm font-medium underline hover:text-gray-500"
                onClick={togglePasswordVisibility}
              >
                {passwordShown ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <div>
            <Button type="submit">LOGIN</Button>
          </div>
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
