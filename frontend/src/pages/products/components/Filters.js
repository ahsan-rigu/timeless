import React, { useContext } from "react";
import { DataContext } from "../../../contexts/DataContextProvider";
import { SessionContext } from "../../../contexts/SessionContextProvider";
import { MdOutlineClose } from "react-icons/md";

const Filters = ({ mobileFilterMenu, setMobileFilterMenu }) => {
  const { products } = useContext(DataContext);
  const { dispatchFilterInput, filterInput } = useContext(SessionContext);

  const brands = products.reduce(
    (acc, { brand }) => (acc.includes(brand) ? acc : [...acc, brand]),
    []
  );
  const categories = products.reduce(
    (acc, { category }) => (acc.includes(category) ? acc : [...acc, category]),
    []
  );

  return (
    <div className={mobileFilterMenu ? "filters active" : "filters"}>
      <div className="filter-block clear-and-close">
        <button
          onClick={() => dispatchFilterInput({ action: "CLEAR_ALL_FILTERS" })}
        >
          clear filters
        </button>
        <button
          onClick={() => setMobileFilterMenu(false)}
          className="mobile-only"
        >
          <MdOutlineClose size={24} />
        </button>
      </div>
      <div className="filter-block">
        <h4>Search</h4>
        <input
          type="text"
          placeholder="search filtered data"
          onChange={(e) =>
            dispatchFilterInput({
              action: "UPDATE_SEARCH",
              payload: e.target.value,
            })
          }
        />
      </div>
      <div className="filter-block">
        <h4>Sort</h4>
        <label>
          <input
            type="radio"
            name="sort"
            checked={filterInput.sort === "P-HTL"}
            onChange={(e) =>
              dispatchFilterInput({
                action: "UPDATE_SORT",
                payload: "P-HTL",
              })
            }
          />{" "}
          Price, high to low
        </label>
        <label>
          <input
            type="radio"
            name="sort"
            checked={filterInput.sort === "P-LTH"}
            onChange={(e) =>
              dispatchFilterInput({
                action: "UPDATE_SORT",
                payload: "P-LTH",
              })
            }
          />{" "}
          Price, low to high
        </label>
        <label>
          <input
            type="radio"
            name="sort"
            checked={filterInput.sort === "R-HTL"}
            onChange={(e) =>
              dispatchFilterInput({
                action: "UPDATE_SORT",
                payload: "R-HTL",
              })
            }
          />{" "}
          Rating, high to low
        </label>
      </div>
      <div className="filter-block">
        <h4>Gender</h4>
        <label>
          <input
            type="checkbox"
            name="gender-checkbox"
            checked={filterInput.genders.includes("Men")}
            onChange={(e) =>
              dispatchFilterInput({
                action: "UPDATE_FILTER_CHECKBOXES",
                payload: {
                  checked: e.target.checked,
                  value: "Men",
                  filterBlock: "genders",
                },
              })
            }
          />{" "}
          Men
        </label>
        <label>
          <input
            type="checkbox"
            name="gender-checkbox"
            checked={filterInput.genders.includes("Women")}
            onChange={(e) =>
              dispatchFilterInput({
                action: "UPDATE_FILTER_CHECKBOXES",
                payload: {
                  checked: e.target.checked,
                  value: "Women",
                  filterBlock: "genders",
                },
              })
            }
          />{" "}
          Women
        </label>
        <label>
          <input
            type="checkbox"
            name="gender-checkbox"
            checked={filterInput.genders.includes("Unisex")}
            onChange={(e) =>
              dispatchFilterInput({
                action: "UPDATE_FILTER_CHECKBOXES",
                payload: {
                  checked: e.target.checked,
                  value: "Unisex",
                  filterBlock: "genders",
                },
              })
            }
          />{" "}
          Unisex
        </label>
      </div>
      <div className="filter-block">
        <h4>Category</h4>
        {categories.map((category) => (
          <label key={"category" + category}>
            <input
              type="checkbox"
              name="categories-checkbox"
              checked={filterInput.categories.includes(category)}
              onChange={(e) =>
                dispatchFilterInput({
                  action: "UPDATE_FILTER_CHECKBOXES",
                  payload: {
                    checked: e.target.checked,
                    value: category,
                    filterBlock: "categories",
                  },
                })
              }
            />{" "}
            {category}
          </label>
        ))}
      </div>
      <div className="filter-block">
        <h4>Brand</h4>
        {brands.map((brand) => (
          <label key={"brand" + brand}>
            <input
              type="checkbox"
              name="gender-checkbox"
              onChange={(e) =>
                dispatchFilterInput({
                  action: "UPDATE_FILTER_CHECKBOXES",
                  payload: {
                    checked: e.target.checked,
                    value: brand,
                    filterBlock: "brands",
                  },
                })
              }
            />{" "}
            {brand}
          </label>
        ))}
      </div>
      <div className="filter-block">
        <h4>Price(max)</h4>
        <input
          type="range"
          min="1"
          max="250000"
          value={filterInput.maxPrice}
          onChange={(e) =>
            dispatchFilterInput({
              action: "UPDATE_MAX_PRICE",
              payload: e.target.value,
            })
          }
        />
        <input
          type="number"
          value={filterInput.maxPrice}
          onChange={(e) =>
            dispatchFilterInput({
              action: "UPDATE_MAX_PRICE",
              payload: e.target.value,
            })
          }
        />
      </div>
      <div className="filter-block">
        <h4>Rating</h4>
        <input
          type="range"
          max="5"
          step={1}
          id="myRange"
          value={filterInput.minRating}
          onChange={(e) =>
            dispatchFilterInput({
              action: "UPDATE_MIN_RATING",
              payload: e.target.value,
            })
          }
        />
        <span>{filterInput.minRating} stars and above</span>
      </div>
      <div className="filter-block">
        <h4>Misc</h4>
        <label>
          <input
            type="checkbox"
            name="gender-checkbox"
            value={filterInput.outOfStock}
            onChange={(e) =>
              dispatchFilterInput({
                action: "UPDATE_OOS",
                payload: e.target.checked,
              })
            }
          />{" "}
          Include Out Of Stock
        </label>
      </div>
    </div>
  );
};

export default Filters;
