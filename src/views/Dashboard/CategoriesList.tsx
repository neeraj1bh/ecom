import { type FC, useState } from "react";
import ReactPaginate from "react-paginate";
import type { LikedCategory, LikeProps } from "~/interfaces/dashboard";
import Items from "./Items";

const itemsPerPage = 6;

interface Props extends LikeProps {
  category: LikedCategory[];
}

const CategoriesList: FC<Props> = ({ category, liked, setLiked }) => {
  const [startItemIndex, setStartItemIndex] = useState(0);
  const [forcedPage, setForcedPage] = useState(0);
  const endItemIndex = startItemIndex + itemsPerPage;
  const currentItems = category.slice(startItemIndex, endItemIndex);
  const totalPages = Math.ceil(category.length / itemsPerPage);

  const handlePageClick = (selected: number) => {
    setStartItemIndex(selected * itemsPerPage);
  };

  return (
    <>
      <Items currentItems={currentItems} liked={liked} setLiked={setLiked} />
      <div className="mt-20 flex space-x-4">
        <button className="font-semibold" onClick={() => setForcedPage(0)}>
          {"<<"}
        </button>
        <ReactPaginate
          breakLabel="..."
          nextLabel=" >"
          onPageChange={({ selected }) => handlePageClick(selected)}
          pageRangeDisplayed={7}
          pageCount={totalPages}
          previousLabel="< "
          forcePage={forcedPage}
          marginPagesDisplayed={0}
          activeClassName="!text-black"
          pageClassName="text-gray-500"
          className="flex space-x-4 font-semibold"
        />
        <button
          className="font-semibold"
          onClick={() => setForcedPage(totalPages - 1)}
        >
          {">>"}
        </button>
      </div>
    </>
  );
};

export default CategoriesList;
