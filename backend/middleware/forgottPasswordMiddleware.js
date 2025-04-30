import userModel from "../model/userModel.js";
import bcrypt from 'bcrypt'

const forgotPasswordMiddleware = async (req, res, next) => {
  try {
    const { email } = req.body;
    
    if(!email){
        return res.status(400).json([{message: "Email address är obligatorisk" }])
    }

    // Kontrollera om användaren finns i databasen
    const foundedUser = await userModel.findOne({ email }, { __v: 0 });
    if (!foundedUser) {
      return res.status(400).json([{ message: "Email address är inte registrerad" }]);
    }
    

    // Skapa ett nytt slumpmässigt lösenord
    const newPassword = '12345Password'
    
    // Hasha det nya lösenordet
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Uppdatera användarens lösenord i databasen
    foundedUser.password = hashedPassword;
    await foundedUser.save();
    


    res.status(200).json([{ message: `${foundedUser.email} password är :`, password: newPassword}]);
  } catch (err) {
    next(err);
  }
};

export default forgotPasswordMiddleware;
