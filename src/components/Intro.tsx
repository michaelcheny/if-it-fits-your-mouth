import React from "react";
import { ChangeAppProps } from "../interfaces/appstate.interface";
// import Container from "@material-ui/core/Container";

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
      {/* <div className="gender-buttons">
        <button>Male</button>
        <button>Female</button>
      </div> */}
    </div>
  );
};

export default Intro;