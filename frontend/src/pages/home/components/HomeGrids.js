import React, { useContext } from "react";
import "./homepage-grids.css";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../../contexts/DataContextProvider";

const HomeGrids = () => {
  const { featuredData: homepageGrids, products } = useContext(DataContext);
  const navigate = useNavigate();

  return (
    <div className="home-grids">
      {homepageGrids.map(
        ({ title, description, image, color, products: items }, index) => (
          <div style={{ backgroundColor: color }} key={title}>
            <h2>The {title}</h2>
            <div
              className={
                index % 2 ? "grid-container even" : "grid-container odd"
              }
            >
              <div
                style={{
                  backgroundImage: `url(${image})`,
                }}
                className="grid-title-image"
              ></div>
              {items.map((id) => (
                <div
                  key={"grid-item" + id}
                  id={id + title}
                  onClick={() => navigate(`/products/${products[id - 1].id}`)}
                  className="product-card-grid"
                >
                  <img src={products[id - 1].images[0]}></img>
                  <span className="grid-name">{products[id - 1].name}</span>
                </div>
              ))}
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default HomeGrids;
