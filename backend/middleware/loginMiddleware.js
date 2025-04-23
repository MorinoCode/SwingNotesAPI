import validatAndSanitize from "../validator/userValidator.js";
import userModel from "../model/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const loginMiddleware = async (req, res, next) => {
  try {
    // hämta user från req.body
    const { email, password } = req.body;

    // kontrollera om user giltig
    const validationErrors = await validatAndSanitize({ email, password });

    if (validationErrors !== true) {
      return res.status(400).json({  validationErrors });
    }

    // kontrollera om user finns i DB
    const isUserExist = await userModel.findOne({ email });
    const userId = isUserExist._id.toString()

    if (!isUserExist) {
      return res.status(404).json({ validationErrors : [{message: "Användaren finns inte!"}] });
    }

    // Jämför password
    const isPasswordValid = await bcrypt.compare(
      password,
      isUserExist.password
    );
    if (!isPasswordValid) {
      return res.status(401).json({ validationErrors : [{message: "Password stämmer inte!"}] });
    }
    //skapa en token
    const token = jwt.sign(
      { email: isUserExist.email,
        id: isUserExist._id,
       },
      process.env.SECRET_KEY,
      {
        expiresIn: "50m",
      }
    );

    res.status(200).json({ email, password, userId, token });
  } catch (err) {
    //skicka error vidare till errhandling middleware
    next(err);
  }
};

export default loginMiddleware;
