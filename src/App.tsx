import React from "react";
import Footer from "./components/Footer";
import Intro from "./components/Intro";
import "./styles/main.css";

const App = () => {
  return (
    <div className="grid-container">
      <div className="header">If It Fits Your Mouth</div>
      <div className="main-content">
        <Intro />
      </div>
      <Footer />
    </div>
  );
};

export default App;
