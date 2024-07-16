import React from "react";
import Hero from "../Components/Hero";
import comfFetch from "../utils/customAxios";
import { useLoaderData } from "react-router-dom";
import FeaturedProducts from "../Components/FeaturedProducts";
import { useQuery } from "@tanstack/react-query";

const searchProducts = () => {
  return {
    queryKey: ["featuredProducts"],
    queryFn: async () => {
      const response = await comfFetch.get("/products?featured=true");
      return { products: response.data.data };
    },
    onError: (error) => {
      console.log(error);
    },
  };
};

export const loader = (queryClient) => async () => {
  const { products } = await queryClient.ensureQueryData(searchProducts());
  return { products };
};

/*
export const loader = (client) => async () => {
  try {
    const data = await comfFetch.get("/products?featured=true");
    const products = data.data.data;
    return { products };
  } catch (e) {
    console.log(e);
    return e;
  }
};*/

const Landing = () => {
  const { products } = useQuery(searchProducts());
  console.log(products, "akjdasknaakjkja");

  return (
    <>
      <Hero />
      <FeaturedProducts />
    </>
  );
};

export default Landing;
