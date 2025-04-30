import express from "express";
import signupMiddleware from "../middleware/signupMiddleware.js";
import loginMiddleware from "../middleware/loginMiddleware.js";
import forgotPasswordMiddleware from "../middleware/forgottPasswordMiddleware.js";

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
 *               - password
 *             properties:
 *               namn:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
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
 *     summary: Logga in med e-post och password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Inloggning lyckades
 *       401:
 *         description: Ogiltiga uppgifter
 */
router.post("/login", loginMiddleware);

/**
 * @swagger
 * /api/user/forgotPassword:
 *   post:
 *     summary: Begär återställning av lösenord
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *     responses:
 *       200:
 *         description: Ett e-postmeddelande med instruktioner har skickats
 *       404:
 *         description: Användaren hittades inte
 *       500:
 *         description: Serverfel
 */

router.post("/forgotPassword", forgotPasswordMiddleware);

export default router;
