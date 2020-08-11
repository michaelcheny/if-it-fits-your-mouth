import React, { useState } from "react";
import { User } from "../interfaces/user.interface";
import { calculateRecommendedCals } from "../helpers/calculations";

type ResultProps = {
  user: User | any;
  setThing: React.Dispatch<React.SetStateAction<string>>;
};

const Results = ({ user, setThing }: ResultProps) => {
  const [goal, setGoal] = useState<number>(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setGoal(Number(e.target.value));
  };

  // console.log(user);
  return (
    <div className="result-container">
      <div className="results">
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

      <div className="goal">
        <p>What are your goals?</p>
        <p>
          {goal < 0 ? "Lose" : "Gain"} <span className="nums">{Math.abs(goal)}</span> pounds a week
        </p>
        <input
          type="range"
          name="goal"
          min={-2}
          max={2}
          step={0.5}
          value={goal}
          onChange={handleChange}
        />
        <div>
          <p>Recommended Calories Per Day</p>
          <div className="rec-cals">{calculateRecommendedCals(user.tdee, goal)}</div>
        </div>
      </div>

      <button className="macro-button" onClick={() => setThing("macros")}>
        Calculate Macros
      </button>
      <div className="legend">
        <p>
          Calorie intake should not fall below 1,200 a day in women or 1,500 a day in men, except under
          the supervision of a health professional.
        </p>
        <p>
          Your basal metabolic rate (BMR) is the amount of energy expended while resting in a neutral
          environment.
        </p>
        <p>
          Your Total Daily Energy Expenditure (TDEE) is a measure of how many calories you burn per day
          when activity level is taken into account.
        </p>
      </div>
    </div>
  );
};

export default Results;
