import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import toast from "react-hot-toast";
import type { LikedCategory } from "~/interfaces/dashboard";
import Items from "./Items";
import Spinner from "~/components/Spinner";
import { CATERGORIES_PER_PAGE } from "./constants";

const CategoriesList: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<LikedCategory[]>([]);
  const [liked, setLiked] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState<number>(0);

  const userData = localStorage.getItem("userData");
  const { id: userId } = userData ? JSON.parse(userData) : null;

  useEffect(() => {
    fetchData(currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = async (page: number) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/category/route`, {
        method: "POST",
        body: JSON.stringify({
          userId,
          limit: CATERGORIES_PER_PAGE,
          offset: page * CATERGORIES_PER_PAGE,
        }),
      });

      const {
        categories: newCategories,
        likedCategories,
        totalPages: newTotalPages,
      } = await response.json();
      if (response.ok) {
        if (totalPages !== newTotalPages) {
          setTotalPages(newTotalPages);
        }
        setCategories(newCategories);
        setLiked(likedCategories);
      } else {
        toast.error("Error fetching liked categories");
      }
      setLoading(false);
    } catch (error) {
      toast.error("Something went wrong");
      setLoading(false);
    }
  };

  const handlePageClick = async (selected: number) => {
    setCurrentPage(selected);
    console.log("this ran");
    await fetchData(selected);
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <Items currentItems={categories} liked={liked} setLiked={setLiked} />
      )}
      {totalPages > 1 && (
        <div className="mt-20 flex space-x-4">
          <button
            className="font-semibold"
            onClick={() => {
              handlePageClick(0);
            }}
          >
            {"<<"}
          </button>
          <ReactPaginate
            breakLabel="..."
            nextLabel=" >"
            onPageChange={({ selected }) => handlePageClick(selected)}
            pageRangeDisplayed={7}
            pageCount={totalPages}
            previousLabel="< "
            forcePage={currentPage}
            marginPagesDisplayed={0}
            activeClassName="!text-black"
            pageClassName="text-gray-500"
            className="flex space-x-4 font-semibold"
          />
          <button
            className="font-semibold"
            onClick={() => {
              handlePageClick(totalPages - 1);
            }}
          >
            {">>"}
          </button>
        </div>
      )}
    </>
  );
};

export default CategoriesList;
