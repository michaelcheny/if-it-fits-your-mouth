import React from "react";

const Resources = () => {
  return (
    <div>
      <h1>What are Macronutrients?</h1>
      <div className="info-container">
        <div>
          <h3>Fats</h3>
          <div>Calories per gram: 9</div>
          <div>Your body needs fat for energy and critical functions</div>
          <ul>
            <li>Hormone production</li>
            <li>Nutrient absorbtion</li>
            <li>Body temp maintencance</li>
          </ul>
        </div>
        <div>
          <h3>Proteins</h3>
          <div>Calories per gram: 4</div>
          <ul>
            <li>Cell signaling</li>
            <li>Building of tissues</li>
            <li>Hormones and enzymes</li>
          </ul>
        </div>
        <div>
          <h3>Carbohydrates</h3>
          <div>Calories per gram: 4</div>
          <ul>
            <li>Immediate energy or store as glycogen</li>
            <li>Balance our blood sugar</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Resources;
