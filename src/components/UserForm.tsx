import React from "react";
import { ChangeAppProps } from "../interfaces/appstate.interface";

const UserForm = ({ setThing }: ChangeAppProps) => {
  return (
    <div className="user-form-section">
      <form>
        <div className="selection">
          <label id="gender">Gender</label>
          <div className="gender-select">
            <div className="radio-group">
              <input type="radio" id="male" name="gender" value="male" /> <label id="male"> Male</label>
            </div>
            <div className="radio-group">
              <input type="radio" id="female" name="gender" value="female" />{" "}
              <label id="female"> Female</label>
            </div>
          </div>
        </div>
        {/* AGE */}
        <div className="selection">
          <label id="age">Age</label>
          <input type="number" id="age" defaultValue="21" />
        </div>
        {/* HEIGHT */}
        <div className="selection">
          <label id="height">Height</label>
          <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            <div style={{ display: "inline-flex" }}>
              <select name="feet" id="feet" className="height" defaultValue="5">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
              </select>
              <label id="feet"> Ft</label>
            </div>
            <div style={{ display: "inline-flex" }}>
              <select name="inches" id="inches" className="height" defaultValue="1">
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
                <option value="12">12</option>
              </select>
              <label id="inches"> In</label>
            </div>
          </div>
        </div>
        {/* WEIGHT */}
        <div className="selection">
          <label id="weight">Weight</label>
          <input type="number" name="weight" defaultValue="100" />
        </div>
        {/* ACTIVITY LEVEL */}
        <div className="selection">
          <label id="activity_level">Activity Level</label>
          <select
            name="activity_level"
            placeholder="Activity level"
            id="activity_level"
            defaultValue={1}
          >
            <option value="1">Lazy</option>
            <option value="2">Sort of Lazy</option>
            <option value="3">Not Lazy</option>
            <option value="4">Active</option>
            <option value="5">Very Active</option>
          </select>
        </div>
        {/* SUBMIT */}
        <input className="submit-btn" type="submit" value="Get results" />
      </form>
    </div>
  );
};

export default UserForm;
