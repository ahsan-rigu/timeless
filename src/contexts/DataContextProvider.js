import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const DataContext = createContext();

const DataContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [navData, setNavData] = useState([]);
  const [featuredData, setFeaturedData] = useState([]);
  const [loading, setLoading] = useState(true);

  const updateReview = async (review) => {
    try {
      console.log(review);
      const res = await axios.post("http://localhost:8080/review", review);
      //review is an object with _id name rating and review
    } catch (error) {
      console.log(error);
    }
  };

  const placeOrder = async (email, order) => {
    try {
      const res = await axios.post("http://localhost:8080/placeOrder", {
        email,
        order,
      });
      return "success";
    } catch (error) {
      console.log(error);
    }
  };

  // fakeOrder();
  // fakeReview();

  const fetchData = async () => {
    try {
      const {
        data: { products },
      } = await axios.get("http://localhost:8080/products");
      const {
        data: { navData },
      } = await axios.get("http://localhost:8080/nav-data");
      const {
        data: { featuredData },
      } = await axios.get("http://localhost:8080/featured");
      setProducts(products);
      setNavData(navData);
      setFeaturedData(featuredData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <DataContext.Provider
      value={{
        products,
        navData,
        featuredData,
        loading,
        updateReview,
        placeOrder,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContextProvider;
