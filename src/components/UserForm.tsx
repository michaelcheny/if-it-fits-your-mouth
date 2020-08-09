import React from "react";
import { ChangeAppProps } from "../interfaces/appstate.interface";

const UserForm = ({ setThing }: ChangeAppProps) => {
  return (
    <div className="user-form-section">
      <form>
        <label id="gender">Gender</label>
        <div className="gender-select">
          <div className="radio-group">
            <input type="radio" id="male" name="gender" value="male" />
            <label id="male"> Male</label>
          </div>
          <div className="radio-group">
            <input type="radio" id="female" name="gender" value="female" />
            <label id="female"> Female</label>
          </div>
          {/* </input> */}
        </div>

        <label id="age">Age</label>
        <input type="number" id="age" />
        {/* HEIGHT */}
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
            <label id="feet"> Feet</label>
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
            <label id="inches"> Inches</label>
          </div>
        </div>
        <input type="submit" value="" />
      </form>
    </div>
  );
};

export default UserForm;
