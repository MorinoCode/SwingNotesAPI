import React from "react";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="home-container">
      <Navbar />
      <main className="main-content">
        <h1 className="animated-text">Börja skapa dina anteckningar</h1>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
