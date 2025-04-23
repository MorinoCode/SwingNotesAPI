import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import "./NotFound.css";

const NotFound = () => {
  return (
    <div className="not-found-container">
      <Navbar />
      <main className="not-found-main">
        <h1 className="not-found-title">404</h1>
        <p className="not-found-text">Sidan du letar efter finns inte.</p>
        <Link to="/" className="not-found-button">Tillbaka till startsidan</Link>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
