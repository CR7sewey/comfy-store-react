import comfFetch from "../utils/customAxios";
import Filters from "../Components/Filters";
import ProductsContainer from "../Components/ProductsContainer";
import PaginationContainer from "../Components/PaginationContainer";

export const loader = async ({ request }) => {
  const response = await comfFetch.get("/products");

  const products = response.data.data;
  const meta = response.data.meta;
  return { products, meta };
};

const Products = () => {
  return (
    <>
      <Filters />
      <ProductsContainer />
      <PaginationContainer />
    </>
  );
};

export default Products;
