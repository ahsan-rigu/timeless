import React, { useContext, useState } from "react";
import {
  CiShoppingCart,
  CiUser,
  CiHeart,
  CiSearch,
  CiMenuBurger,
} from "react-icons/ci";
import "./header.css";
import { Link } from "react-router-dom";
import { SessionContext } from "../../contexts/SessionContextProvider";
import { DataContext } from "../../contexts/DataContextProvider";
const Header = () => {
  const { dispatchFilterInput } = useContext(SessionContext);
  const [mobileNavActive, setMobileNavActive] = useState(false);

  const setGenderAndCategory = (gender, category) => {
    dispatchFilterInput({ action: "CLEAR_ALL_FILTERS" });

    if (gender !== "All") {
      dispatchFilterInput({
        action: "UPDATE_FILTER_CHECKBOXES",
        payload: {
          checked: true,
          filterBlock: "genders",
          value: gender,
        },
      });
    }
    if (category) {
      dispatchFilterInput({
        action: "UPDATE_FILTER_CHECKBOXES",
        payload: {
          checked: true,
          filterBlock: "categories",
          value: category,
        },
      });
    }
  };

  const {
    setProfileActive,
    setWishlistActive,
    setCartActive,
    setSearchActive,
  } = useContext(SessionContext);
  const { navData } = useContext(DataContext);
  return (
    <div className="wrapper">
      <header className="header-main">
        <Link to="/" className="logo">
          TIMELESS
        </Link>
        <nav className={mobileNavActive ? "active" : "inactive"}>
          <ul>
            {navData.map(({ _id, gender, image, categories }) => (
              <li className="nav-collection" key={_id}>
                <Link
                  className="nav-collection-button"
                  to="/products"
                  onClick={() => setGenderAndCategory(gender)}
                >
                  {gender}
                </Link>
                <aside className="nav-category-dropdown">
                  {categories.map(({ category, image }) => (
                    <figure
                      className="nav-category-card"
                      key={"nav-category-card" + category}
                    >
                      <Link
                        to="/products"
                        onClick={() => setGenderAndCategory(gender, category)}
                      >
                        <img src={image} className="pointer" />
                      </Link>
                      <Link
                        to="/products"
                        onClick={() => setGenderAndCategory(gender, category)}
                      >
                        {category}
                      </Link>
                    </figure>
                  ))}
                </aside>
              </li>
            ))}
          </ul>
        </nav>
        <CiMenuBurger
          size={"1.5rem"}
          className="menu-icon icon"
          onClick={() => setMobileNavActive((prev) => !prev)}
        />
        <CiSearch
          size={24}
          className="search-icon icon"
          onClick={() => setSearchActive((prev) => !prev)}
        />
        <CiUser
          onClick={() => setProfileActive((prev) => !prev)}
          size={"1.5rem"}
          className="user-icon icon"
        />
        <CiHeart
          onClick={() => setWishlistActive((prev) => !prev)}
          size={"1.5rem"}
          className="wishlist-icon icon"
        />
        <CiShoppingCart
          onClick={() => setCartActive((prev) => !prev)}
          size={"1.5rem"}
          className="cart-icon icon"
        />
      </header>
    </div>
  );
};

export default Header;
