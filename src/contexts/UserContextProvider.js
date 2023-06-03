import React, {
  Children,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { AuthContext } from "./AuthContextProvider";
import axios from "axios";
import { toast } from "react-hot-toast";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const { loggedIn, setLoggedIn } = useContext(AuthContext);

  const updateUser = async (user) => {
    try {
      const res = await axios.post(
        "https://timeless-backend.onrender.com/updateUser",
        user
      );
      return "success";
    } catch (error) {
      fetchUser();
      throw new Error(400);
    }
  };

  const fetchUser = async () => {
    if (loggedIn) {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const res = await axios.get(
            "https://timeless-backend.onrender.com/fetch-user",
            {
              headers: { authorization: `Bearer ${token}` },
            }
          );
          if (res.status === 200) {
            dispatchUserData({
              action: "SET_USER",
              payload: res.data.user,
            });
            localStorage.setItem("localData", "");
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
          return "success";
        } catch (error) {
          localStorage.setItem("token", null);
          setLoggedIn(false);
        }
      }
    } else {
      if (!localStorage.getItem("localData")) {
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
          if (payload.quantity > 0) {
            toast.promise(updateUser(userData.user), {
              loading: "Adding To Cart...",
              success: "Added To cart",
              error: <b>Cant Add</b>,
            });
          } else {
            toast.promise(updateUser(userData.user), {
              loading: "Removing From Cart",
              success: "Removed From Cart",
              error: <b>Cant Remove!</b>,
            });
          }
          return { ...userData };
        }
        case "REMOVE_FROM_CART": {
          userData.user.cartItems = userData.user.cartItems.filter(
            (item) => item._id !== payload._id
          );
          toast.promise(updateUser(userData.user), {
            loading: "Removing From Cart",
            success: "Removed From Cart",
            error: <b>Cant Remove!</b>,
          });
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
          if (payload.quantity > 0) {
            toast.promise(updateUser(userData.user), {
              loading: "Adding To Wishlist...",
              success: "Added To Wishlist",
              error: <b>Cant Add</b>,
            });
          } else {
            toast.promise(updateUser(userData.user), {
              loading: "Removing From Wishlist",
              success: "Removed From Wishlist",
              error: <b>Cant Remove!</b>,
            });
          }
          return { ...userData };
        }
        case "REMOVE_FROM_WISHLIST": {
          userData.user.wishlistItems = userData.user.wishlistItems.filter(
            (item) => item._id !== payload._id
          );
          toast.promise(updateUser(userData.user), {
            loading: "Removing Form Wishlist...",
            success: "Removed From Wishlist",
            error: <b>Cant remove</b>,
          });
          return { ...userData };
        }
        case "ADD_ADDRESS": {
          userData.user.addresses.push(payload.address);
          toast.promise(updateUser(userData.user), {
            loading: "Adding Address...",
            success: "Address Added",
            error: <b>Cant Add</b>,
          });
          return { ...userData };
        }
        case "REMOVE_ADDRESS": {
          userData.user.addresses = userData.user.addresses.filter(
            (el, index) => index != payload
          );
          toast.promise(updateUser(userData.user), {
            loading: "Removing Address...",
            success: "Address Removed",
            error: <b>Cant Remove</b>,
          });
          return { ...userData };
        }
        case "UPDATE_ADDRESS": {
          userData.user.addresses[payload.index] = payload.address;
          toast.promise(updateUser(userData.user), {
            loading: "Updating Address...",
            success: "Address Updated",
            error: <b>Cant Update</b>,
          });
          return { ...userData };
        }
        case "UPDATE_DELIVERED": {
          userData.user.orders[payload.orderIndex][
            payload.productIndex
          ].delivered = true;
          updateUser(userData.user);
          toast.success("Delivered!");
          return { ...userData };
        }
        case "UPDATE_REVIEW": {
          userData.user.orders[payload.orderIndex][
            payload.productIndex
          ].reviewed = true;
          toast.promise(updateUser(userData.user), {
            loading: " Posting Review...",
            success: "Review Posted",
            error: <b>Review Failed</b>,
          });
          return { ...userData };
        }
        case "CLEAR_CART": {
          userData.user.cartItems = [];
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
          if (payload.quantity > 0) {
            toast.success("Added To Cart");
          } else {
            toast.success("Removed From Cart");
          }
          return { ...userData };
        }
        case "REMOVE_FROM_CART": {
          userData.localUser.cartItems = userData.localUser.cartItems.filter(
            (item) => item._id !== payload._id
          );
          localStorage.setItem("localData", JSON.stringify(userData.localUser));
          toast.success("Removed From Cart");
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
          if (payload.quantity > 0) {
            toast.success("Added To Wishlist");
          } else {
            toast.success("Removed From Wishlist");
          }

          return { ...userData };
        }
        case "REMOVE_FROM_WISHLIST": {
          userData.localUser.wishlistItems =
            userData.localUser.wishlistItems.filter(
              (item) => item._id !== payload._id
            );
          localStorage.setItem("localData", JSON.stringify(userData.localUser));
          toast.success("Removed From Wishlist");
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
    <UserContext.Provider value={{ userData, dispatchUserData, fetchUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
