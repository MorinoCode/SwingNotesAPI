import React from "react";
import { Link } from "react-router-dom";
import "./Note.css";

const Note = ({ title, description, id, userId }) => {
  return (
    <div className="note-card">
      <h3 className="note-title">{title}</h3>
      <p className="note-description">{description}</p>
      <button className="note-button">
        <Link to={`/${userId}/notes/${id}`}>Läs mer</Link>
      </button>
    </div>
  );
};

export default Note;
