import React, { useState } from "react";
import ProductsGrid from "./ProductsGrid";
import SectionTitle from "./SectionTitle";
import ProductsList from "./ProductsList";
import { BsFillGridFill, BsList } from "react-icons/bs";
import { useLoaderData } from "react-router-dom";

const ProductsContainer = () => {
  const { meta } = useLoaderData();
  const [grid, setGrid] = useState(true);
  const [list, setList] = useState(false);

  const [totalProducts, setTotalProducts] = useState(meta.pagination.total);

  const setActiveStyles = () => {
    setGrid(!grid);
    setList(!list);
  };

  return (
    <>
      <div className="flex justify-between items-center mt-8 border-b border-base-300 pb-5">
        <h4 className="font-medium text-md">
          {totalProducts} product{totalProducts > 1 && "s"}
        </h4>
        <div className="flex gap-x-2">
          <button
            onClick={setActiveStyles}
            className={`text-xl btn btn-circle btn-sm ${
              grid === true
                ? "btn-primary text-primary-content"
                : "btn-ghost text-base-content"
            }`}
          >
            <BsFillGridFill />
          </button>
          <button
            onClick={setActiveStyles}
            className={`text-xl btn btn-circle btn-sm ${
              list === true
                ? "btn-primary text-primary-content"
                : "btn-ghost text-base-content"
            }`}
          >
            <BsList />
          </button>
        </div>
      </div>
      <div>
        {totalProducts === 0 ? (
          <h5 className="text-2xl mt-16">
            Sorry, no products matched your search...
          </h5>
        ) : grid === true ? (
          <ProductsGrid />
        ) : (
          <ProductsList />
        )}
      </div>
    </>
  );
};

export default ProductsContainer;
