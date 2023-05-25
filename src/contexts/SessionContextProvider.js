import React, { createContext, useReducer, useState } from "react";

const SessionContext = createContext();

const emptyFilterInput = {
  sort: "",
  genders: [],
  categories: [],
  maxPrice: Infinity,
  minRating: 0,
  outOfStock: false,
};

const filterInputReducer = (filterInput, { action, payload }) => {
  switch (action) {
    case "UPDATE_SEARCH": {
      filterInput.search = payload;
      return { ...filterInput };
    }
    case "UPDATE_FILTER_CHECKBOXES": {
      if (payload.checked) {
        filterInput[payload.filterBlock].push(payload.value);
      } else {
        filterInput[payload.filterBlock] = filterInput[
          payload.filterBlock
        ].filter((item) => item !== payload.value);
        console.log(filterInput);
      }
      return { ...filterInput };
    }
    case "UPDATE_MAX_PRICE": {
      filterInput.maxPrice = payload;
      return { ...filterInput };
    }
    case "UPDATE_MIN_RATING": {
      filterInput.minRating = payload;
      return { ...filterInput };
    }
    case "CLEAR_FILTERBLOCK_CHECKBOXES": {
      filterInput[payload.filterBlock] = [];
      return { ...filterInput };
    }
    case "CLEAR_ALL_FILTERS": {
      return { ...emptyFilterInput };
    }
  }
};

const SessionContextProvider = ({ children }) => {
  const [cartActive, setCartActive] = useState(false);
  const [wishlistActive, setWishlisttActive] = useState(false);
  const [profileActive, setProfileActive] = useState(false);
  const [filterMenuActive, setFilterMenuActive] = useState(false);

  const [filterInput, dispatchFilterInput] = useReducer(
    filterInputReducer,
    emptyFilterInput
  );

  return (
    <SessionContext.Provider value={{}}>{children}</SessionContext.Provider>
  );
};

export default SessionContextProvider;
