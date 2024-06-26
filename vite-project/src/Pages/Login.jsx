import React from "react";
import { FormInput, SubmitBtn } from "../Components";
import { Form, Link } from "react-router-dom";

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
