import { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import "./ForgotPassPage.css";

const ForgotPassPage = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setErrors("");
    
    try {
      const response = await fetch("http://localhost:8000/api/user/forgotPassword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      
      
      if (!response.ok) {
        setErrors(data);
        return;
      }
      
      setMessage(data);
    } catch (err) {
      console.log("Något gick fel. Försök igen senare.");
    }
  };

  return (
    <div>
      <Navbar />
      <main className="forgot-pass-container">
        <h2>Glömt Lösenord</h2>
        <form onSubmit={handleSubmit} className="forgot-pass-form">
          <label htmlFor="email">E-postadress</label>
          <input
            type="email"
            id="email"
            placeholder="Ange din e-postadress"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Hämta mitt lösenord</button>
        </form>
        {message && <p className="success-message">{message[0].message}  {message[0].password}</p>}
        {/* visa error meddelande om user kunde inte skapa konto */}
        {errors.length > 0 && (
            <ul>
              {errors.map((err, index) => (
                <li key={index} className="error">
                  {err.message}
                </li>
              ))}
            </ul>
          )}
      </main>
      <Footer />
    </div>
  );
};

export default ForgotPassPage;