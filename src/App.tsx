import { useEffect, useState } from "react";
import CommandLine from "./components/CommandLine";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Intro from "./components/Intro";
import Resources from "./components/Resources";
import Results from "./components/Results";
import UserForm from "./components/UserForm";
import { setTheme } from "./helpers/themeChange";
import { loadUser, saveUser } from "./helpers/userStorage";
import type { AppState } from "./interfaces/appstate.interface";
import type { User } from "./interfaces/user.interface";
import "./styles/main.css";

const THEME_KEY = "iifym-theme";
type Gender = "male" | "female";
type Profiles = Record<Gender, User | undefined>;

const App = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [appState, setAppState] = useState<AppState>("intro");
  const [gender, setGender] = useState<Gender>("male");
  const [profiles, setProfiles] = useState<Profiles>(() => ({
    male: loadUser("male"),
    female: loadUser("female"),
  }));

  useEffect(() => {
    const onKeydown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowMenu((prev) => !prev);
    };
    document.addEventListener("keydown", onKeydown);
    return () => document.removeEventListener("keydown", onKeydown);
  }, []);
  // Scroll to top whenever the page changes so content is never stuck under the header.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [appState]);

  useEffect(() => {
    const theme = localStorage.getItem(THEME_KEY);
    if (theme !== null) setTheme(theme);
  }, []);

  // Each sex keeps its own profile; switching never carries stats over.
  const user = profiles[gender];

  const setUser = (updated: User | undefined) => {
    setProfiles((prev) => ({ ...prev, [updated?.gender ?? gender]: updated }));
    if (updated !== undefined) saveUser(updated);
  };

  const renderMain = () => {
    switch (appState) {
      case "intro":
        return <Intro setThing={setAppState} />;
      case "user-form":
        return (
          <UserForm
            key={gender}
            user={user}
            gender={gender}
            setGender={setGender}
            setUser={setUser}
            setThing={setAppState}
          />
        );
      case "result":
        return user ? (
          <Results user={user} setUser={setUser} setThing={setAppState} />
        ) : (
          <Intro setThing={setAppState} />
        );
      case "resources":
        return <Resources />;
    }
  };

  return (
    <div className="app-shell">
      <Header appState={appState} setAppState={setAppState} onOpenMenu={() => setShowMenu(true)} />
      <main className="app-main">
        <div className="page">{renderMain()}</div>
      </main>
      <Footer />
      {showMenu && <CommandLine showMenu={setShowMenu} setThing={setAppState} />}
    </div>
  );
};

export default App;
