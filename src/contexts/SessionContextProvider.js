import React, { createContext, useReducer, useState } from "react";

export const SessionContext = createContext();

const emptyFilterInput = {
  search: "",
  sort: "",
  genders: [],
  brands: [],
  categories: [],
  maxPrice: 250000,
  minRating: 0,
  outOfStock: false,
};

const filterInputReducer = (filterInput, { action, payload }) => {
  switch (action) {
    case "UPDATE_SEARCH": {
      console.log(payload);
      filterInput.search = payload;
      return { ...filterInput };
    }
    case "UPDATE_SORT": {
      filterInput.sort = payload;
      return { ...filterInput };
    }
    case "UPDATE_FILTER_CHECKBOXES": {
      if (payload.checked) {
        filterInput[payload.filterBlock].push(payload.value);
      } else {
        filterInput[payload.filterBlock] = filterInput[
          payload.filterBlock
        ].filter((item) => item !== payload.value);
      }
      return { ...filterInput };
    }
    case "UPDATE_MAX_PRICE": {
      filterInput.maxPrice = Number(payload);
      return { ...filterInput };
    }
    case "UPDATE_MIN_RATING": {
      filterInput.minRating = Number(payload);
      return { ...filterInput };
    }

    case "UPDATE_OOS": {
      filterInput.outOfStock = payload;
      return { ...filterInput };
    }
    case "CLEAR_FILTERBLOCK_CHECKBOXES": {
      filterInput[payload.filterBlock] = [];
      return { ...filterInput };
    }
    case "CLEAR_ALL_FILTERS": {
      filterInput.search = "";
      filterInput.sort = "";
      filterInput.genders = [];
      filterInput.brands = [];
      filterInput.categories = [];
      filterInput.maxPrice = 250000;
      filterInput.minRating = 0;
      filterInput.outOfStock = false;
      return { ...filterInput };
    }
  }
};

console.log(emptyFilterInput);

const SessionContextProvider = ({ children }) => {
  const [cartActive, setCartActive] = useState(false);
  const [wishlistActive, setWishlistActive] = useState(false);
  const [profileActive, setProfileActive] = useState(false);
  const [filterMenuActive, setFilterMenuActive] = useState(false);
  const [searchActive, setSearchActive] = useState(false);

  const [filterInput, dispatchFilterInput] = useReducer(filterInputReducer, {
    ...emptyFilterInput,
  });

  return (
    <SessionContext.Provider
      value={{
        setCartActive,
        setWishlistActive,
        setProfileActive,
        dispatchFilterInput,
        cartActive,
        profileActive,
        wishlistActive,
        filterInput,
        searchActive,
        setSearchActive,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export default SessionContextProvider;
