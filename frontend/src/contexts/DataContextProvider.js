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
      await axios.post(
        "https://timeless-backend-b17216face60.herokuapp.com/review",
        review
      );
      return "success";
    } catch (error) {
      throw new Error(400);
    }
  };

  const placeOrder = async (email, order) => {
    try {
      await axios.post(
        "https://timeless-backend-b17216face60.herokuapp.com/placeOrder",
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

  const fetchData = async () => {
    try {
      const {
        data: { products },
      } = await axios.get(
        "https://timeless-backend-b17216face60.herokuapp.com/products"
      );
      const {
        data: { navData },
      } = await axios.get(
        "https://timeless-backend-b17216face60.herokuapp.com/nav-data"
      );
      const {
        data: { featuredData },
      } = await axios.get(
        "https://timeless-backend-b17216face60.herokuapp.com/featured"
      );
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
