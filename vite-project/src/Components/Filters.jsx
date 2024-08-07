import React from "react";
import { Form, Link } from "react-router-dom";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";
import FormRange from "./FormRange";
import FormCheckbox from "./FormCheckbox";
import { useLoaderData } from "react-router-dom";

const Filters = () => {
  const { meta, params } = useLoaderData();
  const { search, category, company, order, price } = params;

  // GET
  return (
    <Form className="bg-base-200 rounded-md px-8 py-4 grid gap-x-4  gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center">
      <FormInput
        type="search"
        label="Search Product"
        name="search"
        size="input-sm"
        defaultValue={search}
      />
      <FormSelect
        label="Select Category"
        name="category"
        list={meta.categories}
        size="select-sm"
        defaultValue={category}
      />
      <FormSelect
        label="Select Company"
        name="company"
        list={meta.companies}
        size="select-sm"
        defaultValue={company}
      />
      <FormSelect
        label="Sort By"
        name="order"
        list={["a-z", "z-a", "high", "low"]}
        size="select-sm"
        defaultValue={order}
      />

      <FormRange
        name="price"
        label="select price"
        size="range-sm"
        price={price}
      />
      <FormCheckbox
        name="shipping"
        label="free shipping"
        size="checkbox-sm"
        defaultValue=""
      />
      <button type="submit" className="btn btn-primary btn-sm">
        search
      </button>
      <Link to="/products" className="btn btn-accent btn-sm">
        reset
      </Link>
    </Form>
  );
};

export default Filters;
