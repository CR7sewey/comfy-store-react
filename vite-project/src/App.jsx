import ErrorElement from "./Components/ErrorElement";
import {
  About,
  Cart,
  Checkout,
  HomeLayout,
  Landing,
  Login,
  Orders,
  Products,
  Register,
  SingleProduct,
  Error,
} from "./Pages";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { loader as landingLoader } from "./Pages/Landing";
import { loader as singleProduct } from "./Pages/SingleProduct";
import { loader as allProducts } from "./Pages/Products";
import { loader as checkoutUser } from "./Pages/Checkout";
import { loader as ordersUser } from "./Pages/Orders";
import { action as registerUser } from "./Pages/Register";
import { action as loginUser } from "./Pages/Login";
import { action as checkoutForm } from "./Components/CheckoutForm";
import { store } from "./Store";
import { QueryClient } from "@tanstack/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
        errorElement: <ErrorElement />,
        loader: landingLoader(queryClient),
      },
      {
        path: "products",
        element: <Products />,
        loader: allProducts(queryClient),
      },
      {
        path: "products/:id",
        element: <SingleProduct />,
        loader: singleProduct(queryClient),
      },
      {
        path: "cart",
        element: <Cart />,
      },
      { path: "about", element: <About /> },
      {
        path: "checkout",
        element: <Checkout />,
        loader: checkoutUser(store),
        action: checkoutForm(store, queryClient),
      },
      {
        path: "orders",
        element: <Orders />,
        loader: ordersUser(store, queryClient),
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <Error />,
    action: loginUser(store),
  },
  {
    path: "/register",
    element: <Register />,
    errorElement: <Error />,
    action: registerUser,
  },
]);

const App = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
};
export default App;
