export interface User {
  age: number;
  gender: string;
  // height: number;
  height: {
    feet: number;
    inches: number;
  };
  weight: number;
  activity_level: number;
}
