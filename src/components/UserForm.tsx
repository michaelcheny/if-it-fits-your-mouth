import React from "react";
// import { ChangeAppProps } from "../interfaces/appstate.interface";
import { useForm } from "react-hook-form";
import { User } from "../interfaces/user.interface";
import { calculateBmr, calculateTdee } from "../helpers/calculations";

type FormInput = {
  activity_level: number;
  gender: string;
  age: number;
  feet: number;
  inches: number;
  weight: number;
};

type UserFormProps = {
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  setThing: React.Dispatch<React.SetStateAction<string>>;
  user: User | any;
};

const UserForm = ({ user, setUser, setThing }: UserFormProps) => {
  const { register, handleSubmit } = useForm<FormInput>();

  const onSubmit = (data: FormInput) => {
    let userAttributes = {
      activity_level: Number(data.activity_level),
      age: Number(data.age),
      gender: data.gender,
      weight: Number(data.weight),
      height: {
        feet: Number(data.feet),
        inches: Number(data.inches),
      },
    };
    const bmr = calculateBmr(userAttributes);
    const tdee = calculateTdee(userAttributes, bmr);
    const results = { bmr, tdee, goal: 0, calGoal: tdee };
    userAttributes = { ...userAttributes, ...results };
    setUser(userAttributes);
    localStorage.setItem("userStats", JSON.stringify(userAttributes));
    setThing("result");
  };

  return (
    <div className="user-form-section">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* GENDER */}
        <div className="selection">
          <label id="gender">Gender</label>
          <div className="gender-select">
            <div className="radio-group">
              <input
                type="radio"
                id="male"
                name="gender"
                value="male"
                defaultChecked={user && user.gender === "male"}
                ref={register({ required: true })}
              />{" "}
              <label id="male"> Male</label>
            </div>
            <div className="radio-group">
              <input
                type="radio"
                id="female"
                name="gender"
                value="female"
                defaultChecked={user && user.gender === "female"}
                ref={register({ required: true })}
              />{" "}
              <label id="female"> Female</label>
            </div>
          </div>
        </div>
        {/* AGE */}
        <div className="selection">
          <label id="age">Age</label>
          <input
            type="number"
            id="age"
            name="age"
            defaultValue={(user && user.age) || 21}
            ref={register({ required: true, min: 18, max: 75 })}
          />
        </div>
        {/* HEIGHT */}
        <div className="selection">
          <label id="height">Height</label>
          <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            <div style={{ display: "inline-flex" }}>
              <select
                name="feet"
                id="feet"
                className="height"
                defaultValue={(user && user.height.feet) || 5}
                ref={register({ required: true })}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
              </select>
              <label id="feet" className="labels">
                {" "}
                Ft
              </label>
            </div>
            <div style={{ display: "inline-flex" }}>
              <select
                name="inches"
                id="inches"
                className="height"
                defaultValue={(user && user.height.inches) || 1}
                ref={register({ required: true })}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
              </select>
              <label id="inches" className="labels">
                {" "}
                In
              </label>
            </div>
          </div>
        </div>
        {/* WEIGHT */}
        <div className="selection">
          <label id="weight">Weight</label>
          <input
            type="number"
            name="weight"
            defaultValue={(user && user.weight) || 100}
            ref={register({ required: true, min: 50 })}
          />
        </div>
        {/* ACTIVITY LEVEL */}
        <div className="selection">
          <label id="activity_level">Activity Level</label>
          <select
            name="activity_level"
            placeholder="Activity level"
            id="activity_level"
            defaultValue={(user && user.activity_level) || 1}
            ref={register({ required: true })}
          >
            <option value="1">Little to no exercise</option>
            <option value="2">Lightly active (1-3x week)</option>
            <option value="3">Moderdately active (3-5x week)</option>
            <option value="4">Very Active (hard exercise 6-7x week)</option>
            <option value="5">Super Active (very physical job or professional athelete)</option>
          </select>
        </div>
        {/* SUBMIT */}
        <input className="submit-btn" type="submit" value="Get results" />
      </form>
    </div>
  );
};

export default UserForm;
