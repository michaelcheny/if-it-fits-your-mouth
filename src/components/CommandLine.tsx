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
  const insideNode = useClickOutside(() => showMenu(false));

  useLayoutEffect(() => {
    if (input.current !== null) input.current.focus();
  });

  const activateTrapCard = (selection: string) => {
    setThing(selection);
    showMenu(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "Enter") return;
    e.preventDefault();
    activateTrapCard(e.currentTarget.id);
  };

  const handleThemeChange = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "Enter") return;
    e.preventDefault();
    document.documentElement.className = "";
    document.documentElement.classList.add(`theme-${e.currentTarget.id}`);
    showMenu(false);
  };

  // Add hiding effect
  const selections = Array.from(
    document.getElementsByClassName("selection") as HTMLCollectionOf<HTMLElement>
  );
  selections.forEach((element) => {
    if (!element.innerText.toLowerCase().includes(userInput)) {
      element.style.display = "none";
    } else {
      element.style.display = "block";
    }
  });

  return (
    <FocusTrap>
      <div className="menu-modal">
        <form ref={insideNode}>
          <input
            ref={input}
            type="text"
            placeholder="Type a command"
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
            <div tabIndex={0} onKeyDown={handleKeyPress} id="resources">
              Resources
            </div>
            <div tabIndex={0} onKeyDown={handleThemeChange} id="light">
              Change theme: Light
            </div>
            <div tabIndex={0} onKeyDown={handleThemeChange} id="dark">
              Change theme: Dark
            </div>
            <div tabIndex={0} onKeyDown={handleThemeChange} id="monokai">
              Change theme: Monokai
            </div>
            <div tabIndex={0} onKeyDown={handleThemeChange} id="dracula">
              Change theme: Dracula
            </div>
          </div>
        </form>
      </div>
    </FocusTrap>
  );
};

export default CommandLine;
