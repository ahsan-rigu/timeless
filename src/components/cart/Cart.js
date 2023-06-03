import React, { useContext } from "react";
import "./cart.css";
import { CiShoppingCart } from "react-icons/ci";
import { MdOutlineClose } from "react-icons/md";
import { UserContext } from "../../contexts/UserContextProvider";
import { SessionContext } from "../../contexts/SessionContextProvider";
import { AuthContext } from "../../contexts/AuthContextProvider";
import ProductInCart from "../cart-and-wishlist-card/cartAndWishlistCart";
import Nothing from "../Nothing";
import { DataContext } from "../../contexts/DataContextProvider";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const { products } = useContext(DataContext);
  const { loggedIn } = useContext(AuthContext);
  const { userData } = useContext(UserContext);
  const { setCartActive, cartActive, setProfileActive } =
    useContext(SessionContext);

  const items = loggedIn
    ? userData.user.cartItems
    : userData.localUser.cartItems;

  const totalPrice = items.reduce((acc, { _id, quantity }) => {
    const { price, discount } = products.find((product) => product._id === _id);
    return (price - (discount * price) / 100) * quantity + acc;
  }, 0);

  return (
    <div className={cartActive ? "cart-container active" : "cart-container"}>
      <div className="cart-actual">
        <header>
          <CiShoppingCart className="icon" size={"1.5rem"} />
          <h4>your cart</h4>
          <MdOutlineClose
            className="icon"
            onClick={() => setCartActive((prev) => !prev)}
            size={"1.5rem"}
          />
        </header>
        <div className="cart-products">
          {items.length > 0 ? (
            items.map(({ _id, quantity }) => (
              <ProductInCart key={_id} _id={_id} quantity={quantity} fromCart />
            ))
          ) : (
            <Nothing />
          )}
        </div>
        <footer>
          {loggedIn ? (
            items.length > 0 && (
              <button
                onClick={() => navigate("/checkout") || setCartActive(false)}
              >{`$${totalPrice} | CHECKOUT->`}</button>
            )
          ) : (
            <button onClick={() => setProfileActive(true)}>LOG IN</button>
          )}
        </footer>
      </div>
    </div>
  );
};

export default Cart;
