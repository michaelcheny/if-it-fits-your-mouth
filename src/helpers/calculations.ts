import type { User } from "../interfaces/user.interface";

export const calculateBmr = (user: Pick<User, "age" | "gender" | "height" | "weight">) => {
  const { age, gender, height: { feet, inches }, weight } = user;

  const weightKg = weight * 0.45359237;
  const heightCm = (feet * 12 + inches) * 2.54;

  // Mifflin-St Jeor equation
  const bmr =
    gender === "male"
      ? 10 * weightKg + 6.25 * heightCm - 5 * age + 5
      : 10 * weightKg + 6.25 * heightCm - 5 * age - 161;

  return Math.round(bmr);
};

const ACTIVITY_MULTIPLIERS: Record<number, number> = {
  1: 1.2, // sedentary (little or no exercise)
  2: 1.375, // lightly active (light exercise 1-3 days/week)
  3: 1.55, // moderately active (moderate exercise 3-5 days/week)
  4: 1.725, // active (hard exercise 6-7 days/week)
  5: 1.9, // very active (very hard exercise or physical job)
};

export const calculateTdee = (activityLevel: number, bmr: number): number => {
  const multiplier = ACTIVITY_MULTIPLIERS[activityLevel] ?? 1.55;
  return Math.round(bmr * multiplier);
};

/**
 * A pound of body fat is roughly 3,500 kcal. The multiplier table approximates
 * the daily calorie adjustment needed to hit a weekly weight-change goal.
 */
const GOAL_MULTIPLIERS: Record<number, number> = {
  [-2]: 0.6,
  [-1.5]: 0.7,
  [-1]: 0.8,
  [-0.5]: 0.9,
  [0]: 1,
  [0.5]: 1.1,
  [1]: 1.2,
  [1.5]: 1.3,
  [2]: 1.4,
};

export const calculateRecommendedCals = (tdee: number, goal: number): number => {
  const multiplier = GOAL_MULTIPLIERS[goal] ?? 1;
  return Math.round(tdee * multiplier);
};

interface MacroSplit {
  proteinPerLb: number;
  fatPerLb: number;
}

const MACRO_SPLITS: { maxGoal: number; split: MacroSplit }[] = [
  // goal < -1 : aggressive cut — high protein, low fat
  { maxGoal: -1.0001, split: { proteinPerLb: 0.88, fatPerLb: 0.3 } },
  // -1 <= goal < 0 : gentle cut
  { maxGoal: -0.0001, split: { proteinPerLb: 0.92, fatPerLb: 0.35 } },
  // goal === 0 : maintenance
  { maxGoal: 0, split: { proteinPerLb: 1.025, fatPerLb: 0.42 } },
  // 0 < goal <= 1 : gentle bulk
  { maxGoal: 1, split: { proteinPerLb: 1.12, fatPerLb: 0.57 } },
  // goal > 1 : aggressive bulk
  { maxGoal: Infinity, split: { proteinPerLb: 1.2, fatPerLb: 0.62 } },
];

export interface Macros {
  fats: number;
  protein: number;
  carbs: number;
}

export const calculateMacros = (calGoal: number, weight: number, goal: number): Macros => {
  const entry = MACRO_SPLITS.find(({ maxGoal }) => goal <= maxGoal)!;
  let protein = weight * entry.split.proteinPerLb;
  const fats = weight * entry.split.fatPerLb;

  // On aggressive cuts, carbs can go negative if protein is too high —
  // drop protein to keep at least 35g of carbs.
  let carbs = (calGoal - protein * 4 - fats * 9) / 4;
  if (goal < -1 && carbs < 35) {
    protein = weight * 0.7;
    carbs = (calGoal - protein * 4 - fats * 9) / 4;
  }

  return {
    fats: Math.round(fats),
    protein: Math.round(protein),
    carbs: Math.max(0, Math.round(carbs)),
  };
};
