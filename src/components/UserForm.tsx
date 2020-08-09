import React from "react";
import { ChangeAppProps } from "../interfaces/appstate.interface";

const UserForm = ({ setThing }: ChangeAppProps) => {
  return (
    <div>
      <form>
        <input type="text" />
        <input type="text" />
        <input type="submit" value="" />
      </form>
    </div>
  );
};

export default UserForm;
