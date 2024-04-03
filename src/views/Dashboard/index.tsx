import React from "react";
import { useRouter } from "next/navigation";

import LogoutIcon from "~/assets/LogoutIcon";
import CategoriesList from "./CategoriesList";
import toast from "react-hot-toast";
import Head from "next/head";

const Dashboard: React.FC = () => {
  const router = useRouter();

  const logout = async () => {
    try {
      localStorage.removeItem("userData");
      router.push("/");
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <>
      <Head>
        <title>Dashboard</title>
        <meta name="description" content="Dashboard | Ecom" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="relative">
        <div className="absolute right-0 top-0 mr-10">
          <button onClick={logout}>
            <LogoutIcon className="cursor-pointer rounded-full bg-gray-200 p-1 hover:bg-gray-300" />
          </button>
        </div>

        <div className="mx-auto my-12 flex h-[600px] w-[500px] flex-col rounded-2xl border  border-[#C1C1C1]">
          <div className="mx-auto my-10 flex flex-col justify-center">
            <p className="text-center text-3xl font-semibold leading-9 tracking-tight text-gray-900">
              Please mark your interests!
            </p>
            <p className="mt-1 text-center text-base	font-normal">
              We will keep you notified
            </p>
            <p className="mt-12 text-xl font-medium">My saved interests!</p>
            <div className="mt-4">
              <CategoriesList />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
