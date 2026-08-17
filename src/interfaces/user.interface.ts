export interface User {
  age: number;
  gender: "male" | "female";
  height: {
    feet: number;
    inches: number;
  };
  weight: number;
  activityLevel: number;
  bmr?: number;
  tdee?: number;
  goal?: number;
  calGoal?: number;
}
