import React, { useContext, useEffect, useState } from "react";
import { MyContext } from "../../App";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import Note from "../../components/note/Note";
import "./NotesPage.css";

const NotesPage = () => {
  const { user, notes, setNotes } = useContext(MyContext);
  const [searchTitle, setSearchTitle] = useState("");

  const fetchNotes = async (title = "") => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/notes?userId=${user.id}&title=${title}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Inga anteckningar hittade");
      }

      const data = await response.json();
      setNotes(data.notes);
      
    } catch (err) {
      console.log(err.message);
      setNotes([]); // visa inga anteckningar om det blir fel
    }
  };

  useEffect(() => {
    if (user.id) {
      fetchNotes();
    }
  }, [user.id]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchNotes(searchTitle);
  };

  return (
    <div className="notes-container">
      <Navbar />
      <main className="notes-main">
        <h2 className="notes-title">Mina Anteckningar</h2>

        {/* Sökruta */}
        <form className="search-form" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Sök efter titel..."
            value={searchTitle}
            onChange={(e) => setSearchTitle(e.target.value)}
          />
          <button type="submit">Sök</button>
        </form>

        {/* Lista med anteckningar */}
        <div className="notes-list">
          {notes.length > 0 ? (
            notes.map((note) => (
              <Note
                key={note._id}
                title={note.title}
                beskrivning={note.beskrivning}
                id={note._id}
                userId={note.userId}
              />
            ))
          ) : (
            <p>Inga anteckningar hittades.</p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotesPage;
