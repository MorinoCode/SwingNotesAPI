import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} Swing Notes. Alla rättigheter förbehållna.</p>
    </footer>
  );
};

export default Footer;
