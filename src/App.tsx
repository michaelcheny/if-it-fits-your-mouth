import React, { useState } from "react";
import CommandLine from "./components/CommandLine";
import Footer from "./components/Footer";
import Intro from "./components/Intro";
import "./styles/main.css";

const App = () => {
  const [showMenu, setShowMenu] = useState<boolean>(true);
  return (
    <>
      {showMenu && <CommandLine showMenu={setShowMenu} />}
      <div className="grid-container">
        <div className="header">If It Fits Your Mouth</div>
        <div className="main-content">
          <Intro />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default App;
