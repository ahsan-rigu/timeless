import axios from "axios";
import React, { createContext, useState } from "react";

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const authorizeToken = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const res = await axios.get("http://localhost:8080/authorize-token", {
          headers: { authorization: `Bearer ${token}` },
        });
        if (res.status === 200) {
          setLoggedIn(true);
        }
      } catch (error) {
        console.log(error); //remove this
        localStorage.setItem("token", null);
      }
    }
  };

  const signIn = async (email, password) => {
    try {
      const {
        data: { token },
      } = await axios.post("http://localhost:8080/sign-in", {
        email,
        password,
      });
      localStorage.setItem("token", token);
      setLoggedIn(true);
    } catch (error) {
      console.log(error);
    }
  };

  const signUp = async (newUser) => {
    try {
      const res = await axios.post("http://localhost:8080/sign-up", newUser);
      localStorage.setItem("localData", null); //remove local cart data because it has been move to cloud data
      signIn(newUser.email, newUser.password);
    } catch (error) {
      console.log(error);
    }
  };

  const signOut = () => {
    localStorage.setItem("token", null);
    setLoggedIn(false);
  };

  const deleteUser = async (email, password) => {
    try {
      const res = await axios.post("http://localhost:8080/deleteUser", {
        email,
        password,
      });
      signOut();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ authorizeToken, signIn, signUp, signOut, deleteUser, loggedIn }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
