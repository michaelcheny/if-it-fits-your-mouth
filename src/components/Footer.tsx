import React from "react";

const Footer = () => {
  return (
    <section id="footer">
      <div>
        <span className="command">esc</span> - Command Line
      </div>
      <div>
        <span className="command">tab</span> - Next Selection
      </div>
      <div>
        <span className="command">shift</span> <span className="command">tab</span> - Previous Selection
      </div>
      <div>
        Built by{" "}
        <a href="https://michaelchen.dev" target="_blank" rel="noopener noreferrer">
          Michael Chen
        </a>
      </div>
      <div>v1.0.0</div>
    </section>
  );
};

export default Footer;
