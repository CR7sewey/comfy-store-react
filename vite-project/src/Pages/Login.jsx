import React, { useState } from "react";
import { FormInput, SubmitBtn } from "../Components";
import { Form, Link } from "react-router-dom";
import comfFetch from "../utils/customAxios";
import { toast } from "react-toastify";
import { redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../features/user/userSlice";

const loginFields = [
  {
    type: "email",
    label: "Email",
    name: "email",
    defaultValue: "test@test.com",
    id: 1,
  },
  {
    type: "password",
    label: "Password",
    name: "password",
    defaultValue: "secret",
    id: 2,
  },
];

export const action =
  (store) =>
  async ({ request }) => {
    const dataForm = await request.formData(); // FormData Object
    const entries = [...dataForm.values()]; //.entries
    if (entries.includes("")) {
      return toast.error("You need to provide all the info");
    }
    const data = Object.fromEntries(dataForm);
    console.log(data);
    const datalogin = { identifier: data.email, password: data.password };

    try {
      const response = await comfFetch.post("/auth/local", datalogin);
      store.dispatch(loginUser(response.data));
      console.log(response);
      //toast.success(`welcome, ${response.username}`);
      return redirect("/");
    } catch (e) {
      toast.error(
        e?.response?.data?.error?.message ||
          "please double check your credentials"
      );
      return e;
    }
  };

const Login = () => {
  return (
    <section className="h-screen grid place-items-center">
      <Form
        method="POST"
        className="card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4"
      >
        <h4 className="text-center text-3xl font-bold">Login</h4>
        {loginFields.map((values, index) => {
          return <FormInput {...values} key={index} />;
        })}
        <div className="mt-4">
          <SubmitBtn text="login" />
        </div>
        <button className="btn btn-secondary btn-block">guest user</button>
        <p className="text-center">
          Not a member yet?
          <Link
            to="/register"
            className="ml-2 link link-hover link-primary capitalize"
          >
            register
          </Link>
        </p>
      </Form>
    </section>
  );
};

export default Login;
