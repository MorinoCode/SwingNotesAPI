import jwt from "jsonwebtoken";

const isUserLoginMiddleware = (req, res, next) => {
  try {
    // Hämta token från headers
    const authHeader = req.headers.authorization;

    // Kontrollera om header finns och börjar med "Bearer "
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Ingen giltig token angiven" });
    }

    // Hämta token och ta bort "Bearer "
    const token = req.headers.authorization.split(" ")[1];

    // Kontrollera om token existerar
    if (!token) {
      return res.status(401).json({ message: "Token saknas" });
    }

    // Verifiera token
    const isTokenValid = jwt.verify(token, process.env.SECRET_KEY);

    if (!isTokenValid) {
      return res.status(403).send({ message: "Token är inte giltig" });
    }

    req.user = isTokenValid;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Ogiltig eller utgången token" });
  }
};

export default isUserLoginMiddleware;
