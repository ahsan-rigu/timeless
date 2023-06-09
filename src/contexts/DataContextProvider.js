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
      const res = await axios.post(
        "https://timeless-backend.onrender.com/review",
        review
      );
      return "success";
    } catch (error) {
      throw new Error(400);
    }
  };

  const placeOrder = async (email, order) => {
    try {
      const res = await axios.post(
        "https://timeless-backend.onrender.com/placeOrder",
        {
          email,
          order,
        }
      );
      return "success";
    } catch (error) {
      throw new Error(400);
    }
  };

  // fakeOrder();
  // fakeReview();

  const fetchData = async () => {
    try {
      const {
        data: { products },
      } = await axios.get("https://timeless-backend.onrender.com/products");
      const {
        data: { navData },
      } = await axios.get("https://timeless-backend.onrender.com/nav-data");
      const {
        data: { featuredData },
      } = await axios.get("https://timeless-backend.onrender.com/featured");
      setProducts(products);
      setNavData(navData);
      setFeaturedData(featuredData);
      return "success";
    } catch (error) {
      throw new Error(400);
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
        setLoading,
        updateReview,
        placeOrder,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContextProvider;
