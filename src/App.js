import { useContext } from "react";
import logo from "./assets/logo.svg";
import { DataContext } from "./contexts/DataContextProvider";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Products from "./pages/products/Products";
import Product from "./pages/product/Product";
import Checkout from "./pages/checkout/Checkout";
import Cart from "./components/cart/Cart";
import Profile from "./components/profile/Profile";

function App() {
  const { loading } = useContext(DataContext);
  return !loading ? (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/products" element={<Products />}></Route>
          <Route path="/product/:prodcutid" element={<Product />}></Route>
          <Route path="/checkout" element={<Checkout />}></Route>
        </Routes>
        <Cart />
        <Profile />
      </main>
      <Footer />
    </>
  ) : (
    <p>Loading</p>
  );
}

export default App;
