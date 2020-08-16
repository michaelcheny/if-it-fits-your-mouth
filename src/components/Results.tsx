import React, { useState } from "react";
import { User } from "../interfaces/user.interface";
import { calculateRecommendedCals, calculateMacros } from "../helpers/calculations";
import Macros from "./Macros";

type ResultProps = {
  user: User | any;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  setThing: React.Dispatch<React.SetStateAction<string>>;
};

const Results = ({ user, setUser }: ResultProps) => {
  const [goal, setGoal] = useState<number>(0);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setGoal(Number(e.target.value));
    const goals = {
      goal: Number(e.target.value),
      calGoal: calculateRecommendedCals(user.tdee, Number(e.target.value)),
    };
    const userAttr = {
      ...user,
      ...goals,
    };
    setUser(userAttr);
    localStorage.setItem("userStats", JSON.stringify(userAttr));
  };

  let macros = calculateMacros(user.calGoal, user.weight, goal);

  return (
    <div className="result-container">
      <div className="goal">
        <div className="title">What are your goals?</div>
        <p>
          {goal < 0 ? "Lose" : "Gain"}{" "}
          <span className="nums">{(user && user.goal) || Math.abs(goal)}</span> pounds a week
        </p>
        <input
          type="range"
          name="goal"
          className="slider"
          min={-2}
          max={2}
          step={0.5}
          // defaultValue={(user && user.goal) || goal}
          defaultValue={goal}
          onChange={handleChange}
        />
        <div>
          <div className="title">Recommended Calories Per Day</div>
          <div className="rec-cals">
            {(user && user.calGoal) || calculateRecommendedCals(user.tdee, goal)}
          </div>
        </div>
      </div>

      <Macros macros={macros} />
      <div className="results">
        <p className="title">Other Info</p>
        <div>
          <div>BMR</div>
          <div>
            <span className="nums">{user.bmr} </span> calories/day
          </div>
        </div>

        <div>
          <div>TDEE</div>
          <div>
            <span className="nums">{user.tdee}</span> calories/day
          </div>
        </div>
      </div>

      <div className="legend">
        <p>Current formula for calculating macros:</p>
        <p>0.8g - 1.2g of protein per pound of body weight.</p>
        <p>0.3g - 0.6g of fats per pound of body weight.</p>
        <p>Custom macronutrient ratios coming soon!</p>
      </div>
    </div>
  );
};

export default Results;
