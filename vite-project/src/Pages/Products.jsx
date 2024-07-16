import comfFetch from "../utils/customAxios";
import Filters from "../Components/Filters";
import ProductsContainer from "../Components/ProductsContainer";
import PaginationContainer from "../Components/PaginationContainer";

const allProductsQuery = (queryParams) => {
  console.log("Sera que esotu aqui");
  const { search, category, company, sort, price, shipping, page } =
    queryParams;
  return {
    // check what is returning
    queryKey: [
      "products",
      search ?? "",
      category ?? "all",
      company ?? "all",
      sort ?? "a-z",
      price ?? 100000,
      shipping ?? false,
      page ?? 1,
    ],
    queryFn: async () => {
      //const { id } = params;
      const response = await comfFetch.get("/products", {
        params: queryParams,
      });
      console.log(response, "this is a repsonse");
      const products = response.data.data;
      const meta = response.data.meta;

      return { products, meta, params: queryParams };
    }, // needs to return a promise
    onError: (error) => {
      console.log(error);
    },
  };
};

export const loader = (queryClient) => {
  async ({ request }) => {
    const url = new URL(request.url);
    // url.searchParams // object of type : URLSearchParams
    console.log(url, url.searchParams);
    const params = Object.fromEntries([...url.searchParams.entries()]); // .entries() -> [[a:1],[b:2]]
    console.log(Object.entries(params), "estou nos products");

    const response = await queryClient.ensureQueryData(
      allProductsQuery(params)
    );

    /*const response = await comfFetch.get("/products", { params });
     */
    const products = response.data.data;
    const meta = response.data.meta;
    console.log(meta, "isto é meta");
    return {
      products,
      meta,
      params,
    };
  };
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
