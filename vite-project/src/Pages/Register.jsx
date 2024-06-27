import React from "react";
import { Form, Link } from "react-router-dom";
import { FormInput, SubmitBtn } from "../Components";

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
