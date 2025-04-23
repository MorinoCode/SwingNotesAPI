import noteModel from "../model/noteModel.js";
import mongoose from "mongoose";

const deleteNoteMiddleware = async (req, res, next) => {
  try {
    const { noteId } = req.params;

    // Kontrollera om noteId är ett giltigt ObjectId
    if (!mongoose.Types.ObjectId.isValid(noteId)) {
      return res.status(400).json({ message: "Ogiltigt noteId" });
    }

    // Hitta och ta bort anteckningen från DB
    const deletedNote = await noteModel.findByIdAndDelete(noteId);

    if (!deletedNote) {
      return res.status(404).json({ message: "Anteckningen hittades inte" });
    }

    // Skicka response om borttagning lyckades
    res.status(200).json({ message: "Anteckningen har tagits bort" });

  } catch (err) {
    next(err);
  }
};

export default deleteNoteMiddleware;
