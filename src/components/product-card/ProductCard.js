import React, { useContext } from "react";
import "./product-card.css";
import { CiHeart } from "react-icons/ci";
import {
  MdFavorite,
  MdOutlineStar,
  MdOutlineStarHalf,
  MdOutlineStarOutline,
} from "react-icons/md";
import Rating from "../Rating";
import { UserContext } from "../../contexts/UserContextProvider";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContextProvider";

const ProductCard = ({
  product: {
    id,
    _id,
    name,
    price,
    brand,
    images: [img],
    category,
    gender,
    quantity,
    discount,
    rating,
  },
}) => {
  const { dispatchUserData, userData } = useContext(UserContext);
  const { loggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  let isInWishList = false;
  if (loggedIn) {
    const index = userData.user.wishlistItems.findIndex(
      (item) => item._id === _id
    );
    if (index !== -1) isInWishList = true;
  } else {
    const index = userData.localUser.wishlistItems.findIndex(
      (item) => item._id === _id
    );
    if (index !== -1) isInWishList = true;
  }

  return (
    <div className="product-card">
      <img
        src={img}
        className="img-card"
        onClick={() => navigate(`/products/${id}`)}
      ></img>
      <div className="container" onClick={() => navigate(`/products/${id}`)}>
        <h4>{brand}</h4>
        <h5>{name}</h5>
        <h5 className="price-individual">
          {discount > 0 && <span className="strikethrough">${price}</span>}$
          {price - (discount * price) / 100}
        </h5>
        <h5>
          For: {gender}
          <Rating rating={rating} size={"1rem"} />
        </h5>
      </div>
      {quantity > 0 ? (
        <button
          className="btn-prime"
          onClick={() =>
            dispatchUserData({
              action: "ADD_TO_CART",
              payload: { _id, quantity: 1 },
            })
          }
        >
          ADD TO CART
        </button>
      ) : (
        <button className="btn-prime btn-disabled">OUT OF STOCK</button>
      )}
      <span className="category">{category}</span>
      {isInWishList ? (
        <MdFavorite
          className="wishlist-icon filled"
          size={24}
          onClick={() =>
            dispatchUserData({
              action: "REMOVE_FROM_WISHLIST",
              payload: { _id },
            })
          }
        />
      ) : (
        <CiHeart
          className="wishlist-icon"
          size={24}
          onClick={() =>
            dispatchUserData({
              action: "ADD_TO_WISHLIST",
              payload: { _id, quantity: 1 },
            })
          }
        />
      )}
    </div>
  );
};

export default ProductCard;
