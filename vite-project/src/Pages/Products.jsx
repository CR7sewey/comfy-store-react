import comfFetch from "../utils/customAxios";
import Filters from "../Components/Filters";
import ProductsContainer from "../Components/ProductsContainer";
import PaginationContainer from "../Components/PaginationContainer";

export const loader = async ({ request }) => {
  const url = new URL(request.url);
  // url.searchParams // object of type : URLSearchParams
  console.log(url, url.searchParams);
  const params = Object.fromEntries([...url.searchParams.entries()]);
  console.log(Object.entries(params));
  const response = await comfFetch.get("/products", { params });

  const products = response.data.data;
  const meta = response.data.meta;
  return { products, meta, params };
};

/**
 *  const url = new URL(request.url); // we get the value from the URL from the submittted fomr (the name in the url when submitting the form)

    const searchTerm = url.searchParams.get("searchedValue") || "";
    await queryClient.ensureQueryData(fetchSearchedTerm(searchTerm));
    return { searchTerm };
 */
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
