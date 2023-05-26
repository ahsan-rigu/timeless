import React, { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContextProvider";

const SignUpForm = ({ setFlipped }) => {
  const { signUp } = useContext(AuthContext);

  const handleSignUp = (event) => {
    event.preventDefault();
    const { wishlistItems, cartItems } = JSON.parse(
      localStorage.getItem("localData")
    );
    const newUser = {
      name: event.target[0].value,
      email: event.target[1].value,
      password: event.target[2].value,
      wishlistItems,
      cartItems,
      addresses: [
        {
          type: event.target[3].value,
          street: event.target[4].value,
          city: event.target[5].value,
          state: event.target[6].value,
          zip: event.target[7].value,
        },
      ],
    };
    signUp(newUser);
  };
  return (
    <form onSubmit={handleSignUp} className="signup-form">
      <h3>Sign Up</h3>
      <label>
        NAME
        <input type="text"></input>
      </label>
      <label>
        EMAIL
        <input type="email"></input>
      </label>
      <label>
        PASSWORD
        <input type="password"></input>
      </label>
      <label className="address">
        ADDRESS
        <input type="text" placeholder="type"></input>
        <input type="text" placeholder="street"></input>
        <input type="text" placeholder="City" className="inline"></input>
        <label className="wrapper-l">
          <input type="text" placeholder="State" className="inline"></input>
          <input type="number" placeholder="PIN" className="inline"></input>
        </label>
      </label>
      <button type="submit">CREATE YOUR ACCOUNT</button>
      <button
        className="btn-secondary"
        type="button"
        onClick={() => setFlipped(false)}
      >
        SIGN IN INSTEAD
      </button>
    </form>
  );
};

export default SignUpForm;
