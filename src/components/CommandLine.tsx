import React, { useRef, useLayoutEffect, useState } from "react";
import { useClickOutside } from "../hooks/useClickOutside";
import FocusTrap from "focus-trap-react";
import { setTheme } from "../helpers/themeChange";
import CommandSelection from "./CommandSelection";
import commands from "../data/commandSelections.json";

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
    // if (userInput.length === 0) return;
    setThing(selection);
    showMenu(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    // if (userInput == "") return;
    if (e.key !== "Enter") return;
    e.preventDefault();
    activateTrapCard(e.currentTarget.id);
  };

  const handleThemeChange = (e: React.KeyboardEvent<HTMLDivElement>) => {
    // if (userInput == "") return;
    if (e.key !== "Enter") return;
    e.preventDefault();
    setTheme(`theme-${e.currentTarget.id}`);
    localStorage.setItem("iifym-theme", `theme-${e.currentTarget.id}`);
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
            {commands.map((command) => (
              <CommandSelection
                key={command.id}
                id={command.id}
                cb={command.cb === "page" ? handleKeyPress : handleThemeChange}
                text={command.text}
              />
            ))}
          </div>
        </form>
      </div>
    </FocusTrap>
  );
};

export default CommandLine;
