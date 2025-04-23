import React, { useState, useContext } from "react";
import { MyContext } from "../../App";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import "./CreateNote.css";

const CreateNote = () => {
  const { user } = useContext(MyContext) || {};
  const navigate = useNavigate();
  const [note, setNote] = useState({
    title: "",
    beskrivning: "",
    userId: user.id,
  });
  const [error, setError] = useState(null);

  const handleCreate = async () => {
    if (!note.title || !note.beskrivning) {
      setError("Både titel och beskrivning måste fyllas i.");
      return;
    }
  
    const noteData = { ...note, userId: user.id };
  
    try {
      const response = await fetch(`http://localhost:8000/api/notes/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(noteData),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        navigate(`/${user.id}/notes`);
      } else {
        setError(data.message || "Något gick fel, försök igen.");
      }
    } catch (err) {
      setError("Kunde inte skapa anteckning, försök igen.");
    }
  };
  

  return (
    <div className="create-note-container">
      <Navbar />
      <main className="create-note-main">
        <div className="create-note-box">
          <h2>Skapa Anteckning</h2>
          <div className="input-group">
            <label htmlFor="title">Titel</label>
            <input
              type="text"
              id="title"
              placeholder="Ange titel"
              value={note.title}
              onChange={(e) => setNote({ ...note, title: e.target.value })}
            />
          </div>
          <div className="input-group">
            <label htmlFor="description">Beskrivning</label>
            <textarea
              id="description"
              placeholder="Skriv en beskrivning..."
              value={note.beskrivning}
              onChange={(e) =>
                setNote({ ...note, beskrivning: e.target.value })
              }
            />
          </div>

          {error && <p className="error-text">{error}</p>}

          <div className="button-group">
            <button className="create-btn" onClick={handleCreate}>
              Skapa
            </button>
            <button
              className="back-btn"
              onClick={() => navigate(`/${user.id}/notes`)}
            >
              Tillbaka
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CreateNote;
