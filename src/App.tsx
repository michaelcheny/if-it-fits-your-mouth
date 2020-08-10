import React, { useState, useEffect } from "react";
import CommandLine from "./components/CommandLine";
import Footer from "./components/Footer";
import Intro from "./components/Intro";
import Results from "./components/Results";
import UserForm from "./components/UserForm";
import "./styles/main.css";

const App = () => {
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const [appState, setAppState] = useState<string>("intro");

  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      if (e.key === "Esc" || e.key === "Escape") setShowMenu((prev) => !prev);
    });
  }, []);

  const renderMain = () => {
    if (appState === "intro") return <Intro setThing={setAppState} />;
    if (appState === "user-form") return <UserForm setThing={setAppState} />;
    if (appState === "calculator-1") return <Results />;
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
