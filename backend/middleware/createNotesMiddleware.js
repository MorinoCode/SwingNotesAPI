import noteModel from "../model/noteModel.js";
import noteValidator from "../validator/noteValidator.js";

const createNotesMiddleware = async (req, res, next) => {
  try {
    // hämta note från req.body
    const { title, beskrivning, userId } = req.body;
    

    //kontrollera om title och beskrivning fyller krav
    const isNoteValid = await noteValidator({ title, beskrivning });

    if (isNoteValid !== true) {
      return res.status(400).send({ message: isNoteValid });
    }

     // 2. Kontrollera om samma title redan finns för den här användaren
     const isTitleExist = await noteModel.findOne({ title, userId });

    if (isTitleExist) {
      return res.status(400).send({ message: "denna title finns redan in DB" });
    }

    // 3. Skapa en ny note med tidsstämplar
    const timestamp = new Date();

    const newNote = await noteModel.create({
      title,
      beskrivning,
      userId,
      createdAt: timestamp,
      modifiedAt: timestamp,
    });

    res.status(201).json({ message: "Ny anteckning skapade", newNote });
  } catch (err) {
    next(err);
  }
};

export default createNotesMiddleware;
