import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { FaBarsStaggered } from "react-icons/fa6";
import { BsCart3, BsMoonFill, BsSunFill } from "react-icons/bs";
import Navlinks from "./Navlinks";
import { useSelector } from "react-redux";

const themes = ["winter", "dracula"];

const getThemeFromLocalStorage = () => {
  return localStorage.getItem("theme") || "winter";
};

const Navbar = () => {
  const [theme, handleTheme] = useState(getThemeFromLocalStorage());
  const { numItemsInCart } = useSelector((state) => state.cartState);

  const toggleTheme = () => {
    const new_theme = theme === "winter" ? "dracula" : "winter";
    handleTheme(new_theme);
    //changeTheme(theme);
    //localStorage.setItem("theme", new_theme);
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    console.log(document.documentElement);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <nav className="bg-base-200">
      <div className="navbar align-element ">
        <div className="navbar-start">
          <NavLink
            to="/"
            className="hidden lg:flex btn btn-primary text-3xl items-center "
          >
            CS
          </NavLink>
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <FaBarsStaggered className="h-6 w-6" />
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-200 rounded-box w-52"
            >
              <Navlinks />
            </ul>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal">
              <Navlinks />
            </ul>
          </div>
          <div className="navbar-end">
            <label className="swap swap-rotate ">
              {/* this hidden checkbox controls the state */}
              <input type="checkbox" onChange={toggleTheme} />

              {/* sun icon */}
              <BsSunFill className="swap-on h-4 w-4" />

              {/* moon icon */}
              <BsMoonFill className="swap-off h-4 w-4" />
            </label>
          </div>
          <div className="navbar-end">
            {/* THEME ICONS */}
            {/* CART LINK*/}

            <NavLink to="cart" className="btn btn-ghost btn-circle btn-md ml-4">
              <div className="indicator">
                <BsCart3 className="h-6 w-6" />
                <span className="badge badge-sm badge-primary indicator-item">
                  {numItemsInCart}
                </span>
              </div>
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
