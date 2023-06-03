import React, { useEffect } from "react";
import HeroSlider from "./components/HeroSlider";
import HomeGrids from "./components/HomeGrids";

const Home = () => {
  const { dispatchFilterInput } = useContext(SessionContext);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatchFilterInput({
      action: "CLEAR_ALL_FILTERS",
    });
  }, []);
  return (
    <div>
      <HeroSlider />
      <HomeGrids />
    </div>
  );
};

export default Home;
