import React, { useContext } from "react";
import "./cart-and-wishlist-card.css";
import { BsArrowBarRight } from "react-icons/bs";
import { CiHeart, CiShoppingCart, CiTrash } from "react-icons/ci";
import { DataContext } from "../../contexts/DataContextProvider";
import { UserContext } from "../../contexts/UserContextProvider";

const ProductInCart = ({ _id, quantity, fromCart, fromWishlist }) => {
  const { products } = useContext(DataContext);
  const { dispatchUserData } = useContext(UserContext);

  const {
    brand,
    name,
    images: [image],
    price,
    discount,
    quantity: inStock,
  } = products.find((product) => product._id === _id);

  let moveHandler;
  let removeHandler;
  let addHandler;

  if (fromCart) {
    moveHandler = () => {
      dispatchUserData({
        action: "ADD_TO_WISHLIST",
        payload: { _id, quantity },
      });
      dispatchUserData({ action: "REMOVE_FROM_CART", payload: { _id } });
    };
    removeHandler = () => {
      dispatchUserData({ action: "REMOVE_FROM_CART", payload: { _id } });
    };
    addHandler = (toAdd) => {
      if (quantity <= inStock) {
        dispatchUserData({
          action: "ADD_TO_CART",
          payload: { _id, quantity: toAdd },
        });
      }
    };
  }

  if (fromWishlist) {
    moveHandler = () => {
      dispatchUserData({ action: "ADD_TO_CART", payload: { _id, quantity } });
      dispatchUserData({ action: "REMOVE_FROM_WISHLIST", payload: { _id } });
    };
    removeHandler = () => {
      dispatchUserData({ action: "REMOVE_FROM_WISHLIST", payload: { _id } });
    };
    addHandler = (toAdd) => {
      dispatchUserData({
        action: "ADD_TO_WISHLIST",
        payload: { _id, quantity: toAdd },
      });
    };
  }

  return (
    <article className="product-in-cart">
      <img src={image} className="thumbnail-for-list" />
      <div className="content">
        <h4>{brand}</h4>
        <h5>{name}</h5>
        <h5 className="price-individual">
          {discount > 0 && <span className="strikethrough">${price}</span>}$
          {price - (discount * price) / 100}
        </h5>
        <span className="flex-center">
          <span className="container-counter">
            <button disabled={quantity === 1} onClick={() => addHandler(-1)}>
              -
            </button>
            <input type="number" value={quantity} readOnly />
            <button onClick={() => addHandler(1)}>+</button>
          </span>
          <button onClick={removeHandler}>
            <CiTrash size={"1.5rem"} className="clr-red" />
          </button>
          <span className="price-total">
            ${(price - (discount * price) / 100) * quantity}
          </span>
        </span>
        {fromCart && (
          <button
            className="icon-top-right"
            onClick={moveHandler}
            title="Move To Wishlist"
          >
            {" "}
            <BsArrowBarRight size={"1.5rem"} />
            <CiHeart size={"1.5rem"} />
          </button>
        )}
        {fromWishlist && (
          <button
            className="icon-top-right"
            onClick={moveHandler}
            title="Move To Cart"
          >
            {" "}
            <BsArrowBarRight size={"1.5rem"} />
            <CiShoppingCart size={"1.5rem"} />
          </button>
        )}
      </div>
    </article>
  );
};

export default ProductInCart;
