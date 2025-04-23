import "./Navbar.css";
import React, { useContext } from "react";
import { MyContext } from "../../App";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user, setUser } = useContext(MyContext) || {};
  const navigate = useNavigate();

  // Kontrollera om användaren är inloggad
  const isLoggedIn = user.email && user.password && user.token;

  // Hantera utloggning
  const handleLogout = () => {
    setUser({ email: "", password: "", token: "", id: "" });
    navigate("/login");
  };
  const sendToHomePage = ()=>{
    navigate('/')
  }
  return (
    <nav className="navbar">
      <h2 className="logo" onClick={sendToHomePage}>Swing Notes</h2>
      <ul className="nav-links">
        {isLoggedIn ? (
          <>
            <li>
              <NavLink
                to={`/${user.id}/createNotes`}
                className={({ isActive }) => (isActive ? "active-link" : "")}
              >
                Skapa Anteckning
              </NavLink>
            </li>
            <li>
              <NavLink
                to={`/${user.id}/notes`}
                className={({ isActive }) => (isActive ? "active-link" : "")}
              >
                Anteckningar
              </NavLink>
            </li>
            <li>
              <button className="logout-btn" onClick={handleLogout}>
                Logga ut
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink
                to="/login"
                className={({ isActive }) => (isActive ? "active-link" : "")}
              >
                Logga in
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/signup"
                className={({ isActive }) => (isActive ? "active-link" : "")}
              >
                Skapa konto
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
