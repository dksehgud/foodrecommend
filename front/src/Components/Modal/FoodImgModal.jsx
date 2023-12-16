import React from "react";

export default function FoodImgModal({ recommendedFood }) {
  return (
    <div className="foodImgModal">
      <p className="foodImgModal-title">{recommendedFood.mainFoodType}</p>
      <p className="click-msg">Click!</p>
    </div>
  );
}
