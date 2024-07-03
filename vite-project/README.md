# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Useful Project Resources

- [API DOCS](https://documenter.getpostman.com/view/18152321/2s9Xy5KpTi)

## 1 - Setup Vite and Tailwind

[Tailwind Docs](https://tailwindcss.com/docs/guides/vite)

- setup vite project

```sh
npm create vite@latest comfy-store -- --template react
cd comfy-store
```

- add tailwind

```sh
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

- rename to tailwind.config.cjs
- add following content

tailwind.config.cjs

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

- remove App.css
- delete contents of index.css
- delete contents of App.jsx
- change title

```js
const App = () => {
  return <div>App</div>;
};
export default App;
```

- Add the Tailwind directives to your CSS

index.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Tailwind directives are instructions that decide how Tailwind CSS creates the styles for your website. They control the global styles, component styles, and utility classes.

- start the project "npm run dev"
- setup first tailwind classes in App.jsx
- remove StrictMode

  App.jsx

```js
const App = () => {
  return <h1 className="text-7xl font-bold underline">Tailwind project</h1>;
};
export default App;
```

- [DaisyUI](https://daisyui.com/)

- add and configure daisyui to our project
- add TailwindCSS Typography plugin

```sh
npm i  -D daisyui@latest @tailwindcss/typography
```

tailwind.config.js

```js
{
 plugins: [require('@tailwindcss/typography'), require('daisyui')],
}
```

## Install All Libraries

```sh
npm i axios dayjs @reduxjs/toolkit @tanstack/react-query @tanstack/react-query-devtools react-icons react-redux react-router-dom react-toastify
```

## 2 - Create All Pages

- create pages directory
- create all pages and export from index.js
- About, Cart, Checkout, Error,
  HomeLayout, Landing, Login, Orders,
  Products, Register, SingleProduct
- import in app.jsx

pages/About.jsx

```js
const About = () => {
  return <h1 className="text-4xl">About</h1>;
};
export default About;
```

pages/index.js

```js
export { default as HomeLayout } from "./HomeLayout";
export { default as Landing } from "./Landing";
export { default as SingleProduct } from "./SingleProduct";
export { default as Products } from "./Products";
export { default as Cart } from "./Cart";
export { default as Error } from "./Error";
export { default as About } from "./About";
export { default as Login } from "./Login";
export { default as Register } from "./Register";
export { default as Checkout } from "./Checkout";
export { default as Orders } from "./Orders";
```

App.jsx

```js
import {
  HomeLayout,
  Landing,
  Error,
  Products,
  SingleProduct,
  Cart,
  About,
  Register,
  Login,
  Checkout,
  Orders,
} from "./pages";
```

## 3 - React Router

- configure react router
- setup initial route structure
  hint : look for nested UI (basically navbar)

### App.jsx

1. Import Dependencies:

   - Import necessary modules from the 'react-router-dom' library.

2. Create Router Configuration:

   - Use the `createBrowserRouter` function to set up a router configuration.
   - Define an array of route objects, each representing a different route in your application.
   - Configure routes for different paths, including components like `HomeLayout`, `Landing`, `Products`, etc.

3. Create Router Instance:

   - Create a router instance using the `createBrowserRouter` function and pass in the defined route configuration.

4. Define App Component:

   - Create a functional component named `App`.
   - Return a `RouterProvider` component and pass in the created router instance as a prop.

5. Export App Component:
   - Export the `App` component as the default export of the module.

App.jsx

```js
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "products/:id",
        element: <SingleProduct />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      { path: "about", element: <About /> },
      {
        path: "checkout",
        element: <Checkout />,
      },
      {
        path: "orders",
        element: <Orders />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <Error />,
  },
  {
    path: "/register",
    element: <Register />,
    errorElement: <Error />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};
export default App;
```

HomeLayout.jsx

```js
import { Outlet } from "react-router-dom";

const HomeLayout = () => {
  return (
    <>
      <nav>
        <span className="text-4xl text-primary">Comfy</span>
      </nav>
      <Outlet />
    </>
  );
};
export default HomeLayout;
```

## 4 - Error Page

- complete error page
- create two returns
- first for 404 errors
- second for all other errors
- log the error
- add option to navigate home

### Error.jsx

1. Import Dependencies:

   - Import the necessary modules `useRouteError` and `Link` from the 'react-router-dom' library.

2. Create Error Component:

   - Define a functional component named `Error`.
   - Inside the component, use the `useRouteError` hook to get information about the route error.
   - Check the status of the error using `error.status`.

3. Conditional Rendering for 404 Error:

   - If the error status is 404, render a `main` element with a grid layout and centered content.
   - Display a large "404" text, a title "Page not found," and a description.
   - Include a link back to the home page using the `Link` component.

4. Conditional Rendering for Other Errors:

   - If the error status is not 404, render a `main` element with a grid layout and centered content.
   - Display a text message indicating that there was an error.

5. Export Error Component:
   - Export the `Error` component as the default export of the module.

Error.jsx

```js
import { useRouteError, Link } from "react-router-dom";
const Error = () => {
  const error = useRouteError();
  console.log(error);
  if (error.status === 404)
    return (
      <main className="grid min-h-[100vh] place-items-center px-8 ">
        <div className="text-center">
          <p className="text-9xl font-semibold text-primary">404</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
            Page not found
          </h1>
          <p className="mt-6 text-lg leading-7 ">
            Sorry, we couldn’t find the page you’re looking for.
          </p>
          <div className="mt-10 ">
            <Link to="/" className="btn btn-secondary">
              Go back home
            </Link>
          </div>
        </div>
      </main>
    );

  return (
    <main className="grid min-h-[100vh] place-items-center px-8 ">
      <h4 className="text-center font-bold text-4xl">there was an error... </h4>
    </main>
  );
};
export default Error;
```

## 5 - Input Field Component

- create components folder with index.js
- in daisyui
- find Text input component
- more specifically "With form-control and labels"
- set it as component (in my case FormInput.jsx)
- decide on props
- export from index.js
- test in login

### FormInput.jsx

1. Create FormInput Component:

   - Define a functional component named `FormInput`.
   - The component accepts the following props: `label`, `name`, `type`, and `defaultValue`.

2. FormInput Structure:

   - Inside the component, return a `div` element with the class `form-control`, which provides styling for form inputs.
   - Within this `div`, create a `label` element with the class `label`.
   - Inside the `label`, use the `label-text` class to display the capitalized label text provided through the props.

3. Input Element:

   - After the `label`, create an `input` element.
   - Set the `type` attribute of the `input` element to the value provided through the `type` prop.
   - Set the `name` attribute of the `input` element to the value provided through the `name` prop.
   - Use the `defaultValue` prop to set the initial value of the input element.
   - Apply the `input` and `input-bordered` classes to the `input` element for styling.

4. Export FormInput Component:
   - Export the `FormInput` component as the default export of the module.

components/index.js

```js
export { default as FormInput } from "./FormInput";
```

FormInput.jsx

```js
const FormInput = ({ label, name, type, defaultValue }) => {
  return (
    <div className="form-control ">
      <label className="label">
        <span className="label-text capitalize">{label}</span>
      </label>
      <input
        type={type}
        name={name}
        defaultValue={defaultValue}
        className="input input-bordered "
      />
    </div>
  );
};
export default FormInput;
```

## 6 - Login Page Structure

- setup structure for login page (use complete project as reference)
- check for loading state and disable submit button
- setup submit button in a separate component
- add loading spinner

### SubmitBtn.jsx

- Import Dependencies:

  - Import `useNavigation` from `'react-router-dom'`.

- Create the `SubmitBtn` Component:

  - Define a functional component named `SubmitBtn`.
  - Accept a prop `text`.

  - Inside the component, use the `useNavigation()` hook to access navigation state.
  - Determine whether the form is submitting by checking if `navigation.state` is equal to `'submitting'`.

  - Return a `button` element with the following attributes:

    - Type set to `'submit'`.
    - Class set to `'btn btn-primary btn-block'`.
    - Disabled attribute set to the value of `isSubmitting`.

    - Inside the `button` element, use a conditional rendering:
      - If `isSubmitting` is true:
        - Render a `span` element with class `'loading loading-spinner'`.
        - Render the text `'sending...'`.
      - If `isSubmitting` is false:
        - Render the `text` prop if provided, otherwise render `'submit'`.

### Login.jsx

- Import Dependencies:

  - Import `FormInput` and `SubmitBtn` components from the `'../components'` directory.
  - Import `Form` and `Link` from `'react-router-dom'`.

- Create the `Login` Component:

  - Define a functional component named `Login`.

  - Return a `section` element with class `'h-screen grid place-items-center'`.

    - Inside the `section` element, create a `Form` element with the following attributes:

      - `method` set to `'post'`.
      - Class set to `'card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4'`.

      - Inside the `Form` element, create an `h4` element with class `'text-center text-3xl font-bold'` containing the text `'Login'`.

      - Use the `FormInput` component twice:

        - First, for an email input with type `'email'`, label `'email'`, name `'identifier'`, and defaultValue `'test@test.com'`.
        - Second, for a password input with type `'password'`, label `'password'`, name `'password'`, and defaultValue `'secret'`.

      - Create a `div` element with class `'mt-4'`.

        - Inside the `div` element, use the `SubmitBtn` component with a prop `text` set to `'login'`.

      - Create a `button` element with the following attributes:

        - Type set to `'button'`.
        - Class set to `'btn btn-secondary btn-block'`.
        - Text content set to `'guest user'`.

      - Create a `p` element with class `'text-center'`.

        - Inside the `p` element, display the text `'Not a member yet?'`.

        - Create a `Link` element with the following attributes:
          - `to` set to `'/register'`.
          - Class set to `'ml-2 link link-hover link-primary capitalize'`.
          - Text content set to `'register'`.

Login.jsx

```js
import { FormInput, SubmitBtn } from "../components";
import { Form, Link } from "react-router-dom";

const Login = () => {
  return (
    <section className="h-screen grid place-items-center">
      <Form
        method="post"
        className="card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4"
      >
        <h4 className="text-center text-3xl font-bold">Login</h4>
        <FormInput
          type="email"
          label="email"
          name="identifier"
          defaultValue="test@test.com"
        />
        <FormInput
          type="password"
          label="password"
          name="password"
          defaultValue="secret"
        />
        <div className="mt-4">
          <SubmitBtn text="login" />
        </div>
        <button type="button" className="btn btn-secondary btn-block">
          guest user
        </button>
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
```

SubmitBtn.jsx

```js
import { useNavigation } from "react-router-dom";
const SubmitBtn = ({ text }) => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <button
      type="submit"
      className="btn btn-primary btn-block"
      disabled={isSubmitting}
    >
      {isSubmitting ? (
        <>
          <span className="loading loading-spinner"></span>
          sending...
        </>
      ) : (
        text || "submit"
      )}
    </button>
  );
};
export default SubmitBtn;
```

## 7 - Register Page Structure

- setup structure for register page

### Register.jsx

- Import Dependencies:

  - Import `FormInput` and `SubmitBtn` components from the `'../components'` directory.
  - Import `Form` and `Link` from `'react-router-dom'`.

- Create the `Register` Component:

  - Define a functional component named `Register`.

  - Return a `section` element with class `'h-screen grid place-items-center'`.

    - Inside the `section` element, create a `Form` element with the following attributes:

      - `method` set to `'POST'`.
      - Class set to `'card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4'`.

      - Inside the `Form` element, create an `h4` element with class `'text-center text-3xl font-bold'` containing the text `'Register'`.

      - Use the `FormInput` component three times:

        - First, for a text input with type `'text'`, label `'username'`, and name `'username'`.
        - Second, for an email input with type `'email'`, label `'email'`, and name `'email'`.
        - Third, for a password input with type `'password'`, label `'password'`, and name `'password'`.

      - Create a `div` element with class `'mt-4'`.

        - Inside the `div` element, use the `SubmitBtn` component with a prop `text` set to `'register'`.

      - Create a `p` element with class `'text-center'`.

        - Inside the `p` element, display the text `'Already a member?'`.

        - Create a `Link` element with the following attributes:
          - `to` set to `'/login'`.
          - Class set to `'ml-2 link link-hover link-primary capitalize'`.
          - Text content set to `'login'`.

## Solution (8) - Register Page Structure

```js
import { FormInput, SubmitBtn } from "../components";
import { Form, Link } from "react-router-dom";

const Register = () => {
  return (
    <section className="h-screen grid place-items-center">
      <Form
        method="POST"
        className="card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4"
      >
        <h4 className="text-center text-3xl font-bold">Register</h4>
        <FormInput type="text" label="username" name="username" />
        <FormInput type="email" label="email" name="email" />
        <FormInput type="password" label="password" name="password" />
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
```

## 8 - Custom Class

- create custom class
- align content
- add to HomeLayout Outlet component

index.css

```css
@layer components {
  .align-element {
    @apply mx-auto max-w-6xl px-8;
  }
}
```

```js
<section className="align-element py-20">
  <Outlet />
</section>
```

## 9 - Header Component

- setup and render header component in HomeLayout
- add two links - Login and Register

### Header.jsx

- Import Dependencies:

  - Import `Link` from `'react-router-dom'`.

- Create the `Header` Component:

  - Define a functional component named `Header`.

  - Return a `header` element with classes `'bg-neutral py-2 text-neutral-content'`.

    - Inside the `header` element, create a `div` element with classes `'align-element flex justify-center sm:justify-end'`.

      - Inside the `div` element, create another `div` element with classes `'flex gap-x-6 justify-center items-center'`.

        - Use the `Link` component twice:

          - First, create a `Link` to `'/login'` with the following attributes:

            - Class set to `'link link-hover text-xs sm:text-sm'`.
            - Text content set to `'Sign in / Guest'`.

          - Second, create a `Link` to `'/register'` with the following attributes:
            - Class set to `'link link-hover text-xs sm:text-sm'`.
            - Text content set to `'Create an Account'`.

```js
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className=" bg-neutral py-2 text-neutral-content ">
      <div className="align-element flex justify-center sm:justify-end ">
        {/* USER */}
        {/* LINKS */}
        <div className="flex gap-x-6 justify-center items-center">
          <Link to="/login" className="link link-hover text-xs sm:text-sm">
            Sign in / Guest
          </Link>
          <Link to="/register" className="link link-hover text-xs sm:text-sm">
            Create an Account
          </Link>
        </div>
      </div>
    </header>
  );
};
export default Header;
```

## 10 - Navbar Structure

- create components/Navbar.jsx
- setup initial structure
- use Daisy navbar component
- "# responsive (dropdown menu on small screen, center menu on large screen)"
- import icons from react-icons
- render in HomeLayout.jsx

### Navbar.jsx

- Import Dependencies:

  - Import icons `BsCart3`, `BsMoonFill`, `BsSunFill`, and `FaBarsStaggered` from their respective packages.
  - Import `NavLink` from `'react-router-dom'`.

- Create the `Navbar` Component:

  - Define a functional component named `Navbar`.

  - Return a `nav` element with class `'bg-base-200'`.

    - Inside the `nav` element, create a `div` element with class `'navbar align-element '`.

      - Inside the first `div` element, create another `div` element with class `'navbar-start'`.

        - Create a `NavLink` to `'/'` with the following attributes:

          - Class set to `'hidden lg:flex btn btn-primary text-3xl items-center '`.

        - Create a `div` element with class `'dropdown'`.

          - Create a `label` element with `tabIndex={0}` and class `'btn btn-ghost lg:hidden'`.

          - Create a `ul` element with `tabIndex={0}` and class `'menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-200 rounded-box w-52'`.

      - Inside the second `div` element, create a `div` element with class `'navbar-center hidden lg:flex'`.

        - Create a `ul` element with class `'menu menu-horizontal '`.

      - Inside the third `div` element, create another `div` element with class `'navbar-end'`.

        - Create a `NavLink` to `'cart'` with the following attributes:

          - Class set to `'btn btn-ghost btn-circle btn-md ml-4'`.

          - Inside the `NavLink`, create a `div` element with class `'indicator'`.

            - Add the `BsCart3` icon component with class `'h-6 w-6'`.

            - Create a `span` element with classes `'badge badge-sm badge-primary indicator-item'` and text content `'8'`.

## Navbar Structure

```js
import { BsCart3, BsMoonFill, BsSunFill } from "react-icons/bs";
import { FaBarsStaggered } from "react-icons/fa6";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-base-200">
      <div className="navbar align-element ">
        <div className="navbar-start">
          {/* Title */}
          <NavLink
            to="/"
            className="hidden lg:flex btn btn-primary text-3xl items-center "
          >
            C
          </NavLink>
          {/* DROPDOWN */}
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <FaBarsStaggered className="h-6 w-6" />
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-200 rounded-box w-52"
            >
              nav links
            </ul>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal ">nav links</ul>
        </div>
        <div className="navbar-end">
          {/* THEME ICONS */}
          {/* CART LINK*/}
          <NavLink to="cart" className="btn btn-ghost btn-circle btn-md ml-4">
            <div className="indicator">
              <BsCart3 className="h-6 w-6" />
              <span className="badge badge-sm badge-primary indicator-item">
                8
              </span>
            </div>
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
```

## 11 - NavLinks

- create NavLinks component
- setup an array of links
- iterate over and setup return

### Navbar.jsx

- Import Dependencies:

  - Import `NavLink` from `'react-router-dom'`.

- Create the NavLinks Component:

  - Define a functional component named `NavLinks`.

  - Return a fragment (`<>...</>`) to contain the list of navigation links.

    - Use the `.map()` function to iterate over the `links` array.

      - For each `link` object, extract the `id`, `url`, and `text`.

      - Create an `li` element with a `key` attribute set to `id`.

        - Inside the `li` element, create a `NavLink` with the following attributes:

          - Class set to `'capitalize'`.

          - `to` attribute set to the `url`.

          - Text content set to the `text`.

## NavLinks

NavLinks.jsx

```js
const links = [
  { id: 1, url: "/", text: "home" },
  { id: 2, url: "about", text: "about" },
  { id: 3, url: "products", text: "products" },
  { id: 4, url: "cart", text: "cart" },
  { id: 5, url: "checkout", text: "checkout" },
  { id: 6, url: "orders", text: "orders" },
];
import { NavLink } from "react-router-dom";

const NavLinks = () => {
  return (
    <>
      {links.map((link) => {
        const { id, url, text } = link;
        return (
          <li key={id}>
            <NavLink className="capitalize" to={url}>
              {text}
            </NavLink>
          </li>
        );
      })}
    </>
  );
};
export default NavLinks;
```

## 12 - Toggle Component

- add daisyui swap component

```js
import { useState } from "react";

const [theme, setTheme] = useState(false);

const handleTheme = () => {
  setTheme(!theme);
};
<div className="navbar-end">
  <label className="swap swap-rotate ">
    {/* this hidden checkbox controls the state */}
    <input type="checkbox" onChange={handleTheme} />

    {/* sun icon */}
    <BsSunFill className="swap-on h-4 w-4" />

    {/* moon icon */}
    <BsMoonFill className="swap-off h-4 w-4" />
  </label>
</div>;
```

tailwind.config.cjs

```js
{
...
  daisyui: {
    themes: ['winter', 'dracula'],
  },
}
```

```html
<html lang="en" data-theme="winter"></html>
```

## 13 - Change Theme

- change theme with toggle component

### Navbar.jsx

- Import Dependencies:

  - Import `useEffect` and `useState` from `'react'`.

- Theme Configuration:

  - Define a `themes` object with theme names as keys.

- Local Storage Theme Retrieval:

  - Create a function named `getThemeFromLocalStorage`.
    - Return the value of the `'theme'` key from `localStorage` or the default theme `'winter'`.

- Logic:

  - Create a state variable `theme` using the `useState` hook and initialize it with the result of `getThemeFromLocalStorage()`.
  - Define a function `handleTheme` that toggles between the `'winter'` and `'dracula'` themes based on the current theme.
  - Use the `useEffect` hook to apply the selected theme to the `document.documentElement` and store the theme value in `localStorage`.
  - ... (rest of the component implementation)

```js
import { useEffect, useState } from 'react';

const themes = {
  winter: 'winter',
  dracula: 'dracula',
};

const getThemeFromLocalStorage = () => {
  return localStorage.getItem('theme') || themes.winter;
};

const Navbar = () => {
  const [theme, setTheme] = useState(getThemeFromLocalStorage());

  const handleTheme = () => {
    const { winter, dracula } = themes;
    const newTheme = theme === winter ? dracula : winter;
    setTheme(newTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  ...
};
```

## 14 - About Page

- setup about page

### About.jsx

- About Component:
  - Define the `About` component.
    - Return a fragment containing the following elements:
      - A `div` with classes `flex`, `flex-wrap`, `gap-2`, `sm:gap-x-6`, `items-center`, and `justify-center`.
        - Inside the `div`, an `h1` with classes `text-4xl`, `font-bold`, `leading-none`, and `tracking-tight`, with the text "We love".
        - Inside the `div`, a `div` with classes `stats`, `bg-primary`, and `shadow`.
          - Inside the nested `div`, another `div` with class `stat`.
            - Inside this `div`, a `div` with classes `stat-title`, `text-primary-content`, `text-4xl`, `font-bold`, and `tracking-widest`, containing the text "comfy".
      - A `p` element with classes `mt-6`, `text-lg`, `leading-8`, `max-w-2xl`, and `mx-auto`, containing sample Lorem ipsum text.

## About Page

```js
const About = () => {
  return (
    <>
      <div className="flex flex-wrap gap-2 sm:gap-x-6 items-center justify-center">
        <h1 className="text-4xl font-bold leading-none tracking-tight sm:text-6xl ">
          We love
        </h1>
        <div className="stats bg-primary shadow">
          <div className="stat">
            <div className="stat-title text-primary-content text-4xl font-bold tracking-widest">
              comfy
            </div>
          </div>
        </div>
      </div>
      <p className="mt-6 text-lg leading-8 max-w-2xl mx-auto">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic veniam
        odit, officiis eos mollitia alias, doloremque, aspernatur ratione
        asperiores voluptas labore minus dolores reprehenderit corporis quos.
        Assumenda molestias harum dignissimos?
      </p>
    </>
  );
};
export default About;
```

## 15 - Hero Component

- setup hero component in landing page

### Hero.jsx

- Import Dependencies:

  - Import `Link` from `'react-router-dom'`.

- Hero Component:
  - Define the `Hero` component.
    - Create an array `carouselImages` containing imported image paths.
    - Return a `div` with classes `grid`, `grid-cols-1`, `lg:grid-cols-2`, `gap-24`, and `items-center`.
      - Inside this `div`, another `div`.
        - Inside this `div`, an `h1` with classes `max-w-2xl`, `text-4xl`, `font-bold`, and `tracking-tight`, containing the text "We’re changing the way people shop."
        - Next, a `p` element with classes `mt-8`, `max-w-xl`, `text-lg`, and `leading-8`, containing sample Lorem ipsum text.
        - Following that, a `div` with class `mt-10`.
          - Inside the `div`, a `Link` component with props `to='products'` and classes `btn` and `btn-primary`, containing the text "Our Products".
      - Another `div` with classes `hidden`, `h-[28rem]`, `lg:carousel`, `carousel-center`, `p-4`, `space-x-4`, `bg-neutral`, and `rounded-box`.
        - Inside this `div`, a JavaScript map function iterating over `carouselImages`.
          - For each image, a `div` with class `carousel-item`.
            - Inside the `div`, an `img` element with attributes `src` set to the image path and classes `rounded-box`, `h-full`, `w-80`, and `object-cover`.

Hero.jsx

```js
import { Link } from "react-router-dom";

import hero1 from "../assets/hero1.webp";
import hero2 from "../assets/hero2.webp";
import hero3 from "../assets/hero3.webp";
import hero4 from "../assets/hero4.webp";

const carouselImages = [hero1, hero2, hero3, hero4];
const Hero = () => {
  return (
    <div className=" grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
      <div>
        <h1 className="max-w-2xl text-4xl font-bold tracking-tight  sm:text-6xl ">
          We’re changing the way people shop.
        </h1>

        <p className="mt-8 max-w-xl text-lg leading-8">
          Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem
          cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat
          aliqua. Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure
          qui lorem cupidatat commodo.
        </p>
        <div className="mt-10 ">
          <Link to="products" className="btn btn-primary ">
            Our Products
          </Link>
        </div>
      </div>
      <div className="hidden  h-[28rem] lg:carousel carousel-center   p-4 space-x-4 bg-neutral rounded-box">
        {carouselImages.map((image, index) => {
          return (
            <div key={image} className="carousel-item">
              <img
                src={image}
                className="rounded-box h-full w-80  object-cover"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Hero;
```

## 16 - Axios Custom Instance

- explore api
- [API DOCS](https://documenter.getpostman.com/view/18152321/2s9Xy5KpTi)
- create utils/index.js
- setup custom axios instance
- figure out the base url
- setup thunder client (optional)

```js
import axios from "axios";

const productionUrl = "https://strapi-store-server.onrender.com/api";

export const customFetch = axios.create({
  baseURL: productionUrl,
});
```

## Challenge (19) - Landing Loader

- setup ErrorElement
- add to Loading Page
- setup a loader
- fetch only featured products
- return products

### ErrorElement.jsx

1. Create ErrorElement Component:

   - Define a functional component named `ErrorElement`.

2. Import Dependencies:

   - Import the `useRouteError` hook from `'react-router-dom'`.

3. Get Route Error:

   - Inside the component, use the `useRouteError` hook to retrieve the error information from the current route.

4. Display Error Message:

   - Return an `h4` element with the classes `font-bold` and `text-4xl`.
   - Set the content of the `h4` element to "there was an error..."

5. Export ErrorElement Component:
   - Export the `ErrorElement` component as the default export of the module.

## 17 - Landing Loader

ErrorElement.jsx

```js
import { useRouteError } from "react-router-dom";
const ErrorElement = () => {
  const error = useRouteError();
  console.log(error);

  return <h4 className="font-bold text-4xl">there was an error... </h4>;
};
export default ErrorElement;
```

App.jsx

```js
import { ErrorElement } from "./components";
// loaders
import { loader as landingLoader } from "./pages/Landing";
// actions

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
        loader: landingLoader,
        errorElement: ErrorElement,
      },
    ],
  },
]);
```

Landing.js

```js
import { Hero } from "../components";

import { customFetch } from "../utils";
const url = "/products?featured=true";

export const loader = async () => {
  const response = await customFetch(url);
  console.log(response);
  const products = response.data.data;
  return { products };
};

const Landing = () => {
  return (
    <>
      <Hero />
    </>
  );
};
export default Landing;
```

## 18 - Featured Products

- create FeaturedProducts, SectionTitle and ProductsGrid components
- render SectionTitle and ProductsGrid in FeaturedProducts
- setup SectionTitle
- in ProductsGrid access and render products from loader

### SectionTitle.jsx

1. Create SectionTitle Component:

   - Define a functional component named `SectionTitle`.

2. Component Props:

   - The component should accept a prop named `text`.

3. Component Structure:

   - Return a `div` element with the classes `border-b border-base-300 pb-5`.
   - Inside the `div`, place an `h2` element with the classes `text-3xl`, `font-medium`, `tracking-wider`, and `capitalize`.
   - Set the content of the `h2` element to the value of the `text` prop.

4. Export SectionTitle Component:
   - Export the `SectionTitle` component as the default export of the module.

### FeaturedProducts.jsx

1. Import Dependencies:

   - Import `ProductsGrid` from `'./ProductsGrid'`.
   - Import `SectionTitle` from `'./SectionTitle'`.

2. Create FeaturedProducts Component:

   - Define a functional component named `FeaturedProducts`.

3. Component Structure:

   - Return a `div` element with the class `pt-24`.
   - Inside the `div`, include a `SectionTitle` component with the prop `text` set to `'featured products'`.
   - Include a `ProductsGrid` component.

4. Export FeaturedProducts Component:
   - Export the `FeaturedProducts` component as the default export of the module.

### ProductsGrid.jsx

1. Import Dependencies:

   - Import `Link` and `useLoaderData` from `'react-router-dom'`.

2. Create ProductsGrid Component:

   - Define a functional component named `ProductsGrid`.

3. Component Structure:

   - Inside the component, destructure the `products` data using `useLoaderData`.
   - Return a `div` element with the classes `pt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3`.
   - Use the `.map()` function to iterate through each `product` in the `products` array.

4. Product Card:

   - For each `product`, destructure the attributes such as `title`, `price`, and `image`.
   - Create a `Link` component that has the following:
     - `key` attribute set to `product.id`.
     - `to` attribute set to `/products/${product.id}`.
     - `className` attribute with classes for styling.
   - Inside the `Link`, create a `figure` element with the class `px-4 pt-4` to hold the product image.
   - Within the `figure`, include an `img` element with the `src` attribute set to `image`, `alt` attribute set to `title`, and classes for styling.
   - Below the `figure`, create a `div` element with the class `card-body items-center text-center`.
   - Inside the `div`, display the `title` using a `h2` element with classes for styling.
   - Display the `price` using a `span` element with the class `text-secondary`.

5. Export ProductsGrid Component:
   - Export the `ProductsGrid` component as the default export of the module.

SectionTitle.jsx

```js
const SectionTitle = ({ text }) => {
  return (
    <div className="border-b border-base-300 pb-5">
      <h2 className="text-3xl font-medium tracking-wider capitalize">{text}</h2>
    </div>
  );
};
export default SectionTitle;
```

FeaturedProducts.jsx

```js
import ProductsGrid from "./ProductsGrid";
import SectionTitle from "./SectionTitle";
const FeaturedProducts = () => {
  return (
    <div className="pt-24 ">
      <SectionTitle text="featured products" />
      <ProductsGrid />
    </div>
  );
};
export default FeaturedProducts;
```

ProductsGrid.jsx

```js
import { Link, useLoaderData } from "react-router-dom";
const ProductsGrid = () => {
  const { products } = useLoaderData();

  return (
    <div className="pt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3 ">
      {products.map((product) => {
        const { title, price, image } = product.attributes;
        const dollarsAmount = price;
        return (
          <Link
            key={product.id}
            to={`/products/${product.id}`}
            className="card w-full  shadow-xl hover:shadow-2xl transition duration-300 "
          >
            <figure className="px-4 pt-4">
              <img
                src={image}
                alt={title}
                className="rounded-xl h-64 md:h-48 w-full object-cover"
              />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title capitalize tracking-wider">{title}</h2>
              <span className="text-secondary">{dollarsAmount}</span>
            </div>
          </Link>
        );
      })}
    </div>
  );
};
export default ProductsGrid;
```

## 20 - Format Price

- payment providers need in smallest unit
  - in this case cents
- in utils setup a function to format price
- utilize in ProductsGrid

- utils/index.js

```js
export const formatPrice = (price) => {
  const dollarsAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format((price / 100).toFixed(2));
  return dollarsAmount;
};
```

## 21 - Single Product

- fetch and render single product
- don't forget about the colors and amount options
- set amount options dynamically

1. Import Dependencies:

   - Import `useLoaderData` from `'react-router-dom'`.
   - Import `formatPrice`, `customFetch`, and `useState` from `'../utils'`.
   - Import `Link` from `'react-router-dom'`.

2. Define Loader Function:

   - Define a loader function that fetches product data based on the `params.id`.
   - Use `customFetch` to fetch the product data from `/products/${params.id}`.
   - Return an object containing the fetched product data.

3. Create SingleProduct Component:

   - Define a functional component named `SingleProduct`.

4. Component Structure:

   - Inside the component, destructure the `product` data using `useLoaderData`.
   - Destructure attributes like `image`, `title`, `price`, `description`, `colors`, and `company`.
   - Create a `dollarsAmount` variable by formatting the `price` using `formatPrice`.
   - Use `useState` to manage the `productColor` and `amount` state.

5. Display Product Information:

   - Return a `section` element to encapsulate the component content.
   - Display breadcrumb navigation using `Link` components for Home and Products pages.

6. Product Display:

   - Create a `div` with classes for styling and a grid layout.
   - Display the product image using an `img` element with classes for styling.

7. Product Info:

   - Within a `div`, display the product title, company, and `dollarsAmount`.

8. Description:

   - Display the product description using a `p` element.

9. Colors:

   - Display available product colors using a `div` with classes for styling.
   - Map through the `colors` array and create a `button` for each color.
   - Add appropriate classes and styles for the color button based on the selected `productColor`.

10. Amount:

    - Display a dropdown for selecting the product amount using a `div`.
    - Use a `select` element with options for different amounts.
    - Set the value of the `select` to the `amount` state and handle changes with `handleAmount` function.

11. Cart Button:

    - Display an "Add to bag" button using a `button` element with appropriate classes and an `onClick` event handler.

12. Export SingleProduct Component:
    - Export the `SingleProduct` component as the default export of the module.

- import and setup loader in the App.jsx

```js
import { useLoaderData } from "react-router-dom";
import { formatPrice, customFetch } from "../utils";
import { Link } from "react-router-dom";
import { useState } from "react";

export const loader = async ({ params }) => {
  const response = await customFetch(`/products/${params.id}`);
  return { product: response.data.data };
};

const SingleProduct = () => {
  const { product } = useLoaderData();
  const { image, title, price, description, colors, company } =
    product.attributes;
  const dollarsAmount = formatPrice(price);
  const [productColor, setProductColor] = useState(colors[0]);
  const [amount, setAmount] = useState(1);

  const handleAmount = (e) => {
    setAmount(parseInt(e.target.value));
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
      {/* PRODUCT */}
      <div className="mt-6 grid gap-y-8 lg:grid-cols-2  lg:gap-x-16">
        {/* IMAGE */}
        <img
          src={image}
          alt={title}
          className="w-96 h-96 object-cover rounded-lg lg:w-full  "
        />
        {/* PRODUCT INFO */}
        <div>
          <h1 className="capitalize text-3xl font-bold">{title}</h1>
          <h4 className="text-xl text-neutral-content font-bold mt-2">
            {company}
          </h4>

          <p className="mt-3 text-xl">{dollarsAmount}</p>

          <p className="mt-6 leading-8">{description}</p>

          {/* COLORS */}
          <div className="mt-6">
            <h4 className="text-md font-medium tracking-wider capitalize">
              colors
            </h4>
            <div className="mt-2">
              {colors.map((color) => {
                return (
                  <button
                    key={color}
                    type="button"
                    className={`badge  w-6 h-6 mr-2  ${
                      color === productColor && "border-2 border-secondary"
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => setProductColor(color)}
                  ></button>
                );
              })}
            </div>
          </div>
          {/* AMOUNT */}
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <h4 className="text-md font-medium tracking-wider capitalize">
                amount
              </h4>
            </label>
            <select
              className="select select-secondary select-bordered select-md"
              value={amount}
              onChange={handleAmount}
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
            </select>
          </div>
          {/* CART BUTTON */}
          <div className="mt-10 ">
            <button
              className="btn btn-secondary btn-md"
              onClick={() => console.log("add to bag")}
            >
              Add to bag
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
export default SingleProduct;
```

<!-- EXTRA CREDIT -->

- rename to index.jsx

index.jsx

```js
export const generateAmountOptions = (number) => {
  return Array.from({ length: number }, (_, index) => {
    const amount = index + 1;

    return (
      <option key={amount} value={amount}>
        {amount}
      </option>
    );
  });
};
```

Array.from({ length: number }, (_, index) => { ... }): This part uses the Array.from method to create an array of a specific length, determined by the number parameter. The second argument of the Array.from method is a callback function that will be invoked for each element in the array. The underscore (_) is a placeholder for the current element (which we don't need in this case), and index is the index of the current element.

const amount = index + 1;: Inside the callback function, this line calculates the amount value based on the index. Since the index starts from 0 but you want amount to start from 1, you add 1 to the index.

## 22 - Products Page (Setup)

- create following components and render in products page
  - Filters
  - ProductsContainer
  - PaginationContainer
- in products page loader fetch all products

### Products.jsx

1. Import Dependencies:

   - Import `Filters`, `PaginationContainer`, and `ProductsContainer` from `'../components'`.
   - Import `customFetch` from `'../utils'`.

2. Define URL and Loader Function:

   - Define a constant `url` containing the URL path to fetch products from.
   - Define a loader function that fetches product data from the defined URL.
   - Use `customFetch` to fetch the product data from the `url`.
   - Extract products and meta information from the response and return them.

3. Create Products Component:

   - Define a functional component named `Products`.

4. Component Structure:

   - Return a `Fragment` element (`<>...</>`) to wrap the component content.

5. Filters Component:

   - Include the `Filters` component to allow users to apply filters to the product list.

6. ProductsContainer Component:

   - Include the `ProductsContainer` component to display the list of products.

7. PaginationContainer Component:

   - Include the `PaginationContainer` component to manage product list pagination.

8. Export Products Component:
   - Export the `Products` component as the default export of the module.

- import and setup loader in app.jsx

Products.jsx

```js
import { Filters, PaginationContainer, ProductsContainer } from "../components";
import { customFetch } from "../utils";

const url = "/products";
export const loader = async ({ request }) => {
  const response = await customFetch(url);

  const products = response.data.data;
  const meta = response.data.meta;
  return { products, meta };
};

const Products = () => {
  return (
    <>
      <Filters />
      <ProductsContainer />
      <PaginationContainer />
    </>
  );
};
export default Products;
```

## 23 - Products Container

- create ProductsList and render products in one column
- setup header (with total jobs and toggle buttons)
- toggle between ProductsGrid and ProductsList

### ProductsList.jsx

1. Import Dependencies:

   - Import `formatPrice` from `'../utils'`.
   - Import `Link` and `useLoaderData` from `'react-router-dom'`.

2. Create ProductList Component:

   - Define a functional component named `ProductList`.

3. Component Structure:

   - Return a `div` element containing a list of products.

4. Loop Through Products:

   - Use the `useLoaderData` hook to get the `products` data from the loader.
   - Use the `map` function to loop through each product in the `products` array.

5. Product Link:

   - For each product, create a `Link` element that links to the individual product page.
   - Use the `product.id` as the link path (`to={`/products/${product.id}`}`).
   - Add CSS classes to style the link and apply hover effects.

6. Product Image:

   - Display the product image inside an `img` element.
   - Apply appropriate classes for styling and responsive design.
   - Add hover effect to the image using CSS classes.

7. Product Details:

   - Display the product title and company using `h3` and `h4` elements.
   - Add classes for font styles and responsiveness.

8. Product Price:

   - Display the formatted price using the `formatPrice` function.
   - Use a `p` element with appropriate classes for styling.

9. Export ProductList Component:
   - Export the `ProductList` component as the default export of the module.

### ProductsContainer.jsx

1. Import Dependencies:

   - Import `useLoaderData` from `'react-router-dom'`.
   - Import `ProductsGrid` and `ProductsList` from their respective paths.
   - Import `useState` from `'react'`.
   - Import `BsFillGridFill` and `BsList` from `'react-icons/bs'`.

2. Create ProductsContainer Component:

   - Define a functional component named `ProductsContainer`.

3. Component Structure:

   - Return a `div` element containing the products container.

4. Total Products Count:

   - Use the `useLoaderData` hook to get the `meta` data from the loader.
   - Extract the `total` count of products from `meta.pagination`.
   - Use a conditional statement to handle the plural form of the word "product".

5. Layout State and Styles:

   - Use the `useState` hook to manage the layout state (grid or list).
   - Create a helper function `setActiveStyles` to generate the CSS classes based on the active layout.
   - Return appropriate CSS classes for active and inactive layouts.

6. Header Section:

   - Create a `div` for the header section containing the product count and layout buttons.
   - Display the total number of products using the extracted `totalProducts` count.
   - Create a button for grid layout and a button for list layout.
   - Attach click event handlers to the buttons to set the layout state.

7. Products Display:

   - Create a `div` to display the products.
   - Use conditional rendering to handle cases where no products match the search or when products are present.
   - If no products match the search, display a message.
   - If products are present and the layout is 'grid', display the `ProductsGrid` component.
   - If products are present and the layout is 'list', display the `ProductsList` component.

8. Export ProductsContainer Component:
   - Export the `ProductsContainer` component as the default export of the module.

## Products Container

ProductsList.jsx

```js
import { formatPrice } from "../utils";
import { Link, useLoaderData } from "react-router-dom";

const ProductList = () => {
  const { products } = useLoaderData();
  return (
    <div className="mt-12 grid gap-y-8">
      {products.map((product) => {
        const { title, price, image, company } = product.attributes;
        const dollarsAmount = formatPrice(price);

        return (
          <Link
            key={product.id}
            to={`/products/${product.id}`}
            className="p-8 rounded-lg flex flex-col sm:flex-row gap-y-4 flex-wrap bg-base-100 shadow-xl hover:shadow-2xl duration-300 group"
          >
            <img
              src={image}
              alt={title}
              className="h-24 w-24 rounded-lg sm:h-32 sm:w-32 object-cover group-hover:scale-105 transition duration-300"
            />
            <div className="ml-0 sm:ml-16">
              <h3 className="capitalize font-medium text-lg">{title}</h3>
              <h4 className="capitalize text-md text-neutral-content">
                {company}
              </h4>

              {/* COLOR */}
            </div>

            <p className="font-medium ml-0 sm:ml-auto text-lg">
              {dollarsAmount}
            </p>
          </Link>
        );
      })}
    </div>
  );
};

export default ProductList;
```

ProductsContainer.jsx

```js
import { useLoaderData } from "react-router-dom";
import ProductsGrid from "./ProductsGrid";
import ProductsList from "./ProductsList";
import { useState } from "react";
import { BsFillGridFill, BsList } from "react-icons/bs";

const ProductsContainer = () => {
  const { meta } = useLoaderData();
  const totalProducts = meta.pagination.total;
  const [layout, setLayout] = useState("grid");

  const setActiveStyles = (pattern) => {
    return `text-xl btn btn-circle btn-sm ${
      pattern === layout
        ? "btn-primary text-primary-content"
        : "btn-ghost text-base-content"
    }`;
  };

  return (
    <>
      {/* HEADER */}
      <div className="flex justify-between items-center mt-8 border-b border-base-300 pb-5">
        <h4 className="font-medium text-md">
          {totalProducts} product{totalProducts > 1 && "s"}
        </h4>
        <div className="flex gap-x-2">
          <button
            onClick={() => setLayout("grid")}
            className={setActiveStyles("grid")}
          >
            <BsFillGridFill />
          </button>

          <button
            onClick={() => setLayout("list")}
            className={setActiveStyles("list")}
          >
            <BsList />
          </button>
        </div>
      </div>

      {/* PRODUCTS */}
      <div>
        {totalProducts === 0 ? (
          <h5 className="text-2xl mt-16">
            Sorry, no products matched your search...
          </h5>
        ) : layout === "grid" ? (
          <ProductsGrid />
        ) : (
          <ProductsList />
        )}
      </div>
    </>
  );
};

export default ProductsContainer;
```

## 24 - Filters (Search Input)

- add size to prop FormInput.jsx
- render search input, submit button and reset button

## Filters (Search Input)

FormInput.jsx

```js
const FormInput = ({ label, name, type, defaultValue, size }) => {
  return (
    <div className="form-control">
      <label htmlFor={name} className="label">
        <span className="label-text capitalize">{label}</span>
      </label>
      <input
        type={type}
        name={name}
        defaultValue={defaultValue}
        className={`input input-bordered ${size}`}
      />
    </div>
  );
};
export default FormInput;
```

Filters.jsx

```js
import { Form, useLoaderData, Link } from "react-router-dom";
import FormInput from "./FormInput";

const Filters = () => {
  return (
    <Form className="bg-base-200 rounded-md px-8 py-4 grid gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center">
      {/* SEARCH */}
      <FormInput
        type="search"
        label="search product"
        name="search"
        size="input-sm"
      />
      {/* BUTTONS */}
      <button type="submit" className="btn btn-primary btn-sm ">
        search
      </button>
      <Link to="/products" className="btn btn-accent btn-sm">
        reset
      </Link>
    </Form>
  );
};
export default Filters;
```

## 25- Filters (Select Input)

- setup input for select input
- render for categories, companies and order
- companies and categories values are located in meta

### FormSelect.jsx

1. Create FormSelect Component:

   - Define a functional component named `FormSelect`.

2. Component Structure:

   - Return a `div` element containing the form select input.

3. Props:

   - Accept the following props: `label`, `name`, `list`, `defaultValue`, and `size`.

4. Label:

   - Create a `label` element with a `for` attribute matching the `name` prop.
   - Display the capitalized label text using the `label` prop.

5. Select Input:

   - Create a `select` element for the input field.
   - Set the `name` and `id` attributes to the value of the `name` prop.
   - Apply the appropriate CSS classes for the select input using the `size` prop.
   - Set the `defaultValue` of the select input using the `defaultValue` prop.

6. Options:

   - Map through the `list` prop array to generate individual `option` elements.
   - Use each item in the `list` as the `key` and `value` attributes of the `option` element.

7. Export FormSelect Component:
   - Export the `FormSelect` component as the default export of the module.

## Filters (Select Input)

FormSelect.jsx

```js
const FormSelect = ({ label, name, list, defaultValue, size }) => {
  return (
    <div className="form-control">
      <label htmlFor={name} className="label">
        <span className="label-text capitalize">{label}</span>
      </label>
      <select
        name={name}
        id={name}
        className={`select select-bordered ${size}`}
        defaultValue={defaultValue}
      >
        {list.map((item) => {
          return (
            <option key={item} value={item}>
              {item}
            </option>
          );
        })}
      </select>
    </div>
  );
};
export default FormSelect;
```

Filters.jsx

```js
const { meta } = useLoaderData();

{
  /* CATEGORIES */
}
<FormSelect
  label="select category"
  name="category"
  list={meta.categories}
  size="select-sm"
/>;
{
  /* COMPANIES */
}
<FormSelect
  label="select company"
  name="company"
  list={meta.companies}
  size="select-sm"
/>;
{
  /* ORDER */
}
<FormSelect
  label="sort by"
  name="order"
  list={["a-z", "z-a", "high", "low"]}
  size="select-sm"
/>;
```

## 26 - Filters (Price)

- create range input (hint: you will need local state)

### FormRange.jsx

1. Create FormRange Component:

   - Define a functional component named `FormRange`.

2. Component Structure:

   - Return a `div` element containing the form range input and related elements.

3. Props:

   - Accept the following props: `label`, `name`, and `size`.

4. Default Values:

   - Define default values for `step`, `maxPrice`, and `selectedPrice`.

5. Label and Selected Price Display:

   - Create a `label` element with a `for` attribute matching the `name` prop.
   - Display the capitalized label text using the `label` prop.
   - Display the selected price using the `formatPrice` function.

6. Range Input:

   - Create an `input` element with `type` set to `'range'`.
   - Set the `name`, `min`, `max`, `value`, and `step` attributes.
   - Use the `selectedPrice` state for the `value` attribute.
   - Set the `onChange` event handler to update `selectedPrice`.

7. Min and Max Price Display:

   - Create a `div` element for displaying minimum and maximum price values.
   - Use the `formatPrice` function for formatting and displaying max price.

8. Export FormRange Component:
   - Export the `FormRange` component as the default export of the module.

## Filters (Price )

FormRange.jsx

```js
import { formatPrice } from "../utils";
import { useState } from "react";
const FormRange = ({ label, name, size }) => {
  const step = 1000;
  const maxPrice = 100000;
  const [selectedPrice, setSelectedPrice] = useState(maxPrice);

  return (
    <div className="form-control">
      <label htmlFor={name} className="label cursor-pointer">
        <span className="label-text capitalize">{label}</span>
        <span>{formatPrice(selectedPrice)}</span>
      </label>
      <input
        type="range"
        name={name}
        min={0}
        max={maxPrice}
        value={selectedPrice}
        onChange={(e) => setSelectedPrice(e.target.value)}
        className={`range range-primary ${size}`}
        step={step}
      />
      <div className="w-full flex justify-between text-xs px-2 mt-2">
        <span className="font-bold text-md">0</span>
        <span className="font-bold text-md">Max : {formatPrice(maxPrice)}</span>
      </div>
    </div>
  );
};
export default FormRange;
```

Filters.jsx

```js
{
  /* PRICE */
}
<FormRange label="select price" name="price" size="range-sm" />;
```

## 27 - Filters (Shipping)

- create checkbox input

### FormCheckbox.jsx

1. Create FormCheckbox Component:

   - Define a functional component named `FormCheckbox`.

2. Component Structure:

   - Return a `div` element containing the form checkbox input and related elements.

3. Props:

   - Accept the following props: `label`, `name`, `defaultValue`, and `size`.

4. Label Display:

   - Create a `label` element with a `for` attribute matching the `name` prop.
   - Display the capitalized label text using the `label` prop.

5. Checkbox Input:

   - Create an `input` element with `type` set to `'checkbox'`.
   - Set the `name` attribute to match the `name` prop.
   - Set the `defaultChecked` attribute using the `defaultValue` prop.
   - Use the `size` prop to determine the checkbox size class.

6. Styling and Layout:

   - Apply appropriate classes to style and position the form control items.

7. Export FormCheckbox Component:
   - Export the `FormCheckbox` component as the default export of the module.

## Filters (Shipping)

FormCheckbox.jsx

```js
const FormCheckbox = ({ label, name, defaultValue, size }) => {
  return (
    <div className="form-control items-center">
      <label htmlFor={name} className="label cursor-pointer">
        <span className="label-text capitalize">{label}</span>
      </label>
      <input
        type="checkbox"
        name={name}
        defaultChecked={defaultValue}
        className={`checkbox checkbox-primary ${size}`}
      />
    </div>
  );
};
export default FormCheckbox;
```

Filters.jsx

```js
{
  /* SHIPPING */
}
<FormCheckbox label="free shipping" name="shipping" size="checkbox-sm" />;
```

## 28 - Global Loading

- create loading component
- check for loading state in HomeLayout
- toggle between loading and <Outlet>

### Loading.jsx

1. Create Loading Component:

   - Define a functional component named "Loading".

2. Component Structure:

   - Return a "div" element with CSS classes to center content both vertically and horizontally.

3. Loading Animation:

   - Inside the "div", include a "span" element with the classes "loading loading-ring loading-lg".
   - This applies a loading animation to create the visual effect.

4. Styling:

   - Use the provided CSS classes to style the loading animation.

5. Export Loading Component:
   - Export the "Loading" component as the default export of the module.

### HomeLayout.jsx

1. Create HomeLayout Component:

   - Define a functional component named "HomeLayout".

2. Import Dependencies:

   - Import "Outlet" and "useNavigation" from 'react-router-dom'.
   - Import "Navbar", "Loading", and "Header" from '../components'.

3. Component Structure:

   - Return a fragment ('<>...</>') to encapsulate the component's content.

4. UseNavigation Hook:

   - Use the "useNavigation" hook to access the navigation state.
   - Store whether the page is currently loading in "isPageLoading" variable.

5. Conditional Rendering:

   - Use a ternary operator to conditionally render content:
     - If "isPageLoading" is true, render the "Loading" component.
     - Otherwise, render a "section" element with CSS classes and include the "Outlet" component.

6. Header and Navbar:

   - Include the "Header" and "Navbar" components at the beginning of the component.

7. Styling:

   - Apply CSS classes to style the layout and align its elements.

8. Export HomeLayout Component:
   - Export the "HomeLayout" component as the default export of the module.

## Global Loading

Loading.jsx

```js
const Loading = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <span className="loading loading-ring loading-lg" />
    </div>
  );
};
export default Loading;
```

```js
import { Outlet, useNavigation } from "react-router-dom";
import { Navbar, Loading, Header } from "../components";
const HomeLayout = () => {
  const navigation = useNavigation();
  const isPageLoading = navigation.state === "loading";
  return (
    <>
      <Header />
      <Navbar />
      {isPageLoading ? (
        <Loading />
      ) : (
        <section className="align-element py-20">
          <Outlet />
        </section>
      )}
    </>
  );
};
export default HomeLayout;
```

## 29 - Setup Params

- explore how to filter products
  [API DOCS](https://documenter.getpostman.com/view/18152321/2s9Xy5KpTi#80a47ff5-cc24-494b-89e0-02cd92acc226)
- test in Thunder Client
- access params in loader
- use params in customFetch
- pass params down
- use params as default values (price in FormRange)
- setup reset button

- NOTE: when submiting filters, since is a get Form, the params comes in the url

## Setup Params

Products.jsx

```js
export const loader = async ({ request }) => {
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);
  const response = await customFetch(url, { params });

  const products = response.data.data;
  const meta = response.data.meta;

  return { products, meta, params };
};
```

Filters.jsx

```js
import { Form, useLoaderData, Link } from "react-router-dom";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";
import FormRange from "./FormRange";
import FormCheckbox from "./FormCheckbox";
const Filters = () => {
  const { meta, params } = useLoaderData();
  const { search, company, category, shipping, order, price } = params;
  return (
    <Form className="bg-base-200 rounded-md px-8 py-4 grid gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center">
      {/* SEARCH */}
      <FormInput
        type="search"
        label="search product"
        name="search"
        defaultValue={search}
        size="input-sm"
      />
      {/* CATEGORIES */}
      <FormSelect
        label="select category"
        name="category"
        list={meta.categories}
        defaultValue={category}
        size="select-sm"
      />
      {/* COMPANIES */}
      <FormSelect
        label="select company"
        name="company"
        list={meta.companies}
        defaultValue={company}
        size="select-sm"
      />
      {/* ORDER */}
      <FormSelect
        label="sort by"
        name="order"
        list={["a-z", "z-a", "high", "low"]}
        defaultValue={order}
        size="select-sm"
      />
      {/* PRICE */}
      <FormRange
        label="select price"
        name="price"
        price={price}
        size="range-sm"
      />
      {/* SHIPPING */}
      <FormCheckbox
        label="free shipping"
        name="shipping"
        defaultValue={shipping}
        size="checkbox-sm"
      />
      {/* BUTTONS */}
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
```

```js
const params = Object.fromEntries([
  ...new URL(request.url).searchParams.entries(),
]);
```

It takes a URL string from the request.url property.
It creates a URL object from that URL string.
It extracts the query parameters using the searchParams property.
It converts the query parameters into an iterable of key-value pairs using the entries() method.
It spreads these key-value pairs into an array.
It uses Object.fromEntries() to create a new object where the key-value pairs become properties of the object.
