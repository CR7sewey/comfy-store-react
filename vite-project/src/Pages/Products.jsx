import React from "react";
import comfFetch from "../utils/customAxios";
import { useLoaderData } from "react-router-dom";
import Filters from "../Components/Filters";

export const loader = async () => {
  const data = await comfFetch.get(
    "https://strapi-store-server.onrender.com/api/products"
  );
  console.log(data);
  return { products: data.data };
};

const Products = () => {
  const { products } = useLoaderData();
  console.log(products, "estes");
  return (
    <>
      <Filters />
    </>
  );
};

export default Products;
