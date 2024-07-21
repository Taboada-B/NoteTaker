const express = require('express');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();

// Helper function to read notes from the db
const readNotes = () => {
  const data = fs.readFileSync(path.join(__dirname, 'db', 'db.json'), 'utf8');
  return JSON.parse(data);
};

// Helper function to write notes to the db
const writeNotes = (notes) => {
  fs.writeFileSync(path.join(__dirname, 'db', 'db.json'), JSON.stringify(notes, null, 2));
};

// GET route for fetching notes
router.get('/notes', (req, res) => {
  const notes = readNotes();
  res.json(notes);
});

// POST route for saving a new note
router.post('/notes', (req, res) => {
  const notes = readNotes();
  const newNote = { ...req.body, id: uuidv4() };
  notes.push(newNote);
  writeNotes(notes);
  res.json(newNote);
});

// DELETE route for deleting a note
router.delete('/notes/:id', (req, res) => {
  let notes = readNotes();
  notes = notes.filter((note) => note.id !== req.params.id);
  writeNotes(notes);
  res.json({ success: true });
});

module.exports = router;
