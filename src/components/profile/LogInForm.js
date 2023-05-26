import React, { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContextProvider";

const LogInForm = ({ setFlipped }) => {
  const { signIn } = useContext(AuthContext);

  const handleLogIn = (event) => {
    event.preventDefault();
    const email = event.target[0].value;
    const password = event.target[1].value;
    signIn(email, password);
  };

  return (
    <form onSubmit={handleLogIn} className="login-form">
      <h3>Sign In</h3>
      <label>
        EMAIL
        <input type="email" name="email" />
      </label>
      <label>
        PASSWORD
        <input type="password" name="password" />
      </label>
      <button type="submit" className="btn-primary">
        LOG IN
      </button>
      <button
        className="btn-secondary"
        type="button"
        onClick={() => setFlipped(true)}
      >
        SIGN UP
      </button>
    </form>
  );
};

export default LogInForm;
