import React, { useContext } from "react";
import { CiHeart } from "react-icons/ci";
import { MdOutlineClose } from "react-icons/md";
import { BsArrowBarRight } from "react-icons/bs";
import { SessionContext } from "../../contexts/SessionContextProvider";
import { AuthContext } from "../../contexts/AuthContextProvider";
import ProductInCart from "../cart-and-wishlist-card/cartAndWishlistCart";
import { UserContext } from "../../contexts/UserContextProvider";
import Nothing from "../Nothing";

const Wishlist = () => {
  const { wishlistActive, setWishlistActive, setCartActive } =
    useContext(SessionContext);

  const { loggedIn } = useContext(AuthContext);
  const { userData } = useContext(UserContext);

  const items = loggedIn
    ? userData.user.wishlistItems
    : userData.localUser.wishlistItems;

  return (
    <section
      className={
        wishlistActive ? "wishlist-container active" : "wishlist-container"
      }
    >
      <section name="wishlist" className="wishlist-actual">
        <header>
          <CiHeart className="icon" size={"1.5rem"} />
          <h4>Your wishlist</h4>
          <MdOutlineClose
            className="icon"
            onClick={() => setWishlistActive((prev) => !prev)}
            size={"1.5rem"}
          />
        </header>
        <div className="wishlist-products">
          {items.length > 0 ? (
            items.map(({ _id, quantity }) => (
              <ProductInCart
                key={_id}
                _id={_id}
                quantity={quantity}
                fromWishlist
              />
            ))
          ) : (
            <Nothing />
          )}
        </div>
        <footer>
          <button
            onClick={() => setCartActive(true) || setWishlistActive(false)}
            className="btn-sec"
          >
            {"GO TO CART ->"}
          </button>
        </footer>
      </section>
    </section>
  );
};

export default Wishlist;
