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
      <div>Recommended macros</div>
      <div>
        Fats: <span className="nums">{macros.fats}</span>g
      </div>
      <div>
        Protein: <span className="nums">{macros.protein}</span>g
      </div>
      <div>
        Carbs: <span className="nums">{macros.carbs}</span>g
      </div>
    </div>
  );
};

export default Macros;
