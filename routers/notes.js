const express = require('express');
const router = express.Router();
const db = require('./../database/database');

router.use(express.json());

router.use((req, res, next) => {
    console.log('Time: ', Date.now());
    next();
});

router.get("/", async (req, res) => {
    const notes = await db.getNotes();
    res.send(notes);
});
  
router.get("/:id", async (req, res) => {
    const id = req.params.id;
    const note = await db.getNote(id);
    res.send(note);
});
  
router.post("/", async (req, res) => {
    const { title, contents } = req.body;
    const note = await db.createNote(title, contents);
    res.status(201).send(note);
});

module.exports = router;
  