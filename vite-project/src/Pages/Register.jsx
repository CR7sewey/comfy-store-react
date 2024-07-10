import React from "react";
import { Form, Link } from "react-router-dom";
import { FormInput, SubmitBtn } from "../Components";
import { toast } from "react-toastify";
import axios from "axios";
import { redirect } from "react-router-dom";
import comfFetch from "../utils/customAxios";

const registerFields = [
  {
    type: "email",
    label: "Email",
    name: "email",
    //defaultValue: "test@test.com",
    id: 1,
  },
  {
    type: "username",
    label: "Username",
    name: "username",
    //defaultValue: "teste",
    id: 2,
  },
  {
    type: "password",
    label: "Password",
    name: "password",
    //defaultValue: "secret",
    id: 3,
  },
];

export const action = async ({ request }) => {
  const dataForm = await request.formData(); // FormData Object
  const entries = [...dataForm.values()]; //.entries
  if (entries.includes("")) {
    return toast.error("You need to provide all the info");
  }
  const data = Object.fromEntries(dataForm);
  try {
    const response = await comfFetch.post("/auth/local/register", data);
    toast.success(`You are registered, ${data.username}`);
    return redirect("/");
  } catch (e) {
    toast.error(
      e?.response?.data?.error?.message ||
        "please double check your credentials"
    );
    return e;
  }
};

const Register = () => {
  return (
    <section className="h-screen grid place-items-center">
      <Form
        method="POST"
        className="card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4"
      >
        <h4 className="text-center text-3xl font-bold">Register</h4>
        {registerFields.map((values, index) => {
          return <FormInput {...values} key={index} />;
        })}
        <div className="mt-4">
          <SubmitBtn text="register" />
        </div>
        <p className="text-center">
          Already a member?
          <Link
            to="/login"
            className="ml-2 link link-hover link-primary capitalize"
          >
            login
          </Link>
        </p>
      </Form>
    </section>
  );
};

export default Register;
