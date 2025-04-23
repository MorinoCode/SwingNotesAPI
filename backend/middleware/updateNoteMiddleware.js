import noteModel from "../model/noteModel.js";
import noteValidator from "../validator/noteValidator.js";
import mongoose from "mongoose";

const updateNoteMiddleware = async (req, res, next) => {
  try {
    const { noteId } = req.params;
    const { title, beskrivning } = req.body;

    // 1. Kontrollera om noteId är giltigt
    if (!mongoose.Types.ObjectId.isValid(noteId)) {
      return res.status(400).json({ message: "Ogiltigt noteId" });
    }

    // 2. Hämta anteckningen som ska uppdateras
    const note = await noteModel.findById(noteId);

    if (!note) {
      return res.status(404).json({ message: "Anteckningen hittades inte" });
    }

    // 3. Validera den nya inputen
    const isNoteValid = await noteValidator({ title, beskrivning });

    if (isNoteValid !== true) {
      return res.status(400).json({ message: isNoteValid });
    }

    // 4. Uppdatera only if title eller beskrivning har ändrats
    const updates = {
      title: title || note.title,
      beskrivning: beskrivning || note.beskrivning,
      modifiedAt: new Date(),  // Uppdatera modifiedAt
    };

    const updatedNote = await noteModel.findByIdAndUpdate(noteId, updates, { new: true });

    res.status(200).json({ message: "Anteckningen uppdaterades", updatedNote });
  } catch (err) {
    next(err);
  }
};

export default updateNoteMiddleware;
