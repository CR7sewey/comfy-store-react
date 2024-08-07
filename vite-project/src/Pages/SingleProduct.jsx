import React, { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import comfFetch from "../utils/customAxios";
import { formatPrice } from "../utils/useFunctions";
import { generateAmountOptions } from "../utils";
import { addItem } from "../features/cart/cartSlice";
import { useDispatch } from "react-redux";

const searchSingleProduct = (params) => {
  return {
    // check what is returning
    queryKey: ["singleProduct", params], // important bcs images string value doesnt change, so, only refetch/rerenders when search term changes
    queryFn: async () => {
      //const { id } = params;
      const data = await comfFetch.get(`/products/${params}`);
      const product = data.data.data;
      return { product };
    }, // needs to return a promise
    onError: (error) => {
      console.log(error);
    },
  };
};

export const loader =
  (queryClient) =>
  async ({ params }) => {
    const { id } = params;
    const { product } = await queryClient.ensureQueryData(
      searchSingleProduct(id)
    );
    console.log(product);
    return { product };
  };

const SingleProduct = () => {
  const dispatch = useDispatch();
  const { product } = useLoaderData();
  const { image, title, price, description, colors, company } =
    product.attributes;

  console.log(colors, "aqui");
  const [someAtribs, setSomeAtribs] = useState({
    productColor: colors[0] || "",
    amount: 1,
  });

  const cartProduct = {
    cartID: product.id + someAtribs.productColor,
    productID: product.id,
    image,
    title,
    price,
    amount: someAtribs.amount,
    productColor: someAtribs.productColor,
    company,
  };

  const dollarsAmount = formatPrice(price);
  const optionsAmounts = generateAmountOptions(5);

  const handleChange = (e, thing) => {
    setSomeAtribs({ ...someAtribs, [e.target.name]: thing });
    console.log(someAtribs);
  };

  return (
    <section>
      <div className="text-md breadcrumbs">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
        </ul>
      </div>
      <div className="mt-6 grid gap-y-8 lg:grid-cols-2  lg:gap-x-16">
        <img
          src={image}
          alt={title}
          className="w-96 h-96 object-cover rounded-lg lg:w-full  "
        />
        <div>
          <h1 className="capitalize text-3xl font-bold">{title}</h1>
          <h4 className="text-xl text-neutral-content font-bold mt-2">
            {company}
          </h4>

          <p className="mt-3 text-xl">{dollarsAmount}</p>

          <p className="mt-6 leading-8">{description}</p>

          <div className="mt-6">
            <h4 className="text-md font-medium tracking-wider capitalize">
              Colors
            </h4>
            <div className="mt-2">
              {colors.map((color) => {
                return (
                  <button
                    key={color}
                    type="button"
                    className={`badge  w-6 h-6 mr-2  ${
                      color === someAtribs.productColor &&
                      "border-2 border-secondary"
                    }`}
                    style={{ backgroundColor: color }}
                    name="productColor"
                    onClick={(e) => handleChange(e, color)}
                  />
                );
              })}
            </div>
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <h4 className="text-md font-medium tracking-wider capitalize">
                amount
              </h4>
            </label>
            <select
              className="select select-secondary select-bordered select-md"
              name="amount"
              value={someAtribs.amount}
              onChange={(e) => handleChange(e, parseInt(e.target.value))}
            >
              {optionsAmounts.map((element) => {
                return element;
              })}
            </select>
          </div>
          <div className="mt-10 ">
            <button
              className="btn btn-secondary btn-md"
              onClick={() => dispatch(addItem(cartProduct))}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SingleProduct;
