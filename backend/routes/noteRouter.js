import express from "express";
import fetchNotesMiddleware from "../middleware/fetchNotesMiddleware.js";
import createNotesMiddleware from "../middleware/createNotesMiddleware.js";
import updateNoteMiddleware from "../middleware/updateNoteMiddleware.js";
import deleteNoteMiddleware from "../middleware/deleteNoteMiddleware.js";
import fetchOneNoteMiddleware from "../middleware/fetchOneNoteMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * /api/notes:
 *   get:
 *     summary: Hämta alla anteckningar för en användare
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: Användarens ID
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         required: false
 *         description: (Valfritt) Titel att söka efter
 *     responses:
 *       200:
 *         description: Lyckad hämtning av anteckningar
 */
router.get("/", fetchNotesMiddleware);

/**
 * @swagger
 * /api/notes:
 *   post:
 *     summary: Skapa en ny anteckning
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - beskrivning
 *               - userId
 *             properties:
 *               title:
 *                 type: string
 *               beskrivning:
 *                 type: string
 *               userId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Anteckning skapad
 */
router.post("/", createNotesMiddleware);

/**
 * @swagger
 * /api/notes/{noteId}:
 *   put:
 *     summary: Uppdatera en specifik anteckning
 *     parameters:
 *       - in: path
 *         name: noteId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID på anteckningen som ska uppdateras
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               beskrivning:
 *                 type: string
 *     responses:
 *       200:
 *         description: Anteckning uppdaterad
 *       404:
 *         description: Anteckning hittades inte
 */
router.put("/:noteId", updateNoteMiddleware);

/**
 * @swagger
 * /api/notes/{noteId}:
 *   delete:
 *     summary: Ta bort en specifik anteckning
 *     parameters:
 *       - in: path
 *         name: noteId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID på anteckningen som ska tas bort
 *     responses:
 *       200:
 *         description: Anteckning borttagen
 *       404:
 *         description: Anteckning hittades inte
 */
router.delete("/:noteId", deleteNoteMiddleware);

/**
 * @swagger
 * /api/notes/{noteId}:
 *   get:
 *     summary: Hämta en specifik anteckning
 *     parameters:
 *       - in: path
 *         name: noteId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID på anteckningen
 *     responses:
 *       200:
 *         description: Anteckning hämtad
 *       404:
 *         description: Anteckning hittades inte
 */
router.get("/:noteId", fetchOneNoteMiddleware);

export default router;
