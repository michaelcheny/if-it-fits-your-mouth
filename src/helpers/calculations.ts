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
