import React from 'react';
import { ChangeAppProps } from '../interfaces/appstate.interface';

const Intro = ({ setThing }: ChangeAppProps) => {
  return (
    <div className="intro-box">
      <h2>Eat what you want.</h2>
      <p>
        <span className="sub-title">If It Fits Your Mouth</span> is a macronutrients
        calculator for flexible dieting.{' '}
      </p>
      <p>This app uses the Mifflin St. Jeor equation to calculate the BMR. </p>
      <p>Click the donut to begin.</p>
      <div className="start-btn" onClick={() => setThing('user-form')}></div>
      <div className="legend">
        <p>
          Calorie intake should not fall below 1,200 a day in women or 1,500 a day in men,
          except under the supervision of a health professional.
        </p>
        <p>It is recommended to exercise more instead of eating less.</p>
        <p>
          Your basal metabolic rate (BMR) is the amount of energy expended while resting
          in a neutral environment.
        </p>
        <p>
          Your Total Daily Energy Expenditure (TDEE) is a measure of how many calories you
          burn per day when activity level is taken into account.
        </p>
      </div>
    </div>
  );
};

export default Intro;
