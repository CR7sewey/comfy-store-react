import React from "react";
import { useNavigation } from "react-router-dom";
import { Outlet } from "react-router-dom"; // to displays the children in App
import Navbar from "../Components/Navbar";

const HomeLayout = () => {
  const navigation = useNavigation(); // returns state of the page
  const isPageLoading = navigation.state === "loading";
  return (
    <>
      <nav>
        <Navbar />
      </nav>
      <section className="page">
        {isPageLoading ? (
          <div className="loading"></div>
        ) : (
          <section className="align-element py-20">
            <Outlet />
          </section>
        )}
      </section>
    </>
  );
};

export default HomeLayout;
