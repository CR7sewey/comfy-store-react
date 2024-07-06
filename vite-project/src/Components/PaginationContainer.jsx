import React from "react";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";

const PaginationContainer = () => {
  const { meta } = useLoaderData();
  const { search, pathname } = useLocation();
  const navigate = useNavigate();
  console.log(navigate);
  console.log(meta, "Pagination container");
  const { pageCount, page } = meta.pagination;
  const pages = Array.from({ length: pageCount }, (_, page) => {
    return page + 1;
  });
  // create Array

  console.log(page, pages[pages.length - 1]);

  if (pageCount < 2) {
    return null;
  }

  const handlePageChange = (pageNum) => {
    if (pageNum > pages[pages.length - 1]) {
      pageNum = pages[pages.length - 1];
    }
    if (pageNum < 1) {
      pageNum = 1;
    }
    const search2 = new URLSearchParams(search);
    search2.set("page", pageNum);
    const new_url = `${pathname}?${search2.toString()}`;
    navigate(new_url);
  };

  return (
    <div className="mt-16 flex justify-end">
      <div className="join">
        <button
          className="btn btn-xs sm:btn-md join-item"
          onClick={() => handlePageChange(page - 1)}
        >
          Prev
        </button>
        {pages.map((values) => {
          return (
            <button
              className={
                values === page
                  ? `bg-base-300 border-base-300`
                  : `btn btn-xs sm:btn-md border-none join-item`
              }
              key={values}
              onClick={() => handlePageChange(values)}
            >
              {values}
            </button>
          );
        })}
        <button
          className="btn btn-xs sm:btn-md join-item"
          onClick={() => handlePageChange(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PaginationContainer;
