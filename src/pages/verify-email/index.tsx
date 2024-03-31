import { useSearchParams } from "next/navigation";
import React from "react";
import Verify from "~/components/Verify";

const VerifyEmail = () => {
  const searchParams = useSearchParams();

  const name = searchParams.get("name") ?? "";
  const email = searchParams.get("email") ?? "";
  const password = searchParams.get("password") ?? "";

  return <Verify name={name} email={email} password={password} />;
};

export default VerifyEmail;
