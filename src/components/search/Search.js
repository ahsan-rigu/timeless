import React, { useContext, useState } from "react";
import { MdOutlineClose } from "react-icons/md";
import { UserContext } from "../../contexts/UserContextProvider";
import { SessionContext } from "../../contexts/SessionContextProvider";
import { DataContext } from "../../contexts/DataContextProvider";
import { CiSearch, CiShoppingCart } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import Nothing from "../Nothing";
import "./search.css";
import Rating from "../Rating";

const Search = () => {
  const { products } = useContext(DataContext);
  const { dispatchFilterInput } = useContext(SessionContext);
  const { searchActive, setSearchActive } = useContext(SessionContext);
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  let liveSearchProdcuts = [];

  if (searchQuery) {
    liveSearchProdcuts = products.filter(
      ({ name, brand }) =>
        name.toLowerCase().includes(searchQuery) ||
        brand.toLowerCase().includes(searchQuery)
    );
  }

  const updateSearchAndNavigate = () => {
    dispatchFilterInput({ action: "CLEAR_ALL_FILTERS" });
    dispatchFilterInput({ action: "UPDATE_SEARCH", payload: searchQuery });
    setSearchActive(false);
    navigate("/products");
  };

  const searchHandler = (event) => {
    console.log(event.key);
    if (event.key === "Enter") {
      updateSearchAndNavigate();
    } else {
      setSearchQuery(event.target.value + event.key);
    }
  };

  return (
    <div
      className={searchActive ? "search-container active" : "search-container"}
    >
      <div className="search-actual">
        <header>
          <CiSearch
            className="icon"
            size={"1.5rem"}
            onClick={updateSearchAndNavigate}
          />
          {searchActive && (
            <input
              type="text"
              name="search"
              placeholder="search"
              autoFocus
              onKeyDown={searchHandler}
            />
          )}
          <MdOutlineClose
            className="icon"
            onClick={() => setSearchActive((prev) => !prev)}
            size={"1.5rem"}
          />
        </header>
        {liveSearchProdcuts.length > 0 ? (
          <div className="search-products">
            {liveSearchProdcuts.map(
              ({
                images: [image],
                brand,
                name,
                price,
                discount,
                _id,
                rating,
                id,
              }) => {
                return (
                  <article
                    className="product-in-cart search-list-item"
                    key={_id}
                    onClick={() => {
                      navigate(`/products/${id}`) ||
                        setSearchActive(false) ||
                        setSearchQuery("");
                    }}
                  >
                    <img src={image} className="thumbnail-for-list" />
                    <div className="content">
                      <h4>{brand}</h4>
                      <h5>{name}</h5>
                      <h5 className="price-individual">
                        {discount > 0 && (
                          <span className="strikethrough">${price}</span>
                        )}
                        ${price - (discount * price) / 100}
                      </h5>
                      <Rating rating={rating} size={"1.5rem"} />
                    </div>
                  </article>
                );
              }
            )}
          </div>
        ) : (
          <Nothing />
        )}
      </div>
    </div>
  );
};

export default Search;
