import React, { type FormEvent } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Button from "./Button";
import TextLink from "./TextLink";

const Signup: React.FC = () => {
  const router = useRouter();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    console.log({ name, email, password });
  }

  return (
    <>
      <Head>
        <title>Signup</title>
        <meta name="description" content="Signup | Ecom" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="mx-auto my-12 flex h-[600px] w-[550px] flex-col rounded-2xl border  border-[#C1C1C1]">
        <h2 className="mt-10 text-center text-3xl font-semibold text-black">
          Create your account
        </h2>

        <div className="mx-auto mt-10 w-full max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="name"
                className=" text-base font-normal leading-6 text-black"
              >
                Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  autoComplete="name"
                  required
                  placeholder="Enter"
                  className=" w-full rounded-md border-2 px-4 py-2 text-sm leading-6 text-black placeholder-gray-400"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className=" text-base font-normal leading-6 text-black"
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
                  className=" w-full rounded-md border-2 px-4 py-2 text-sm leading-6 text-black placeholder-gray-400"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className=" text-base font-normal leading-6 text-black"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  placeholder="Enter"
                  className=" w-full rounded-md border-2 px-4 py-2 text-sm leading-6 text-black placeholder-gray-400 "
                />
              </div>
            </div>

            <div>
              <Button type="submit">Create Account</Button>
            </div>
          </form>

          <TextLink href="/" regularText="Have an account?" linkText="LOGIN" />
        </div>
      </div>
    </>
  );
};

export default Signup;
