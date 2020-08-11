import React, { useRef, useLayoutEffect, useState } from "react";
import { useClickOutside } from "../hooks/useClickOutside";
import FocusTrap from "focus-trap-react";

type MenuProps = {
  showMenu: React.Dispatch<React.SetStateAction<boolean>>;
  setThing: React.Dispatch<React.SetStateAction<string>>;
};

const CommandLine = ({ showMenu, setThing }: MenuProps) => {
  const input = useRef<HTMLInputElement>(null);

  const [userInput, setUserInput] = useState("");

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

  const selections = Array.from(
    document.getElementsByClassName("selection") as HTMLCollectionOf<HTMLElement>
  );

  selections.forEach((element) => {
    if (!element.innerText.toLowerCase().startsWith(userInput)) {
      element.style.display = "none";
    } else {
      element.style.display = "block";
    }
  });

  return (
    <div className="menu-modal">
      <FocusTrap>
        <form ref={insideNode}>
          <input
            ref={input}
            type="text"
            placeholder="Type "
            value={userInput}
            onChange={(e) => setUserInput(e.target.value.toLowerCase())}
            tabIndex={0}
          />
          <div className="selections">
            <div tabIndex={0} onKeyDown={handleKeyPress} className="selection" id="intro">
              Return to Main Menu
            </div>
            <div tabIndex={0} onKeyDown={handleKeyPress} className="selection" id="user-form">
              Edit User Stats
            </div>
            <div tabIndex={0} onKeyDown={handleKeyPress} className="selection" id="result">
              Results
            </div>
            {/* <div tabIndex={0} onKeyDown={handleKeyPress} id="macros">
              Macros
            </div>
            <div tabIndex={0} onKeyDown={handleKeyPress}>
              thiing
            </div> */}
          </div>
        </form>
      </FocusTrap>
    </div>
  );
};

export default CommandLine;
