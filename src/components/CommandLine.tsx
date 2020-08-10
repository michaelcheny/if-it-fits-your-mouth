import React, { useRef, useLayoutEffect } from "react";
import { useClickOutside } from "../hooks/useClickOutside";
import FocusTrap from "focus-trap-react";

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
    if (e.key !== "Enter") return;
    e.preventDefault();
    console.log(e.currentTarget.id);
    if (e.currentTarget.id === "intro") {
      setThing("intro");
      showMenu(false);
    }
    if (e.currentTarget.id === "user") {
      setThing("user-form");
      showMenu(false);
    }
  };

  return (
    <div className="menu-modal">
      <form ref={insideNode}>
        <input ref={input} type="text" placeholder="Type " tabIndex={0} />
        <FocusTrap>
          <div className="selections">
            <div tabIndex={0} onKeyDown={handleKeyPress} id="intro">
              Return to Main Menu
            </div>
            <div tabIndex={0} onKeyDown={handleKeyPress} id="user">
              Edit User Stats
            </div>
            <div tabIndex={0} onKeyDown={handleKeyPress} id="calc-1">
              TDEE Calculator
            </div>
            <div tabIndex={0} onKeyDown={handleKeyPress}>
              thiing
            </div>
            <div tabIndex={0} onKeyDown={handleKeyPress}>
              thiing
            </div>
          </div>
        </FocusTrap>
        {/* <select>
          <option value="">sdfjksdkjfhsjdkf</option>
        </select> */}
      </form>
    </div>
  );
};

export default CommandLine;
