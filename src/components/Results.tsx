import React from "react";
import { User } from "../interfaces/user.interface";

type ResultProps = {
  user: User | any;
  setThing: React.Dispatch<React.SetStateAction<string>>;
};

const calculateBmr = (user: User) => {
  const {
    age,
    gender,
    height: { feet, inches },
    weight,
  } = user;

  if (gender === "male") {
    return 10 * (weight * 0.4535934) + 6.25 * ((feet * 12 + inches) * 2.54) - 5 * age + 5;
  } else {
    return 10 * (weight * 0.4535934) + 6.25 * ((feet * 12 + inches) * 2.54) - 5 * age - 161;
  }
};

const Results = ({ user, setThing }: ResultProps) => {
  console.log(user);
  return (
    <div>
      <h1>jkashdfkjssjadfkajsdhfsdhjf</h1>
      <div>{calculateBmr(user)}</div>
    </div>
  );
};

export default Results;
