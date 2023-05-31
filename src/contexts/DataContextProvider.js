import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const DataContext = createContext();

const DataContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [navData, setNavData] = useState([]);
  const [featuredData, setFeaturedData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fakeReview = async () => {
    try {
      const res = await axios.post("http://localhost:8080/review", {
        _id: "646408b385053d9ccf9e4c16",
        email: "ahsanrigu@icloud.com",
        rating: 5,
        review: "blah blah ba",
        name: "Ahsan Rigu",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const fakeOrder = async () => {
    try {
      const res = await axios.post("http://localhost:8080/placeOrder", {
        email: "ahsanrigu@icloud.com",
        order: [
          { _id: "646408b385053d9ccf9e4c14", quantity: 5 },
          { _id: "646408b385053d9ccf9e4c15", quantity: 1 },
          { _id: "646408b385053d9ccf9e4c16", quantity: 1 },
        ],
      });
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
    <DataContext.Provider value={{ products, navData, featuredData, loading }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContextProvider;
