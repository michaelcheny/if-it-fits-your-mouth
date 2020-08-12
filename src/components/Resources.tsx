import React from "react";

const Resources = () => {
  return (
    <div>
      <h1>What are Macronutrients?</h1>
      <div className="info-container">
        <div>
          <h3>
            Fats
            <span className="per-gram">
              <span className="tiny-text">Calories per gram:</span> 9{" "}
            </span>
          </h3>

          <div>Your body needs fat for energy and critical functions</div>
          <ul>
            <li>Hormone production</li>
            <li>Nutrient absorbtion</li>
            <li>Body temp maintencance</li>
          </ul>
        </div>
        <div>
          <h3>
            Proteins
            <span className="per-gram">
              <span className="tiny-text">Calories per gram:</span> 4
            </span>
          </h3>

          <ul>
            <li>Cell signaling</li>
            <li>Building of tissues</li>
            <li>Hormones and enzymes</li>
          </ul>
        </div>
        <div>
          <h3>
            Carbohydrates
            <span className="per-gram">
              <span className="tiny-text">Calories per gram:</span> 4
            </span>
          </h3>

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
