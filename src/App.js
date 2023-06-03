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
import Wishlist from "./components/wishlist/Wishlist";
import Search from "./components/search/Search";
import { Toaster } from "react-hot-toast";
import Loader from "./components/loader/Loader";

function App() {
  const { loading } = useContext(DataContext);
  return !loading ? (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/products" element={<Products />}></Route>
          <Route path="/products/:productid" element={<Product />}></Route>
          <Route path="/checkout" element={<Checkout />}></Route>
        </Routes>
        <Cart />
        <Profile />
        <Wishlist />
        <Search />
      </main>
      <Footer />
      <Toaster position="top-center" />
    </>
  ) : (
    <Loader />
  );
}

export default App;
