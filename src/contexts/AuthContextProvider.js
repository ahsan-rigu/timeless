import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

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
        console.log(error);
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
      localStorage.setItem("localData", null);
      signIn(newUser.email, newUser.password);
      if (res.status === 201) {
        //toast something
      }
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
      if (res.status === 201) {
        //toast something
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    authorizeToken();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        authorizeToken,
        signIn,
        signUp,
        signOut,
        deleteUser,
        loggedIn,
        setLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
