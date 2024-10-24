import React, { useContext, useEffect, useState } from "react";
import "./products.css";
import { DataContext } from "../../contexts/DataContextProvider";
import { SessionContext } from "../../contexts/SessionContextProvider";
import ProductCard from "../../components/product-card/ProductCard";
import filterProducts from "../../utils/filterAssist";
import Filters from "./components/Filters";
import Nothing from "../../components/Nothing";

const Products = () => {
  const { products } = useContext(DataContext);
  const { dispatchFilterInput, filterInput } = useContext(SessionContext);
  const [mobileFilterMenu, setMobileFilterMenu] = useState(false);

  const filteredProducts = filterProducts(filterInput, products);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="filter-bar">
        <button onClick={() => setMobileFilterMenu(true)}>
          FILTER AND SORT
        </button>
        {filterInput.genders.length > 0 && (
          <button
            onClick={() =>
              dispatchFilterInput({
                action: "CLEAR_FILTERBLOCK_CHECKBOXES",
                payload: {
                  filterBlock: "genders",
                },
              })
            }
          >
            ALL GENDERS
          </button>
        )}
        {filterInput.categories.length > 0 && (
          <button
            onClick={() =>
              dispatchFilterInput({
                action: "CLEAR_FILTERBLOCK_CHECKBOXES",
                payload: {
                  filterBlock: "categories",
                },
              })
            }
          >
            ALL CATEGORIES
          </button>
        )}
        {filterInput.brands.length > 0 && (
          <button
            onClick={() =>
              dispatchFilterInput({
                action: "CLEAR_FILTERBLOCK_CHECKBOXES",
                payload: {
                  filterBlock: "brands",
                },
              })
            }
          >
            ALL BRANDS
          </button>
        )}
      </div>

      <div className="products-page-container">
        <Filters
          setMobileFilterMenu={setMobileFilterMenu}
          mobileFilterMenu={mobileFilterMenu}
        />
        <div className="products-actual">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard product={product} key={"products" + product._id} />
            ))
          ) : (
            <Nothing />
          )}
        </div>
      </div>
    </>
  );
};

export default Products;
