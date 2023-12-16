import FoodImgModal from "./FoodImgModal";
import React from "react";
import img from "../../Image/곡류 및 서류.jpg";
import img1 from "../../Image/과자류.jpg";

export default function MainFoodTypeBox({
  recommendedFood,
  selectFoodHandler,
}) {
  return (
    <div
      className="mainFoodType-box"
      style={{
        backgroundImage: `url(img)`,
      }}
      onClick={() => selectFoodHandler(recommendedFood)}
    >
      <FoodImgModal recommendedFood={recommendedFood} />
    </div>
  );
}
