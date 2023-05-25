const userDataReducer = (userData, { action, payload }) => {
  const [loggedIn, updateUser] = [false, () => "null"];
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

export default userDataReducer;
