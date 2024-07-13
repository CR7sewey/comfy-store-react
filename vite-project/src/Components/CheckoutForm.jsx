import { Form } from "react-router-dom";
import FormInput from "./FormInput";
import SubmitBtn from "./SubmitBtn";
import { toast } from "react-toastify";
import comfFetch from "../utils/customAxios";
import { formatPrice } from "../utils/useFunctions";
import { clearCart } from "../features/cart/cartSlice";
import { redirect } from "react-router-dom";

const labs = [
  { label: "First Name", name: "firstname", type: "text" },
  { label: "Address", name: "address", type: "text" },
];

export const action = (store) => {
  return async ({ request }) => {
    const dataForm = await request.formData(); // FormData Object
    const entries = [...dataForm.values()]; //.entries
    if (entries.includes("")) {
      return toast.error("You need to provide all the info");
    }
    const data = Object.fromEntries(dataForm);
    console.log(data);
    const { cartItems, orderTotal, numItemsInCart } =
      store.getState().cartState; // aceder ao state sem ser com o useSelect no hook

    const info = {
      address: data.address,
      cartItems: cartItems,
      chargeTotal: orderTotal,
      name: data.firstname,
      numItemsInCart,
      orderTotal: formatPrice(orderTotal),
    };

    const user = store.getState().userState;

    try {
      const response = await comfFetch.post(
        "/orders",
        { data: info },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      store.dispatch(clearCart());
      toast.success("order placed successfully");
      return redirect("/orders");
    } catch (e) {
      toast.error(
        e?.response?.data?.error?.message ||
          "there was an error placing your order"
      );
      return e;
    }
  };
};

const CheckoutForm = () => {
  return (
    <Form method="POST" className="flex flex-col gap-y-4">
      <h4 className="font-medium text-xl">Shipping Information</h4>
      <FormInput {...labs[0]} />
      <FormInput {...labs[1]} />
      <div className="mt-4">
        <SubmitBtn text="Place Your Order" />
      </div>
    </Form>
  );
};

export default CheckoutForm;
