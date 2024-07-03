import React from "react";
import { Link, useNavigation } from "react-router-dom";
import { Outlet } from "react-router-dom"; // to displays the children in App
import Navbar from "../Components/Navbar";
import Header from "../Components/Header";
import Loading from "../Components/Loading";

const HomeLayout = () => {
  const navigation = useNavigation(); // returns state of the page
  const isPageLoading = navigation.state === "loading";
  return (
    <>
      <Header />
      <Navbar />

      <section className="page">
        {isPageLoading ? (
          <Loading />
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
