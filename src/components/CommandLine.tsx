import { useEffect, useRef, useState } from "react";
import { setTheme } from "../helpers/themeChange";

type MenuProps = {
  showMenu: React.Dispatch<React.SetStateAction<boolean>>;
};

const THEME_KEY = "iifym-theme";

type ThemeOption = {
  id: string;
  label: string;
  swatch: string;
};

const THEMES: ThemeOption[] = [
  { id: "light", label: "Light", swatch: "#f6f7f9" },
  { id: "dark", label: "Dark", swatch: "#16181d" },
  { id: "monokai", label: "Monokai", swatch: "#a6e22e" },
  { id: "dracula", label: "Dracula", swatch: "#ff79c6" },
  { id: "soft-tone", label: "Soft Tone", swatch: "#5f8a6e" },
];

const CommandLine = ({ showMenu }: MenuProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  // Ignore overlay clicks that arrive within the first 150ms of mount —
  // those belong to the same pointer gesture that opened the palette.
  const mountedAt = useRef(Date.now());

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (Date.now() - mountedAt.current < 150) return;
      if (listRef.current && !listRef.current.contains(e.target as Node)) {
        showMenu(false);
      }
    };
    document.addEventListener("click", onClickOutside);
    return () => document.removeEventListener("click", onClickOutside);
  }, [showMenu]);

  const filtered = THEMES.filter((t) => t.label.toLowerCase().includes(query));

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  const applyTheme = (theme: ThemeOption) => {
    const cls = `theme-${theme.id}`;
    setTheme(cls);
    localStorage.setItem(THEME_KEY, cls);
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
      applyTheme(filtered[activeIndex]);
    }
  };

  return (
    <div
      className="palette-overlay"
      onClick={() => {
        if (Date.now() - mountedAt.current < 150) return;
        showMenu(false);
      }}
    >
      <div className="palette" ref={listRef} onClick={(e) => e.stopPropagation()}>
        <input
          ref={inputRef}
          className="palette-input"
          type="text"
          placeholder="Pick a theme…"
          value={query}
          onChange={(e) => setQuery(e.target.value.toLowerCase())}
          onKeyDown={onKeyDown}
        />
        <div className="palette-list">
          {filtered.length === 0 && <div className="palette-empty">No matching themes</div>}
          {filtered.map((theme, i) => (
            <button
              key={theme.id}
              className={`palette-item${i === activeIndex ? " focused" : ""}`}
              style={i === activeIndex ? { background: "var(--surface)" } : undefined}
              onMouseEnter={() => setActiveIndex(i)}
              onClick={() => applyTheme(theme)}
            >
              <span className="swatch" style={{ background: theme.swatch }} />
              {theme.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommandLine;
