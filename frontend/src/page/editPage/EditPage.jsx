import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import { MyContext } from "../../App";
import "./EditPage.css";

const EditPage = () => {
  const { user, note, setNote } = useContext(MyContext);
  const { noteId } = useParams();
  const navigate = useNavigate();
  const [newNote , setNewNote]= useState({})

  const handleSave = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/notes/${noteId}`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newNote),
      });

      if (!response.ok) {
        throw new Error("Misslyckades att uppdatera anteckningen");
      }

      alert("Anteckningen har sparats!");
      navigate(`/${user.id}/notes`);
    } catch (err) {
      alert(err.message);
    }
  };


  if (!note) {
    return <div className="note-not-found">Anteckningen hittades inte.</div>;
  }

  return (
    <div className="edit-container">
      <Navbar />
      <main className="edit-main">
        <h2 className="edit-title">Redigera Anteckning</h2>
        <input
          type="text"
          className="edit-input"
          placeholder={note.title}
          onChange={(e) => setNewNote({...newNote , title : e.target.value})}
        />
        <textarea
          className="edit-textarea"
          placeholder={note.beskrivning}
          onChange={(e) => setNewNote({...newNote, beskrivning : e.target.value})}
        ></textarea>
        <div className="edit-buttons">
          <button className="save-button" onClick={handleSave}>
            Spara
          </button>
          <button className="back-button" onClick={() => navigate(`/${user.Id}/notes`)}>
            Tillbaka
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default EditPage;
