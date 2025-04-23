import validatAndSanitize from "../validator/userValidator.js";
import userModel from "../model/userModel.js";
import bcrypt from "bcrypt";

const signupMiddleware = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validera input
    const validationErrors = await validatAndSanitize({ email, password });

    if (validationErrors !== true) {
      return res.status(400).json({  validationErrors });
    }

    // Kontrollera om användaren redan finns
    const isUserExist = await userModel.findOne({ email });

    if (isUserExist) {
      return res.status(409 ).json({ validationErrors : [{message: "Användaren är redan registrerad."}] });
    }

    // Hasha lösenordet
    const hashedPassword = await bcrypt.hash(password, 10);

    // Skapa användare
    const newUser = await userModel.create({ email, password: hashedPassword });

    res.status(201).json({ message: "Användaren skapades!", newUser });
  } catch (err) {
    next(err);
  }
};

export default signupMiddleware;
