import React, { useContext } from "react";
import { DataContext } from "../../contexts/DataContextProvider";

const Products = () => {
  const { products } = useContext(DataContext);

  return <div>THis is the products page</div>;
};

export default Products;
