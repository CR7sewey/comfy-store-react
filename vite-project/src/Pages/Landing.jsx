import React from "react";
import Hero from "../Components/Hero";
import comfFetch from "../utils/customAxios";
import { useLoaderData } from "react-router-dom";
import FeaturedProducts from "../Components/FeaturedProducts";

export const loader = (client) => async () => {
  try {
    const data = await comfFetch.get("/products?featured=true");
    const products = data.data.data;
    return { products };
  } catch (e) {
    console.log(e);
    return e;
  }
};

const Landing = () => {
  //const { products } = useLoaderData();
  //console.log(products);
  return (
    <>
      <Hero />
      <FeaturedProducts />
    </>
  );
};

export default Landing;
