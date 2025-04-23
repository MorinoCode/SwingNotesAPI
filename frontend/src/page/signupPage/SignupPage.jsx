import React, { useContext, useState } from "react";
import { MyContext } from "../../App";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import "./SignupPage.css";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const { user, setUser } = useContext(MyContext) || {};
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const createUser = async (e) => {
    e.preventDefault();

    // Rensa gamla fel innan ny förfrågan
    setError(null);

    try {
      const response = await fetch("http://localhost:8000/api/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        console.log(data);
        navigate("/login");
      } else {
        setError(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="sign-container">
      <Navbar />
      <main className="sign-main">
        <div className="sign-box">
          <h2 className="sign-title">Skapa Konto</h2>
          <form>
            <div className="input-group">
              <label htmlFor="email">E-post</label>
              <input
                value={user?.email || ""}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                type="email"
                id="email"
                placeholder="Ange din e-post"
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">Lösenord</label>
              <input
                value={user?.password || ""}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                type="password"
                id="password"
                placeholder="Ange ditt lösenord"
                required
              />
            </div>

            {/* Visa felmeddelanden */}
            {error &&
              error.validationErrors.map((err , index) => (
                <p key={index} style={{ color: "red" }}>{err.message}</p>
              ))}

            <button type="submit" className="sign-button" onClick={createUser}>
              Skapa
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SignupPage;
