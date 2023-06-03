import React, { useEffect } from "react";
import HeroSlider from "./components/HeroSlider";
import HomeGrids from "./components/HomeGrids";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <HeroSlider />
      <HomeGrids />
    </div>
  );
};

export default Home;
