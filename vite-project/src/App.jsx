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
        loader: landingLoader,
      },
      {
        path: "products",
        element: <Products />,
        loader: allProducts,
      },
      {
        path: "products/:id",
        element: <SingleProduct />,
        loader: singleProduct,
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
        action: checkoutForm(store),
      },
      {
        path: "orders",
        element: <Orders />,
        loader: ordersUser(store),
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
      <RouterProvider router={router} />
    </>
  );
};
export default App;
