import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const DataContext = createContext();

const DataContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [navData, setNavData] = useState([]);
  const [featuredData, setFeaturedData] = useState([]);
  const [loading, setLoading] = useState(true);

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
    <DataContext.Provider value={{ products, navData, featuredData, loading }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContextProvider;
