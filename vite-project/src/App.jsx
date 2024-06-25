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
} from "./Pages";

const App = () => {
  return (
    <>
      <h1 className="text-7xl font-bold underline">Tailwind project</h1>
      <About />
      <Cart />
      <Checkout />
      <HomeLayout />
      <Landing />
      <Login />
      <Orders />
      <Products />
      <Register />
      <SingleProduct />
    </>
  );
};
export default App;
