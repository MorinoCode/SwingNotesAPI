import React, { createContext, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import HomePage from "./page/homepage/HomePage";
import LoginPage from "./page/loginPage/LoginPage";
import SignupPage from "./page/signupPage/SignupPage";
import NotesPage from "./page/notesPage/NotesPage";
import NoteDetailsPage from "./page/noteDetailsPage/noteDetailsPage";
import EditPage from "./page/editPage/EditPage";
import CreateNote from "./page/createNote/CreateNote";
import NotFound from "./page/notfound/Notfound";
export const MyContext = createContext();

const App = () => {
  const [notes, setNotes] = useState([]);
  const [user, setUser] = useState({ email: "", password: "", token: "" });
  const [note, setNote] = useState(null);

  return (
    <BrowserRouter>
      <MyContext.Provider value={{ user, setUser, notes, setNotes,note, setNote }}>
        <Routes>
          <Route path={"/"} element={<HomePage />} />
          <Route path={"/login"} element={<LoginPage />} />
          <Route path={"/signup"} element={<SignupPage />} />
          <Route path={"/:userId/notes"} element={<NotesPage />} />
          <Route path={"/:userId/createNotes"} element={<CreateNote />} />
          <Route path={"/:userId/notes/:noteId"} element={<NoteDetailsPage />}/>
          <Route path={"/:userId/notes/:noteId/edit"} element={<EditPage />} />
          <Route path={"/*"} element={<NotFound />} />
        </Routes>
      </MyContext.Provider>
    </BrowserRouter>
  );
};

export default App;
