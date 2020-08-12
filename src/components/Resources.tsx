import React from "react";

const Resources = () => {
  return (
    <div className="resource-container">
      <div className="info-container">
        <h1>What are Macronutrients?</h1>
        <div>
          <div className="sub-title">
            Fats
            <span className="per-gram">
              <span className="tiny-text">kcal/gram:</span> 9{" "}
            </span>
          </div>

          <div>Your body needs fat for energy and critical functions</div>
          <ul>
            <li>Hormone production</li>
            <li>Nutrient absorbtion</li>
            <li>Body temp maintencance</li>
          </ul>
        </div>
        <div>
          <div className="sub-title">
            Proteins
            <span className="per-gram">
              <span className="tiny-text">kcal/gram:</span> 4
            </span>
          </div>

          <ul>
            <li>Cell signaling</li>
            <li>Building of tissues</li>
            <li>Hormones and enzymes</li>
          </ul>
        </div>
        <div>
          <div className="sub-title">
            Carbohydrates
            <span className="per-gram">
              <span className="tiny-text">kcal/gram:</span> 4
            </span>
          </div>

          <ul>
            <li>Immediate energy or store as glycogen</li>
            <li>Balance our blood sugar</li>
          </ul>
        </div>
      </div>
      <h1>Whats a Calorie</h1>
      <div>
        A calorie (kcal) is a unit of energy. Every cell in our body requires energy to function in it's
        optimal state.
      </div>
    </div>
  );
};

export default Resources;
