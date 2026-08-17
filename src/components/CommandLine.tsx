import { useEffect, useRef, useState } from "react";
import type { AppState } from "../interfaces/appstate.interface";
import { setTheme } from "../helpers/themeChange";

type MenuProps = {
  showMenu: React.Dispatch<React.SetStateAction<boolean>>;
  setThing: (state: AppState) => void;
};

const THEME_KEY = "iifym-theme";

type Command = {
  id: string;
  text: string;
  kind: "page" | "theme";
  swatch?: string;
};

const COMMANDS: Command[] = [
  { id: "intro", text: "Go to Home", kind: "page" },
  { id: "user-form", text: "Edit Your Stats", kind: "page" },
  { id: "result", text: "View Results", kind: "page" },
  { id: "resources", text: "Learn About Macros", kind: "page" },
  { id: "light", text: "Theme: Light", kind: "theme", swatch: "#f6f7f9" },
  { id: "dark", text: "Theme: Dark", kind: "theme", swatch: "#16181d" },
  { id: "monokai", text: "Theme: Monokai", kind: "theme", swatch: "#a6e22e" },
  { id: "dracula", text: "Theme: Dracula", kind: "theme", swatch: "#ff79c6" },
  { id: "soft-tone", text: "Theme: Soft Tone", kind: "theme", swatch: "#5f8a6e" },
];

const CommandLine = ({ showMenu, setThing }: MenuProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (listRef.current && !listRef.current.contains(e.target as Node)) {
        showMenu(false);
      }
    };
    document.addEventListener("click", onClickOutside);
    return () => document.removeEventListener("click", onClickOutside);
  }, [showMenu]);

  const filtered = COMMANDS.filter((c) => c.text.toLowerCase().includes(query));

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  const runCommand = (cmd: Command) => {
    if (cmd.kind === "theme") {
      const theme = `theme-${cmd.id}`;
      setTheme(theme);
      localStorage.setItem(THEME_KEY, theme);
    } else {
      setThing(cmd.id as AppState);
    }
    showMenu(false);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && filtered[activeIndex]) {
      e.preventDefault();
      runCommand(filtered[activeIndex]);
    }
  };

  return (
    <div className="palette-overlay" onClick={() => showMenu(false)}>
      <div className="palette" ref={listRef} onClick={(e) => e.stopPropagation()}>
        <input
          ref={inputRef}
          className="palette-input"
          type="text"
          placeholder="Type a command…"
          value={query}
          onChange={(e) => setQuery(e.target.value.toLowerCase())}
          onKeyDown={onKeyDown}
        />
        <div className="palette-list">
          {filtered.length === 0 && <div className="palette-empty">No matching commands</div>}
          {filtered.map((cmd, i) => (
            <button
              key={cmd.id}
              className={`palette-item${i === activeIndex ? " focused" : ""}`}
              style={i === activeIndex ? { background: "var(--surface)" } : undefined}
              onMouseEnter={() => setActiveIndex(i)}
              onClick={() => runCommand(cmd)}
            >
              {cmd.swatch && <span className="swatch" style={{ background: cmd.swatch }} />}
              {cmd.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommandLine;
