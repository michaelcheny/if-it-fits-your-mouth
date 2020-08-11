import { User } from "../interfaces/user.interface";

export const calculateBmr = (user: User) => {
  const {
    age,
    gender,
    height: { feet, inches },
    weight,
  } = user;

  let bmr: number;

  if (gender === "male") {
    bmr = 10 * (weight * 0.4535934) + 6.25 * ((feet * 12 + inches) * 2.54) - 5 * age + 5;
  } else {
    bmr = 10 * (weight * 0.4535934) + 6.25 * ((feet * 12 + inches) * 2.54) - 5 * age - 161;
  }

  return Math.round(bmr);
};

export const calculateTdee = (user: User, bmr: number) => {
  let multiplier: number = 1.55;
  if (user.activity_level === 1) multiplier = 1.2;
  if (user.activity_level === 2) multiplier = 1.375;
  if (user.activity_level === 3) multiplier = 1.55;
  if (user.activity_level === 4) multiplier = 1.725;
  if (user.activity_level === 5) multiplier = 1.95;

  return Math.round(bmr * multiplier);
};

export const calculateRecommendedCals = (tdee: number, goal: number) => {
  let multiplier = 1;
  if (goal === -2) multiplier = 0.6;
  if (goal === -1.5) multiplier = 0.7;
  if (goal === -1) multiplier = 0.8;
  if (goal === -0.5) multiplier = 0.9;
  if (goal === 0) multiplier = 1;
  if (goal === 0.5) multiplier = 1.1;
  if (goal === 1) multiplier = 1.2;
  if (goal === 1.5) multiplier = 1.3;
  if (goal === 2) multiplier = 1.4;

  return Math.round(tdee * multiplier);
};

export const calculateMacros = (calGoal: number, weight: number, goal: number) => {
  let p: number = 0;
  let f: number = 0;
  let c: number = 0;

  if (goal < 0 && goal >= -1) {
    p = weight * 1.02;
    f = weight * 0.35;
    c = (calGoal - p * 4 - f * 9) / 4;
  } else if (goal < -1) {
    p = weight * 0.965;
    f = weight * 0.3;
    c = (calGoal - p * 4 - f * 9) / 4;
  } else if (goal > 0 && goal <= 1) {
    p = weight * 1.12;
    f = weight * 0.57;
    c = (calGoal - p * 4 - f * 9) / 4;
  } else if (goal > 1) {
    p = weight * 1.2;
    f = weight * 0.62;
    c = (calGoal - p * 4 - f * 9) / 4;
  } else {
    p = weight * 1.025;
    f = weight * 0.42;
    c = (calGoal - p * 4 - f * 9) / 4;
  }
  return {
    fats: Math.round(f),
    protein: Math.round(p),
    carbs: Math.round(c),
  };
};
