import React, { useRef, useLayoutEffect } from "react";
import { useClickOutside } from "../hooks/useClickOutside";

type MenuProps = {
  showMenu: React.Dispatch<React.SetStateAction<boolean>>;
  setThing: React.Dispatch<React.SetStateAction<string>>;
};

const CommandLine = ({ showMenu, setThing }: MenuProps) => {
  const input = useRef<HTMLInputElement>(null);

  useLayoutEffect(() => {
    if (input.current !== null) input.current.focus();
  });

  const insideNode = useClickOutside(() => showMenu(false));

  const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      console.log("poop");
      console.log(e);
    }
  };

  return (
    <div className="menu-modal">
      <form ref={insideNode}>
        <input ref={input} type="text" placeholder="Type " tabIndex={0} />
        <div className="selections">
          <div tabIndex={0} onKeyDown={(e) => handleKeyPress(e)}>
            thiing
          </div>
          <div tabIndex={0} onKeyDown={handleKeyPress}>
            thiing
          </div>
          <div tabIndex={0} onKeyDown={handleKeyPress}>
            thiing
          </div>
          <div tabIndex={0} onKeyDown={handleKeyPress}>
            thiing
          </div>
          <div tabIndex={0} onKeyDown={handleKeyPress}>
            thiing
          </div>
        </div>
        {/* <select>
          <option value="">sdfjksdkjfhsjdkf</option>
        </select> */}
      </form>
    </div>
  );
};

export default CommandLine;
