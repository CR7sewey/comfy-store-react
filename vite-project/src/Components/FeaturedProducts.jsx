import React from "react";
import { Link } from "react-router-dom";

const FeaturedProducts = ({ products }) => {
  console.log(products, "feat");
  return (
    <>
      <div className="pt-24">
        <div className="border-b border-base-300 pb-5">
          <h2 className="texte-3xl font-medium tracking-wider capitalize">
            Featured Products
          </h2>
        </div>
        <div className="pt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {products.map((prods) => {
            const { title, price, image } = prods.attributes;
            return (
              <Link
                to={`products/${prods.id}`}
                key={prods.id}
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
                  <h2 className="card-title capitalize tracking-wider">
                    {title}
                  </h2>
                  <span className="text-secondary">{price} €</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default FeaturedProducts;
