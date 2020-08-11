import React, { useState, useEffect } from "react";
import CommandLine from "./components/CommandLine";
import Footer from "./components/Footer";
import Intro from "./components/Intro";
import Macros from "./components/Macros";
import Results from "./components/Results";
import UserForm from "./components/UserForm";
import { User } from "./interfaces/user.interface";
import "./styles/main.css";

const App = () => {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [appState, setAppState] = useState<string>("intro");
  const [user, setUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      if (e.key === "Esc" || e.key === "Escape") setShowMenu((prev) => !prev);
    });

    const userObj = localStorage.getItem("userStats");
    setUser(userObj !== null ? JSON.parse(userObj) : undefined);
  }, []);

  const renderMain = () => {
    if (appState === "intro") return <Intro setThing={setAppState} />;
    if (appState === "user-form")
      return <UserForm user={user} setUser={setUser} setThing={setAppState} />;
    if (appState === "result")
      return user ? (
        <Results user={user} setUser={setUser} setThing={setAppState} />
      ) : (
        "Enter your stats first"
      );
    if (appState === "macros") return user ? <Macros /> : "Enter your stats first";
  };

  return (
    <>
      {showMenu && <CommandLine showMenu={setShowMenu} setThing={setAppState} />}
      <div className="grid-container">
        <div className="header">
          <h3>If It Fits Your Mouth</h3>
        </div>
        <div className="main-content">{renderMain()}</div>
        <Footer />
      </div>
    </>
  );
};

export default App;
