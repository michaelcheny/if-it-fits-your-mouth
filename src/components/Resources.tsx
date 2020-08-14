import React from "react";
import links from "../data/links.json";

const Resources = () => {
  return (
    <div className="resource-container">
      <div className="info-container">
        <h2>What are Macronutrients?</h2>
        <div>
          <div className="sub-title">
            Fats
            <span className="per-gram">
              <span className="tiny-text">kcal/gram:</span> 9
            </span>
          </div>

          <div className="description">
            Your body needs fat for energy and to support cell growth. They also help protect the organs
            and help maintain body temperature. Helps with hormone production and nutrient absorbtion.
          </div>
          <ul>
            <li>Fatty meats</li>
            <li>Seeds & Nuts</li>
            <li>Avocados</li>
            <li>Fish</li>
            <li>Oils</li>
            <li>Most junk food</li>
          </ul>
        </div>
        <div>
          <div className="sub-title">
            Proteins
            <span className="per-gram">
              <span className="tiny-text">kcal/gram:</span> 4
            </span>
          </div>
          <div className="description">
            Your body uses protein to build and repair tissues. It's also a building block of bones,
            muscles, cartilage, skin, and blood.
          </div>
          <ul>
            <li>Meats</li>
            <li>Milk, Cheese, and Yogurt</li>
            <li>Fish</li>
            <li>Protein powder</li>
            <li>Beans</li>
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
            Your body uses carbs as the main source of energy. They fuel your brain, kidneys, heart,
            muscles, and central nervous system. Fiber helps you poop.
          </div>
          <ul>
            <li>Veggies & Fruits</li>
            <li>Grains, Bread, and Pastas</li>
            <li>Most junk food</li>
          </ul>
        </div>
      </div>
      <h2>Whats a Calorie</h2>
      <div className="description">
        A calorie (kcal) is a unit of energy. Every cell in our body requires energy to function in it's
        optimal state. Weightloss comes down to calories in vs calories out.
      </div>
      <h2>Why Flexible Dieting? (IIFYM)</h2>
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
      <h2>Other Resources</h2>
      <ul>
        {links.map((link, idx) => (
          <li key={idx}>
            <a href={link.url} target="_blant" rel="noopener noreferrer">
              {link.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Resources;
