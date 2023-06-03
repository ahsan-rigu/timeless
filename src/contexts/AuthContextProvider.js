import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const authorizeToken = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const res = await axios.get(
          "https://timeless-backend.onrender.com/authorize-token",
          {
            headers: { authorization: `Bearer ${token}` },
          }
        );
        if (res.status === 200) {
          toast.success("Welcome Back!");
          setLoggedIn(true);
          return 200;
        }
      } catch (error) {
        toast.error("Logged Out");
        localStorage.setItem("token", null);
      }
    }
  };

  const signIn = async (email, password) => {
    try {
      const {
        data: { token },
      } = await axios.post("https://timeless-backend.onrender.com/sign-in", {
        email,
        password,
      });
      localStorage.setItem("token", token);
      setLoggedIn(true);
      return "success";
    } catch (error) {
      throw new Error(400);
    }
  };

  const signUp = async (newUser) => {
    try {
      const res = await axios.post(
        "https://timeless-backend.onrender.com/sign-up",
        newUser
      );
      localStorage.setItem("localData", null);
      signIn(newUser.email, newUser.password);
      return "success";
    } catch (error) {
      throw new Error(400);
    }
  };

  const signOut = () => {
    localStorage.setItem("token", "");
    toast.success("Logged Out");
    setLoggedIn(false);
  };

  const deleteUser = async (email, password) => {
    try {
      const res = await axios.post(
        "https://timeless-backend.onrender.com/deleteUser",
        {
          email,
          password,
        }
      );
      if (res.status === 202) {
        signOut();
        return "success";
      } else {
        throw new Error(400);
      }
    } catch (error) {
      throw new Error(400);
    }
  };

  const changePassword = async (email, password, newPassword) => {
    try {
      const res = await axios.post(
        "https://timeless-backend.onrender.com/changePassword",
        {
          email,
          password,
          newPassword,
        }
      );
      console.log(res);
      if (res.status === 202) {
        return "success";
      }
      throw new Error(400);
    } catch (error) {
      throw new Error(400);
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
        changePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
