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
  const [mobileNavActive, setMobileNavActive] = useState(false);

  const { setProfileActive, setWishlistActive, setCartActive } =
    useContext(SessionContext);
  const { navData } = useContext(DataContext);
  return (
    <div className="wrapper">
      <header className="header-main">
        <Link className="logo">TIMELESS</Link>
        <nav className={mobileNavActive ? "active" : "inactive"}>
          <ul>
            {navData.map(({ _id, gender, image, categories }) => (
              <li className="nav-collection" key={_id}>
                <Link className="nav-collection-button">{gender}</Link>
                <aside className="nav-category-dropdown">
                  {categories.map(({ category, image }) => (
                    <figure
                      className="nav-category-card"
                      key={"nav-category-card" + category}
                    >
                      <img src={image} />
                      <Link>{category}</Link>
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
        <CiSearch size={24} className="search-icon icon" />
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
