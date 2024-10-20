import React from "react";
import {
  MdOutlineStar,
  MdOutlineStarHalf,
  MdOutlineStarOutline,
} from "react-icons/md";

//justtrtying

const Rating = ({ rating, size }) => {
  const ratingArr = [];
  for (let i = 1; i < 6; i++) {
    if (rating >= i * 2) {
      ratingArr.push(<MdOutlineStar size={size} key={"MdOutlineStar" + i} />);
      continue;
    }
    if (rating >= i * 2 - 1) {
      ratingArr.push(
        <MdOutlineStarHalf size={size} key={"MdOutlineStarHalf" + i} />
      );
      continue;
    } else {
      ratingArr.push(
        <MdOutlineStarOutline size={size} key={"MdOutlineStarOutline" + i} />
      );
    }
  }
  return <span className="rating">{ratingArr}</span>;
};

export default Rating;
