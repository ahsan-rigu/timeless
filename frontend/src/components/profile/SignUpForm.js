import React, { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContextProvider";
import { toast } from "react-hot-toast";

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
      addresses: [],
    };
    toast.promise(signUp(newUser), {
      loading: "Creating Your Account...",
      success: <b>Account Created!</b>,
      error: <b>Email Already Exists!</b>,
    });
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
