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
