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

          <div className="description">Your body needs fat for energy and critical functions</div>
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
          <div className="description">protein brooo</div>
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
          <div className="description">
            The sugars, starches, and fibers found through out fruits, grains, vegetables, and milk
            products.
          </div>
          <ul>
            <li>Immediate energy and fuel for the body</li>
            <li>Balance our blood sugar</li>
          </ul>
        </div>
      </div>
      <h1>Whats a Calorie</h1>
      <div className="description">
        A calorie (kcal) is a unit of energy. Every cell in our body requires energy to function in it's
        optimal state.
      </div>
      <h1>Why Flexible Dieting? (IIFYM)</h1>
      <div className="description">
        <p>
          You can eat donuts and ice cream as long as you account for it in your daily macros/calories.
        </p>
        <p>
          Don't go overboard on sugars and junkfood. Eating healthy is still recommended for overall
          health. (Yes, it is possible to lose weight eating McDonalds all day, but it is NOT good for
          you.)
        </p>
      </div>
      <h1>Other Resources</h1>
      <ul>
        <li>
          <a href="https://barbend.com/iifym-diet-guide/" target="_blant" rel="noopener noreferrer">
            IIFYM Diet Guide by Barbend
          </a>
        </li>
        <li>
          <a
            href="https://www.healthline.com/nutrition/flexible-dieting"
            target="_blank"
            rel="noopener noreferrer"
          >
            Flexible Dieting Article by Healhline
          </a>
        </li>
        <li>
          <a
            href="https://www.livestrong.com/article/111962-diet-plan-lose-pounds-weight/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Weighing Food
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Resources;
