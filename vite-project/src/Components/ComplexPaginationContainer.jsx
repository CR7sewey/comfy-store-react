import React, { useEffect, useState } from "react";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";

function refactorArray(array, subarrayLength) {
  let result = [];
  for (let i = 0; i < array.length; i += subarrayLength) {
    result.push(array.slice(i, i + subarrayLength));
  }
  return result;
}

const pageSlider = (pages, page) => {
  if (pages.length <= 10) {
    return pages;
  }

  const new_pages_array = refactorArray(pages, 10);
  //console.log(new_pages_array.length, "legn");

  let shown_arr = [];
  new_pages_array.forEach((values) => {
    if (values.includes(page)) {
      shown_arr = [...values];
      return;
    }
  });
  //console.log(shown_arr, "show");
  return shown_arr;
};

const ComplexPaginationContainer = () => {
  const { meta } = useLoaderData();
  const { search, pathname } = useLocation();

  const navigate = useNavigate();

  console.log(meta, "meta");

  const { pageCount, page } = meta.pagination;
  const pages = Array.from({ length: pageCount }, (_, page) => {
    return page + 1;
  });

  const [pages_2, setPages_2] = useState(pageSlider(pages, page));

  const handlePageChange = (pageNum) => {
    console.log("aqui ze", pageNum);
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

  //console.log(pages, "complex");

  if (pageCount < 2) {
    return null;
  }

  return (
    <div className="mt-16 flex justify-end">
      <div className="join">
        <button
          className="btn btn-xs sm:btn-md join-item"
          onClick={() => handlePageChange(page - 1)}
        >
          Prev
        </button>
        {pages_2.map((values) => {
          console.log(values === page, values, page);
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

export default ComplexPaginationContainer;

/*
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

export default PaginationContainer;*/
