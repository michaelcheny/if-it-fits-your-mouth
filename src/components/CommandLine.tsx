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

  const activateTrapCard = (selection: string) => {
    setThing(selection);
    showMenu(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "Enter") return;
    e.preventDefault();
    console.log(e.currentTarget.id);
    activateTrapCard(e.currentTarget.id);
  };

  return (
    <div className="menu-modal">
      <FocusTrap>
        <form ref={insideNode}>
          <input ref={input} type="text" placeholder="Type " tabIndex={0} />
          <div className="selections">
            <div tabIndex={0} onKeyDown={handleKeyPress} id="intro">
              Return to Main Menu
            </div>
            <div tabIndex={0} onKeyDown={handleKeyPress} id="user-form">
              Edit User Stats
            </div>
            <div tabIndex={0} onKeyDown={handleKeyPress} id="result">
              Results
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
      </FocusTrap>
    </div>
  );
};

export default CommandLine;
