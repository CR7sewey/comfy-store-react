import React from "react";
import { toast } from "react-toastify";
import { redirect } from "react-router-dom";
import comfFetch from "../utils/customAxios";

export const loader = (store) => {
  return async ({ request }) => {
    const user = store.getState().userState.user;
    if (!user) {
      toast.warn("Please login to access the orders page.");
      return redirect("/login");
    }
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);
    console.log(params, "params");

    try {
      const response = await comfFetch.get("/orders", params, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      return response.data;
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
  return <div></div>;
};

export default Orders;
