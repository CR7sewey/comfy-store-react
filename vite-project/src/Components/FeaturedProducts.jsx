import React from "react";
import { Link } from "react-router-dom";
import SectionTitle from "./SectionTitle";
import ProductsGrid from "./ProductsGrid";

const FeaturedProducts = ({ products }) => {
  console.log(products, "feat");
  return (
    <>
      <div className="pt-24">
        <SectionTitle text="featured products" />
        <ProductsGrid />
      </div>
    </>
  );
};

export default FeaturedProducts;
