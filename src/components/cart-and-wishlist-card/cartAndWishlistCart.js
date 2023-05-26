import React, { useContext } from "react";
import "./cart-and-wishlist-card.css";
import { BsArrowBarRight } from "react-icons/bs";
import { CiHeart, CiShoppingCart } from "react-icons/ci";
import { DataContext } from "../../contexts/DataContextProvider";

const ProductInCart = ({ _id, quantity, fromCart, fromWishlist }) => {
  const { products } = useContext(DataContext);

  const {
    brand,
    name,
    images: [image],
    price,
  } = products.find((product) => product._id === _id);

  return (
    <div className="product-in-cart">
      <img src={image} className="thumbnail-for-list" />
      <div className="content">
        <h4>{brand}</h4>
        <h5>{name}</h5>
        <h5 className="price-individual">$ {price}</h5>
        <span className="container-counter">
          <button>+</button>
          <input type="text" value={quantity} onChange={() => "null"} />
          <button>-</button>
        </span>
        <span className="price-total">${price * quantity}</span>
        {fromCart && (
          <div className="icon-top-right">
            {" "}
            <BsArrowBarRight size={24} />
            <CiHeart size={24} />
          </div>
        )}
        {fromWishlist && (
          <div className="icon-top-right">
            {" "}
            <BsArrowBarRight size={24} />
            <CiShoppingCart size={24} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductInCart;
