import React, { useContext } from "react";
import "../home.css";
import { useNavigate } from "react-router-dom";
import { SessionContext } from "../../../contexts/SessionContextProvider";

const HeroSlide = ({ slide: { title, description, gender, image } }) => {
  const navigate = useNavigate();
  const { dispatchFilterInput } = useContext(SessionContext);

  const setGenderAndNavigate = (gender) => {
    dispatchFilterInput({
      action: "CLEAR_ALL_FILTERS",
    });
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
    navigate("/products");
  };

  return (
    <div>
      <div className="container-slider">
        <div
          className="hero-image"
          style={{
            backgroundImage: `url("${image}")`,
          }}
        ></div>
        <div className="hero-content">
          <h2>{title}</h2>
          <p>{description}</p>
          <button onClick={() => setGenderAndNavigate(gender)}>
            Browse {gender}'s
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSlide;
