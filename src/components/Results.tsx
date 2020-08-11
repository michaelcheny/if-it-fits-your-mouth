import React from "react";
import { User } from "../interfaces/user.interface";
import { calculateBmr, calculateTdee } from "../helpers/calculations";

type ResultProps = {
  user: User | any;
  setThing: React.Dispatch<React.SetStateAction<string>>;
};

const Results = ({ user, setThing }: ResultProps) => {
  const bmr = calculateBmr(user);

  console.log(user);
  return (
    <div className="result-container">
      <div className="results">
        <div>
          <div>BMR</div>
          <div>
            <span className="nums">{bmr} </span> Calories/day
          </div>
        </div>

        <div>
          <div>TDEE</div>
          <div>
            <span className="nums">{calculateTdee(user, bmr)}</span> Calories/day
          </div>
        </div>
      </div>

      {/* <div>
        <p>change your activity level</p>
        <input type="range" name="" id="" />
      </div> */}

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
