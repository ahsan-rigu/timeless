import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { DataContext } from "../../contexts/DataContextProvider";
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";
import { CiHeart } from "react-icons/ci";
import { MdFavorite } from "react-icons/md";
import "./product.css";
import Rating from "../../components/Rating";
import { UserContext } from "../../contexts/UserContextProvider";
import { AuthContext } from "../../contexts/AuthContextProvider";

const Product = () => {
  const { productid } = useParams();
  const { products } = useContext(DataContext);
  const { dispatchUserData, userData } = useContext(UserContext);
  const { loggedIn } = useContext(AuthContext);
  const [noToAdd, setNoToAdd] = useState(1);
  const [currentImage, setCurrentImage] = useState(0);

  const {
    _id,
    id,
    brand,
    name,
    images,
    price,
    category,
    gender,
    description,
    features,
    quantity,
    rating,
    estimatedDeliveryTime,
  } = products.find(({ id }) => id == productid);

  let isInWishList = false;

  console.log(userData);

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
    <section name="product" className="container-listing">
      <section name="priduct-images" className="product-images">
        <img src={images[currentImage]} className="selected-image" />
        <div name="slider controls" className="slider-controls">
          <button
            onClick={() =>
              setCurrentImage((prev) =>
                prev > 0 ? prev - 1 : images.length - 1
              )
            }
          >
            <BsArrowLeftCircle size={"2rem"} />
          </button>
          {images.map((img, index) => (
            <label
              className="thumbnail"
              style={{ backgroundImage: `url(${images[index]})` }}
              key={img}
            >
              <input
                type="radio"
                name="slider"
                checked={currentImage === index}
                onChange={() => setCurrentImage(index)}
              />
            </label>
          ))}
          <button
            onClick={() =>
              setCurrentImage((prev) =>
                prev < images.length - 1 ? prev + 1 : 0
              )
            }
          >
            <BsArrowRightCircle size={"2rem"} />
          </button>
        </div>
      </section>
      <section className="product-content">
        <h2 className="brand-name">{name}</h2>
        <h3>By: {brand}</h3>
        <h4>
          How Much: <b>${price}</b>{" "}
          <button className="wish-button">
            {isInWishList ? (
              <MdFavorite
                className="wishlist-icon filled"
                size={"2rem"}
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
                size={"2rem"}
                onClick={() =>
                  dispatchUserData({
                    action: "ADD_TO_WISHLIST",
                    payload: { _id, quantity: 1 },
                  })
                }
              />
            )}
          </button>
        </h4>
        <section name="features" className="features">
          {features.map((feat) => (
            <span className="feature-pill" key={feat}>
              {feat}
            </span>
          ))}
        </section>
        <p>{description}</p>
        <div name="category and gender" className="container">
          <span name="category">Category: {category}</span>
          <span name="gender">For: {gender}</span>
        </div>
        <div className="container">
          <span>
            Quantity:{" "}
            <label className="container-counter">
              <button
                disabled={noToAdd === 1}
                onClick={() => setNoToAdd((prev) => prev - 1)}
              >
                -
              </button>
              <input type="text" value={noToAdd} readOnly={true} />
              <button onClick={() => setNoToAdd((prev) => prev + 1)}>+</button>
            </label>
            {quantity === 0 && <label className="right">out of stock</label>}
          </span>
          <span>
            Rating: <Rating rating={rating} size={"1.5rem"} />
          </span>
        </div>
        <button
          className="button-primary"
          onClick={() =>
            dispatchUserData({
              action: "ADD_TO_CART",
              payload: { _id, quantity: noToAdd },
            })
          }
        >
          ADD TO CART
        </button>
      </section>
    </section>
  );
};

export default Product;
