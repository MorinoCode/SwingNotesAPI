import noteModel from "../model/noteModel.js";
import mongoose from "mongoose";

const fetchNotesMiddleware = async (req, res, next) => {
  const { userId, title } = req.query;

  if (!userId) {
    return res.status(400).json({ message: "userId krävs" });
  }

  try {
    const query = { userId: new mongoose.Types.ObjectId(userId) };

    // Om title skickats med, lägg till regex-sökning
    if (title) {
      query.title = { $regex: new RegExp(title, "i") }; // i = case-insensitive
    }

    const allNotes = await noteModel.find(query);

    if (allNotes.length === 0) {
      return res.status(404).send({ message: "Inga anteckningar hittade" });
    }

    res.status(200).json({ notes: allNotes });
  } catch (err) {
    next(err);
  }
};

export default fetchNotesMiddleware;
