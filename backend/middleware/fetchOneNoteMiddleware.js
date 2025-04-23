import mongoose from "mongoose";
import noteModel from "../model/noteModel.js";

const fetchOneNoteMiddleware = async (req, res, next) => {
  try {

    const { noteId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(noteId)) {
      return res.status(400).json({ message: "Ogiltigt noteId" });
    }

    const note = await noteModel.findById(noteId);

    if (!note) {
      return res.status(404).json({ message: "Anteckningen hittades inte" });
    }

    res.status(200).json({ note });

  } catch (err) {
    next(err);
  }
};

export default fetchOneNoteMiddleware;
