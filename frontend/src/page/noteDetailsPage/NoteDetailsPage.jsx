import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import { MyContext } from "../../App"; // För att få användarens token
import "./NoteDetailsPage.css";

const NoteDetailsPage = () => {
  const { noteId } = useParams();
  const { user, note, setNote, notes, setNotes } = useContext(MyContext);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotes = async () => {
      if (!user || !user.id) return;

      try {
        const response = await fetch(
          `http://localhost:8000/api/notes?userId=${user.id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${user.token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Misslyckades att hämta anteckningar");
        }

        const data = await response.json();
        const foundNote = data.notes.find((note) => note._id === noteId);
        setNote(foundNote);
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchNotes();
  }, [user]);

  if (error) {
    return <div className="note-not-found">{error}</div>;
  }

  if (!note) {
    return <div className="loading">Laddar anteckning...</div>;
  }

  const handleDelete = async () => {
    if (window.confirm("Är du säker på att du vill ta bort anteckningen?")) {
      try {
        const response = await fetch(
          `http://localhost:8000/api/notes/${noteId}?userId=${user.id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${user.token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Misslyckades att ta bort anteckningen");
        }
        // Uppdatera notes direkt
        setNotes((prevNotes) =>
          prevNotes.filter((note) => note._id !== noteId)
        );
        alert("Anteckningen har tagits bort!");
        navigate(`/${user.Id}/notes`);
      } catch (err) {
        alert(err.message);
      }
    }
  };

  return (
    <div className="note-details-container">
      <Navbar />
      <main className="note-details-main">
        <h2 className="note-details-title">{note.title}</h2>
        <p className="note-details-description">{note.beskrivning}</p>
        <div className="note-details-buttons">
          <button className="edit-button">
            <Link to={`/${user.id}/notes/${note._id}/edit`}>Redigera</Link>
          </button>
          <button className="delete-button" onClick={handleDelete}>
            Ta bort
          </button>
          <button className="back-button">
            <Link to={`/${user.Id}/notes`}>Tillbaka</Link>
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NoteDetailsPage;
