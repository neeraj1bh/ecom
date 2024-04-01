import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import LogoutIcon from "~/assets/LogoutIcon";
import { Pagination } from "./Pagination";
import type { LikedCategory } from "~/interfaces/dashboard";

const Dashboard: React.FC = () => {
  const router = useRouter();
  const [category, setCategories] = useState<LikedCategory[]>([]);
  const [liked, setLiked] = useState<number[]>([]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fetchData();
  }, []);

  const fetchData = async () => {
    const userData = localStorage.getItem("userData");
    const { id: userId } = userData ? JSON.parse(userData) : null;

    try {
      const [response, categoryResponse] = await Promise.all([
        fetch("/api/category/route", { method: "GET" }),
        fetch(`/api/selected-category/${userId}/route`, {
          method: "POST",
          body: JSON.stringify({ userId }),
        }),
      ]);

      if (response.ok) {
        const { res } = await response.json();
        setCategories(res);
        if (categoryResponse.ok) {
          const { res: categoryData } = await categoryResponse.json();

          const liked = categoryData.map(
            ({ categoryId }: { categoryId: any }) => categoryId,
          );
          setLiked(liked);
        } else {
          console.error("Error fetching category liked");
        }
      } else {
        console.error("Error fetching liked");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const logout = async () => {
    try {
      localStorage.removeItem("userData");
      router.push("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
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
            <Pagination category={category} liked={liked} setLiked={setLiked} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
