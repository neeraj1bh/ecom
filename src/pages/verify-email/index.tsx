import { useSearchParams } from "next/navigation";
import React from "react";
import Verify from "~/views/Signup/Verify";

const VerifyEmail = () => {
  const searchParams = useSearchParams();

  const email = searchParams.get("email") ?? "";

  return <Verify email={email} />;
};

export default VerifyEmail;
