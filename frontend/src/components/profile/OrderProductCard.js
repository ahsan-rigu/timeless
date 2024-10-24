import React, { useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContextProvider";
import { DataContext } from "../../contexts/DataContextProvider";
import { useNavigate } from "react-router-dom";

const OrderProductCard = ({
  product: { _id, quantity, reviewed, delivered, orderIndex, productIndex },
}) => {
  const [showReviewModel, setShowReviewModal] = useState(false);
  const { products, updateReview } = useContext(DataContext);
  const { dispatchUserData, userData } = useContext(UserContext);
  const navigate = useNavigate();
  const {
    brand,
    name,
    id,
    images: [image],
    price,
    discount,

    estimatedDeliveryTime,
  } = products.find((product) => product._id === _id);

  const handleDelivered = () => {
    dispatchUserData({
      action: "UPDATE_DELIVERED",
      payload: { orderIndex, productIndex },
    });
  };

  const handleReviewed = (event) => {
    event.preventDefault();
    const rating = Number(event.target[0].value);
    const review = event.target[1].value;
    console.log(rating, review);
    updateReview({
      _id,
      name: userData.user.name,
      rating: rating * 2,
      review,
      email: userData.user.email,
    });
    dispatchUserData({
      action: "UPDATE_REVIEW",
      payload: { orderIndex, productIndex },
    });
    setShowReviewModal(false);
  };

  return (
    <article className="product-in-cart">
      <img
        alt={image}
        src={image}
        className="thumbnail-for-list"
        onClick={() => navigate("/products/" + id)}
      />
      <div className="content">
        <h4>{brand}</h4>
        <h5>{name}</h5>
        <h5 className="price-individual">
          {discount > 0 && <span className="strikethrough">${price}</span>}$
          {price - (discount * price) / 100}
        </h5>
        {!delivered ? (
          <>
            <h5>Estimated Delivery time: {estimatedDeliveryTime} days</h5>
            <button className="review-btn" onClick={handleDelivered}>
              Delivered?
            </button>
          </>
        ) : !reviewed ? (
          <button
            className="review-btn"
            onClick={() => setShowReviewModal(true)}
          >
            Review
          </button>
        ) : (
          <p className="review-btn">Reviewed</p>
        )}
      </div>
      {showReviewModel && (
        <>
          <div
            className="off-click-handler modal-off"
            onClick={() => setShowReviewModal(false)}
          >
            {" "}
          </div>
          <form onSubmit={handleReviewed} className="review-form modal">
            <label>
              Rating
              <input
                type="range"
                defaultValue={5}
                min={1}
                max={5}
                step={1}
              />{" "}
            </label>
            <label>
              Review
              <textarea type="text" placeholder="write your review" />
            </label>
            <button type="submit">Submit</button>
          </form>
        </>
      )}
    </article>
  );
};

export default OrderProductCard;
