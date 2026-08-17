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
        <button className="icon-btn" onClick={onOpenMenu} title="Command palette (Esc)" aria-label="Open command palette">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;
