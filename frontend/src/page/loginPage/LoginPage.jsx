import React, { useContext, useState } from "react";
import { MyContext } from "../../App";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import { Link } from "react-router-dom";
import "./LoginPage.css";

const LoginPage = () => {
  const { user, setUser } = useContext(MyContext) || {};
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const loginHandler = async (e) => {
    e.preventDefault();

    setError(null);

    try {
      const response = await fetch("http://localhost:8000/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const data = await response.json();

      if (response.ok) {
        setUser({
          email: data.email,
          password: data.password,
          token: data.token,
          id: data.userId,
        });

        console.log("Inloggad som:", data.email);

        // Navigera korrekt med användarens ID
        navigate(`/${data.userId}/notes`);
      } else {
        setError(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="login-container">
      <Navbar />
      <main className="login-main">
        <div className="login-box">
          <h2 className="login-title">Logga in</h2>
          <form>
            <div className="input-group">
              <label htmlFor="email">E-post</label>
              <input
                type="email"
                id="email"
                placeholder="Ange din e-post"
                required
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                value={user?.email || ""}
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">Lösenord</label>
              <input
                type="password"
                id="password"
                placeholder="Ange ditt lösenord"
                required
                value={user?.password || ""}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              />
            </div>

            {/* Visa felmeddelanden */}
            {error &&
              error.validationErrors.map((err, index) => (
                <p key={index} style={{ color: "red" }}>
                  {err.message}
                </p>
              ))}

            <button
              type="submit"
              className="login-button"
              onClick={loginHandler}
            >
              Logga in
            </button>
            <p className="userMessage">
              Har du inget konto? <Link to={"/signup"}>Skapa Konto</Link>
            </p>
            <p className="userMessage">
              Glömde lösenord? <Link to={"/forgottPassword"}>Klicka här</Link>
            </p>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LoginPage;
