import React, { useState } from "react";
import { User } from "../interfaces/user.interface";

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
            <span className="nums">{user.bmr} </span> Calories/day
          </div>
        </div>

        <div>
          <div>TDEE</div>
          <div>
            <span className="nums">{user.tdee}</span> Calories/day
          </div>
        </div>
      </div>

      <div className="goal">
        <p>What are your goals?</p>
        <p>Lose {goal} pounds a week</p>
        <input type="range" name="goal" min={-3} max={3} step={1} value={goal} onChange={handleChange} />
      </div>

      <div className="legend">
        <p>
          Your basal metabolic rate (BMR) is the amount of energy expended while resting in a neutral
          environment.
        </p>
        <p>
          Your Total Daily Energy Expenditure (TDEE) is a measure of how many calories you burn per day
          when activity level is taken into account.
        </p>

        <p>
          See Macros
          <button onClick={() => setThing("macros")}>Macros</button>
        </p>
      </div>
    </div>
  );
};

export default Results;
