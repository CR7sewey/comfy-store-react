import React from "react";
import { useSelector } from "react-redux";
import SectionTitle from "../Components/SectionTitle";
import ProductsGrid from "../Components/ProductsGrid";
import CartItemsList from "../Components/CartItemsList";
import CartTotals from "../Components/CartTotals";
import { Link } from "react-router-dom";

const Cart = () => {
  const user = false;

  return (
    <div>
      <SectionTitle text="Shopping Cart" />
      <div className="mt-8 grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <CartItemsList />
        </div>
        <div className="lg:col-span-4 lg:pl-4">
          <CartTotals />
          {user.username ? (
            <Link to="/checkout" className="btn btn-primary btn-block mt-8">
              Proceed to checkout
            </Link>
          ) : (
            <Link to="/login" className="btn btn-primary btn-block mt-8">
              please login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
