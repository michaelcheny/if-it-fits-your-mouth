import React from "react";

type MacrosProp = {
  macros: {
    fats: number;
    protein: number;
    carbs: number;
  };
};

const Macros = ({ macros }: MacrosProp) => {
  return (
    <div className="macros">
      <div className="title">Recommended Macros Per Day (grams)</div>
      <div>
        <div className="macro-grid">
          Fats: <span className="nums">{macros.fats}</span>
        </div>
        <div className="macro-grid">
          Protein: <span className="nums">{macros.protein}</span>
        </div>
        <div className="macro-grid">
          Carbs: <span className="nums">{macros.carbs}</span>
        </div>
      </div>
    </div>
  );
};

export default Macros;
