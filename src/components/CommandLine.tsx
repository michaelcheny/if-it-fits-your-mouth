import React, { useRef, useLayoutEffect } from "react";
import { useClickOutside } from "../hooks/useClickOutside";

type MenuProps = {
  showMenu: React.Dispatch<React.SetStateAction<boolean>>;
};

const CommandLine = ({ showMenu }: MenuProps) => {
  const input = useRef<HTMLInputElement>(null);

  useLayoutEffect(() => {
    if (input.current !== null) input.current.focus();
  });

  const insideNode = useClickOutside(() => showMenu(false));

  return (
    <div className="menu-modal">
      <form ref={insideNode}>
        <input type="text" placeholder="Type " ref={input} />
        {/* <select>
          <option value="">sdfjksdkjfhsjdkf</option>
        </select> */}
      </form>
    </div>
  );
};

export default CommandLine;
