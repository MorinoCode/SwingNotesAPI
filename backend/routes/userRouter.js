import express from "express";
import signupMiddleware from "../middleware/signupMiddleware.js";
import loginMiddleware from "../middleware/loginMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * /api/user/signup:
 *   post:
 *     summary: Skapa ett nytt konto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - namn
 *               - email
 *               - lösenord
 *             properties:
 *               namn:
 *                 type: string
 *               email:
 *                 type: string
 *               lösenord:
 *                 type: string
 *     responses:
 *       201:
 *         description: Konto skapades
 *       400:
 *         description: Ogiltiga indata
 */
router.post("/signup", signupMiddleware);

/**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: Logga in med e-post och lösenord
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - lösenord
 *             properties:
 *               email:
 *                 type: string
 *               lösenord:
 *                 type: string
 *     responses:
 *       200:
 *         description: Inloggning lyckades
 *       401:
 *         description: Ogiltiga uppgifter
 */
router.post("/login", loginMiddleware);

export default router;
