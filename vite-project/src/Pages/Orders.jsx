import React from "react";
import { toast } from "react-toastify";
import { redirect, useLoaderData } from "react-router-dom";
import comfFetch from "../utils/customAxios";
import SectionTitle from "../Components/SectionTitle";
import OrdersList from "../Components/OrdersList";
import PaginationContainer from "../Components/PaginationContainer";
import ComplexPaginationContainer from "../Components/ComplexPaginationContainer";

export const loader = (store) => {
  return async ({ request }) => {
    const user = store.getState().userState.user;
    if (!user) {
      toast.warn("Please login to access the orders page.");
      return redirect("/login");
    }
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]); // for when there is some pagination
    console.log(params, "params");

    try {
      const response = await comfFetch.get("/orders", params, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      return { orders: response.data.data, meta: response.data.meta };
    } catch (e) {
      toast.error(
        e?.response?.data?.error?.message ||
          "there was an error accessing your order"
      );

      if (e?.response?.status === 401 || 403) {
        return redirect("/login");
      }
      return e;
    }
  };
};

const Orders = () => {
  const { meta } = useLoaderData();
  if (meta.pagination.total < 1) {
    return <SectionTitle text="Please make an order" />;
  }

  return (
    <>
      <SectionTitle text="Your Orders" />
      <OrdersList />
      <ComplexPaginationContainer />
    </>
  );
};

export default Orders;
