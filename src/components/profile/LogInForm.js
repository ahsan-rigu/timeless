import React, { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContextProvider";
import { toast } from "react-hot-toast";

const LogInForm = ({ setFlipped }) => {
  const { signIn } = useContext(AuthContext);

  const handleLogIn = (event) => {
    event.preventDefault();
    const email = event.target[0].value;
    const password = event.target[1].value;
    toast.promise(signIn(email, password), {
      loading: "Logging in...",
      success: <b>Logged In</b>,
      error: <b>Cant find user</b>,
    });
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
