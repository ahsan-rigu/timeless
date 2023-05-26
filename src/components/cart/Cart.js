import React, { useContext } from "react";
import "./cart.css";
import { CiShoppingCart } from "react-icons/ci";
import { MdOutlineClose } from "react-icons/md";
import { UserContext } from "../../contexts/UserContextProvider";
import { SessionContext } from "../../contexts/SessionContextProvider";
import { AuthContext } from "../../contexts/AuthContextProvider";
import ProductInCart from "../cart-and-wishlist-card/cartAndWishlistCart";

const Cart = () => {
  const { loggedIn } = useContext(AuthContext);
  const { userData } = useContext(UserContext);
  const { setCartActive, cartActive } = useContext(SessionContext);

  const items = loggedIn
    ? userData.user.cartItems
    : userData.localUser.cartItems;

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
          {items.length > 0 &&
            items.map(({ _id, quantity }) => (
              <ProductInCart key={_id} _id={_id} quantity={quantity} fromCart />
            ))}
        </div>
        <footer>
          {loggedIn ? (
            <button>
              {"$40000"}
              {" | CHEKOUT->"}
            </button>
          ) : (
            <button>LOG IN</button>
          )}
        </footer>
      </div>
    </div>
  );
};

export default Cart;
