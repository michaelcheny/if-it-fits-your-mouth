import React from "react";

type ThemeProps = {
  cb: (e: React.KeyboardEvent<HTMLDivElement>) => void;
  text: string;
  id: string;
};

const CommandSelection = ({ cb, text, id }: ThemeProps) => {
  return (
    <div tabIndex={0} onKeyDown={cb} className="selection" id={id}>
      {text}
    </div>
  );
};

export default CommandSelection;
