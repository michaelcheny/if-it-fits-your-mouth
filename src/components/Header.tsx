import { useRef, useEffect } from "react";
import type { AppState } from "../interfaces/appstate.interface";

type HeaderProps = {
  appState: AppState;
  setAppState: (state: AppState) => void;
  onOpenMenu: () => void;
};

const NAV_ITEMS: { id: AppState; label: string }[] = [
  { id: "intro", label: "Home" },
  { id: "user-form", label: "Your Stats" },
  { id: "result", label: "Results" },
  { id: "resources", label: "Learn" },
];

const Header = ({ appState, setAppState, onOpenMenu }: HeaderProps) => {
  const menuBtnRef = useRef<HTMLButtonElement>(null);

  // Use a native listener to avoid React synthetic event issues with
  // backdrop-filter headers in some browsers.
  useEffect(() => {
    const btn = menuBtnRef.current;
    if (!btn) return;
    const handler = () => onOpenMenu();
    btn.addEventListener("click", handler);
    return () => btn.removeEventListener("click", handler);
  }, [onOpenMenu]);

  return (
    <header className="app-header">
      <div className="brand" onClick={() => setAppState("intro")}>
        <span className="brand-mark">🍩</span>
        If It Fits Your Mouth
      </div>

      <nav className="main-nav">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            className={`nav-link${appState === item.id ? " active" : ""}`}
            onClick={() => setAppState(item.id)}
          >
            {item.label}
          </button>
        ))}
      </nav>

      <div className="header-actions">
        <button
          ref={menuBtnRef}
          className="icon-btn"
          title="Switch theme (Esc)"
          aria-label="Switch theme"
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ pointerEvents: "none" }}>
            <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.9 0 1.8-.7 1.8-1.8 0-.5-.2-.9-.5-1.2-.3-.3-.5-.7-.5-1.2 0-1 .8-1.8 1.8-1.8H17c2.8 0 5-2.2 5-5 0-4.4-4.5-8-10-8z" />
            <circle cx="6.5" cy="11.5" r="1.5" fill="currentColor" stroke="none" />
            <circle cx="9.5" cy="7.5" r="1.5" fill="currentColor" stroke="none" />
            <circle cx="14.5" cy="7.5" r="1.5" fill="currentColor" stroke="none" />
            <circle cx="17.5" cy="11.5" r="1.5" fill="currentColor" stroke="none" />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;
