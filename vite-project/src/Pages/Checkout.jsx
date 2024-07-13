import React from "react";
import SectionTitle from "../Components/SectionTitle";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartTotals from "../Components/CartTotals";
import { redirect } from "react-router-dom";
import CheckoutForm from "../Components/CheckoutForm";
import { toast } from "react-toastify";

export const loader = (store) => {
  return async () => {
    const user = store.getState().userState.user;
    if (!user) {
      toast.warn("Please login to access the checkout page.");
      return redirect("/login");
    }
    return null;
  };
};

const Checkout = () => {
  //const user = useSelector((state) => state.userState.user);
  const numItemsInCart = useSelector((state) => state.cartState.numItemsInCart);

  /*if (!user) {
    redirect("/login");
  }*/

  if (numItemsInCart === 0) {
    return <SectionTitle text="Your cart is empty" />;
  }

  return (
    <div>
      <SectionTitle text="Place Your Order" />
      <div className="mt-8 grid gap-8  md:grid-cols-2 items-start">
        <CheckoutForm />
        <CartTotals />
      </div>
    </div>
  );
};

export default Checkout;
