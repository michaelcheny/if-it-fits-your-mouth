import { describe, it, expect } from "vitest";
import {
  calculateBmr,
  calculateTdee,
  calculateRecommendedCals,
  calculateMacros,
} from "./calculations";

describe("calculateBmr", () => {
  // Known reference: 30yo male, 5'10", 180 lbs → Mifflin-St Jeor = 1783
  it("calculates BMR for a male", () => {
    const bmr = calculateBmr({
      age: 30,
      gender: "male",
      height: { feet: 5, inches: 10 },
      weight: 180,
    });
    expect(bmr).toBe(1783);
  });

  it("calculates BMR for a female", () => {
    // 30yo female, 5'4", 140 lbs → Mifflin-St Jeor = 1340
    const bmr = calculateBmr({
      age: 30,
      gender: "female",
      height: { feet: 5, inches: 4 },
      weight: 140,
    });
    expect(bmr).toBe(1340);
  });

  it("female BMR is lower than male with identical stats", () => {
    const base = { age: 30, height: { feet: 5, inches: 10 }, weight: 180 };
    expect(calculateBmr({ ...base, gender: "female" })).toBeLessThan(
      calculateBmr({ ...base, gender: "male" })
    );
  });

  it("older age lowers BMR", () => {
    const base = { gender: "male" as const, height: { feet: 5, inches: 10 }, weight: 180 };
    expect(calculateBmr({ ...base, age: 50 })).toBeLessThan(
      calculateBmr({ ...base, age: 25 })
    );
  });
});

describe("calculateTdee", () => {
  it("applies the correct multiplier per activity level", () => {
    expect(calculateTdee(1, 1000)).toBe(1200);
    expect(calculateTdee(2, 1000)).toBe(1375);
    expect(calculateTdee(3, 1000)).toBe(1550);
    expect(calculateTdee(4, 1000)).toBe(1725);
    expect(calculateTdee(5, 1000)).toBe(1900);
  });

  it("falls back to the moderate multiplier for unknown levels", () => {
    expect(calculateTdee(99, 1000)).toBe(1550);
  });
});

describe("calculateRecommendedCals", () => {
  it("keeps calories at TDEE for a maintenance goal", () => {
    expect(calculateRecommendedCals(2000, 0)).toBe(2000);
  });

  it("scales down for weight loss goals", () => {
    expect(calculateRecommendedCals(2000, -1)).toBe(1600);
    expect(calculateRecommendedCals(2000, -2)).toBe(1200);
  });

  it("scales up for weight gain goals", () => {
    expect(calculateRecommendedCals(2000, 1)).toBe(2400);
    expect(calculateRecommendedCals(2000, 2)).toBe(2800);
  });

  it("handles half-pound steps", () => {
    expect(calculateRecommendedCals(2000, -0.5)).toBe(1800);
    expect(calculateRecommendedCals(2000, 0.5)).toBe(2200);
  });
});

describe("calculateMacros", () => {
  it("returns maintenance macros for goal 0", () => {
    const macros = calculateMacros(2400, 180, 0);
    expect(macros.protein).toBe(Math.round(180 * 1.025)); // 185
    expect(macros.fats).toBe(Math.round(180 * 0.42)); // 76
    // carbs fill the remaining calories
    const expectedCarbs = Math.round((2400 - macros.protein * 4 - macros.fats * 9) / 4);
    expect(macros.carbs).toBe(expectedCarbs);
  });

  it("uses higher protein on a bulk", () => {
    const macros = calculateMacros(3000, 180, 1.5);
    expect(macros.protein).toBe(Math.round(180 * 1.2)); // 216
    expect(macros.fats).toBe(Math.round(180 * 0.62)); // 112
  });

  it("uses the gentle-cut split for small deficits", () => {
    const macros = calculateMacros(2000, 180, -0.5);
    expect(macros.protein).toBe(Math.round(180 * 0.92)); // 166
    expect(macros.fats).toBe(Math.round(180 * 0.35)); // 63
  });

  it("drops protein on aggressive cuts to keep carbs above 35g", () => {
    // Heavy weight with a low calorie goal → aggressive cut branch,
    // first pass (0.88 g/lb) leaves ~11g carbs, so protein drops to 0.7 → ~56g.
    const macros = calculateMacros(1600, 250, -2);
    expect(macros.protein).toBe(Math.round(250 * 0.7)); // 175
    expect(macros.carbs).toBeGreaterThanOrEqual(35);
  });

  it("never returns negative carbs", () => {
    const macros = calculateMacros(500, 250, -2);
    expect(macros.carbs).toBeGreaterThanOrEqual(0);
  });

  it("macro calories roughly match the calorie goal", () => {
    const calGoal = 2400;
    const macros = calculateMacros(calGoal, 180, 0);
    const total = macros.protein * 4 + macros.fats * 9 + macros.carbs * 4;
    expect(Math.abs(total - calGoal)).toBeLessThan(12); // rounding slack
  });
});
