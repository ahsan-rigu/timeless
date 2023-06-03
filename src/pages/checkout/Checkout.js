import React, { useContext, useEffect, useState } from "react";
import "./checkout.css";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../contexts/DataContextProvider";
import { AuthContext } from "../../contexts/AuthContextProvider";
import { UserContext } from "../../contexts/UserContextProvider";
import Nothing from "../../components/Nothing";
import ProductInCart from "../../components/cart-and-wishlist-card/cartAndWishlistCart";
import Address from "../../components/profile/Address";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-hot-toast";

const Checkout = () => {
  const coupons = [
    { code: "HELLO10", price: 0.9 },
    { code: "HELLO15", price: 0.85 },
    { code: "HELLO30", price: 0.7 },
  ];
  var addAddressForm = document.querySelector("#addAddress");
  const [activeCoupon, setActiveCoupon] = useState(0);
  const navigate = useNavigate();
  const { products, placeOrder } = useContext(DataContext);
  const { loggedIn } = useContext(AuthContext);
  const { userData, dispatchUserData, fetchUser } = useContext(UserContext);

  const items = userData.user.cartItems;

  if (!loggedIn || items.length < 1) {
    navigate("/");
  }

  const addAddress = (event) => {
    event.preventDefault();
    const address = {
      name: event.target[0].value,
      phone: event.target[1].value,
      street: event.target[2].value,
      city: event.target[3].value,
      state: event.target[4].value,
      pin: event.target[5].value,
    };
    addAddressForm.reset();
    dispatchUserData({ action: "ADD_ADDRESS", payload: { address } });
  };

  const totalPrice = items.reduce((acc, { _id, quantity }) => {
    const { price, discount } = products.find((product) => product._id === _id);
    return (price - (discount * price) / 100) * quantity + acc;
  }, 0);

  const validiateCoupon = (e) => {
    const coupon = coupons.find(({ code }) => code === e.target.value);
    if (coupon) {
      setActiveCoupon(coupon.price);
    } else {
      setActiveCoupon(0);
    }
  };

  const handlePlaceOrder = async () => {
    try {
      const res = await placeOrder(
        userData.user.email,
        userData.user.cartItems
      );
      await fetchUser();
      dispatchUserData({ action: "CLEAR_CART" });
      toast.success("Order Placed!");
    } catch (error) {
      toast.error("Order Failed!");
    } finally {
      navigate("/");
    }
  };

  const verifyPayment = async () => {
    const options = {
      key: "rzp_test_ixmrdq6mjGP3f2",
      amount: totalPrice * (activeCoupon || 1) * 100,
      currency: "INR",
      name: "TIMELESS",
      description: "WHY BE TIMEBOUND",
      handler: handlePlaceOrder,
      theme: {
        color: "#fff5f2",
      },
    };
    const razor = new window.Razorpay(options);
    razor.open();
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="checkout-page">
      <section className="checkout-addresses">
        <header>addresses</header>
        <div className="container-address">
          {userData.user.addresses?.map((address, index) => (
            <>
              <input
                type="radio"
                name="selected-address"
                className="radio-address"
              />
              <Address
                key={"address-list" + index}
                address={address}
                index={index}
              />
            </>
          ))}
        </div>
        <details className="details-form">
          <summary>Add Address</summary>
          <form id="addAddress" onSubmit={addAddress}>
            <label>
              Name
              <input
                type="text"
                required={true}
                placeholder="name"
                defaultValue={"Mr Nemo"}
              ></input>
            </label>
            <label>
              Phone
              <input
                type="number"
                required={true}
                placeholder="phone"
                defaultValue={"0000000000"}
              ></input>
            </label>
            <label>
              Street
              <input
                type="text"
                required={true}
                placeholder="street"
                defaultValue={"Nowhere I am nothing"}
              ></input>
            </label>
            <label>
              City
              <input
                type="text"
                required={true}
                placeholder="city"
                defaultValue={"Electricity?"}
              ></input>
            </label>
            <label>
              State
              <input
                type="text"
                required={true}
                placeholder="state"
                defaultValue={"Liquid"}
              ></input>
            </label>
            <label>
              Area Code
              <input
                type="number"
                required={true}
                placeholder="pin"
                defaultValue={"000000"}
              ></input>
            </label>
            <button type="submit" className="btn-submit">
              ADD
            </button>
          </form>
        </details>
      </section>

      <section className="checkout-payment">
        <header>payment</header>
        <div>
          <h5>
            Price Before Tax:<span>${totalPrice * 0.9}</span>
          </h5>
          <h5>
            Tax :<span>${totalPrice * 0.1}</span>
          </h5>
          <h4>
            Total Before Coupons:<span>${totalPrice}</span>
          </h4>
          <h5>
            Coupon: <input type="text" onChange={validiateCoupon} />
          </h5>
          {
            <h5>
              Coupon Discount:{" "}
              <span>{Math.round((1 - activeCoupon) * 100)}</span>%{" "}
            </h5>
          }
          <h4>
            Final Price:<span>${totalPrice * (activeCoupon || 1)}</span>{" "}
          </h4>
        </div>
        <button onClick={verifyPayment}>PAY</button>
      </section>
      <section className="checkout-products">
        <header>order summary</header>
        {items.length > 0 ? (
          items.map(({ _id, quantity }) => (
            <ProductInCart key={_id} _id={_id} quantity={quantity} fromCart />
          ))
        ) : (
          <Nothing />
        )}
      </section>
    </div>
  );
};

export default Checkout;
