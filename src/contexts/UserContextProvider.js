import React, {
  Children,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { AuthContext } from "./AuthContextProvider";
import axios from "axios";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const { loggedIn, setLoggedIn } = useContext(AuthContext);

  const updateUser = async (user) => {
    const updateUser = async (user) => {
      try {
        dispatchUserData({
          action: "SET_USER",
          payload: user,
        });
        const res = await axios.post(
          "http://localhost:8080/updateUser",
          userData
        );
      } catch (error) {
        fetchUser();
        console.log(error);
      }
    };
  };

  const fetchUser = async () => {
    if (loggedIn) {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const res = await axios.get("http://localhost:8080/fetch-user", {
            headers: { authorization: `Bearer ${token}` },
          });
          if (res.status === 200) {
            dispatchUserData({
              action: "SET_USER",
              payload: res.data.user,
            });
            localStorage.setItem("localData", null);
            userData.localUser.wishlistItems.map((item) => {
              dispatchUserData({
                action: "ADD_TO_WISHLIST",
                payload: item,
              });
            });
            userData.localUser.cartItems.map((item) => {
              dispatchUserData({
                action: "ADD_TO_CART",
                payload: item,
              });
            });
          }
        } catch (error) {
          localStorage.setItem("token", null);
          setLoggedIn(false);
        }
      }
    } else {
      if (localStorage.getItem("localData") === "null") {
        localStorage.setItem(
          "localData",
          JSON.stringify({ wishlistItems: [], cartItems: [] })
        );
      }
      dispatchUserData({
        action: "SET_USER",
        payload: JSON.parse(localStorage.getItem("localData")),
      });
    }
  };

  const userDataReducer = (userData, { action, payload }) => {
    if (loggedIn) {
      switch (action) {
        case "SET_USER": {
          userData.user = payload;
          return { ...userData };
        }
        case "ADD_TO_CART": {
          const index = userData.user.cartItems.findIndex(
            (item) => item._id === payload._id
          );
          if (index === -1) {
            userData.user.cartItems.push(payload);
          } else {
            userData.user.cartItems[index] = {
              _id: payload._id,
              quantity:
                userData.user.cartItems[index].quantity + payload.quantity,
            };
          }
          updateUser(userData.user);
          return { ...userData };
        }
        case "REMOVE_FROM_CART": {
          userData.user.cartItems = userData.user.cartItems.filter(
            (item) => item._id !== payload._id
          );
          updateUser(userData.user);
          return { ...userData };
        }
        case "ADD_TO_WISHLIST": {
          const index = userData.user.wishlistItems.findIndex(
            (item) => item._id === payload._id
          );
          if (index === -1) {
            userData.user.wishlistItems.push(payload);
          } else {
            userData.user.wishlistItems[index] = {
              _id: payload._id,
              quantity:
                userData.user.wishlistItems[index].quantity + payload.quantity,
            };
          }
          updateUser(userData.user);
          return { ...userData };
        }
        case "REMOVE_FROM_WISHLIST": {
          userData.user.wishlistItems = userData.user.wishlistItems.filter(
            (item) => item._id !== payload._id
          );
          updateUser(userData.user);
          return { ...userData };
        }
        case "ADD_ADDRESS": {
          updateUser.addresses.push(payload.address);
          updateUser(userData.user);
          return { ...userData };
        }
        case "REMOVE_ADDRESS": {
          userData.user.addresses = updateUser.adresses.filter(
            ({ type }) => type === payload.name
          );
          updateUser(userData.user);
          return { ...userData };
        }
      }
    } else {
      switch (action) {
        case "SET_USER": {
          userData.localUser = payload;
          return { ...userData };
        }
        case "ADD_TO_CART": {
          const index = userData.localUser.cartItems.findIndex(
            (item) => item._id === payload._id
          );
          if (index === -1) {
            userData.localUser.cartItems.push(payload);
          } else {
            userData.localUser.cartItems[index] = {
              _id: payload._id,
              quantity:
                userData.localUser.cartItems[index].quantity + payload.quantity,
            };
          }
          localStorage.setItem("localData", JSON.stringify(userData.localUser));
          return { ...userData };
        }
        case "REMOVE_FROM_CART": {
          userData.localUser.cartItems = userData.localUser.cartItems.filter(
            (item) => item._id !== payload._id
          );
          localStorage.setItem("localData", JSON.stringify(userData.localUser));
          return { ...userData };
        }
        case "ADD_TO_WISHLIST": {
          const index = userData.localUser.wishlistItems.findIndex(
            (item) => item._id === payload._id
          );
          if (index === -1) {
            userData.localUser.wishlistItems.push(payload);
          } else {
            userData.localUser.wishlistItems[index] = {
              _id: payload._id,
              quantity:
                userData.localUser.wishlistItems[index].quantity +
                payload.quantity,
            };
          }
          localStorage.setItem("localData", JSON.stringify(userData.localUser));
          return { ...userData };
        }
        case "REMOVE_FROM_WISHLIST": {
          userData.localUser.wishlistItems =
            userData.localUser.wishlistItems.filter(
              (item) => item._id !== payload._id
            );
          localStorage.setItem("localData", JSON.stringify(userData.localUser));
          return { ...userData };
        }
      }
    }
  };

  const [userData, dispatchUserData] = useReducer(userDataReducer, {
    user: { cartItems: [], wishlistItems: [] },
    localUser: { cartItems: [], wishlistItems: [] },
  });

  useEffect(() => {
    fetchUser();
  }, [loggedIn]);

  return (
    <UserContext.Provider value={{ userData }}>{children}</UserContext.Provider>
  );
};

export default UserContextProvider;
