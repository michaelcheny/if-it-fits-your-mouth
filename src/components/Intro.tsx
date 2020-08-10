import React from "react";
import { ChangeAppProps } from "../interfaces/appstate.interface";

const Intro = ({ setThing }: ChangeAppProps) => {
  return (
    <div className="intro-box">
      {/* <div className="overlay"></div> */}
      <h3>Eat what you want.</h3>
      {/* <h1>IF IT FITS YOUR MOUTH</h1> */}
      <p>If It Fits Your Mouth is a macronutrients calculator for flexible dieting. </p>
      <p>This app uses the Mifflin St. Jeor equation to calculate the BMR </p>
      <p>
        <button onClick={() => setThing("user-form")}>Start</button>
      </p>
    </div>
  );
};

export default Intro;
