import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <>
      <div className="flex flex-wrap gap-2 sm:gap-x-6 items-center justify-center">
        <h1 className="text-4xl font-bold leading-none tracking-tight">
          We love
        </h1>
        <div className="stats bg-primary shadow">
          <div className="stat">
            <div className="stat-title text-primary-content text-4xl font-bold tracking-widest capitalize">
              comfy
            </div>
          </div>
        </div>
      </div>
      <p className="mt-6 text-lg leading-8 max-w-2xl mx-auto ">
        Hi there. We are not just a store. We are the store. So right now go to
        the <Link to="/products">Products</Link> page and just be happy!
      </p>
    </>
  );
};

export default About;
