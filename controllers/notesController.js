const Notes = require("../models/Notes");

const getAllNotesByUserIdHandler = async (req, res) => {
  const userId = parseInt(req.userId);
  const queryStr = req.query;
  let notes;

  if (Object.values(queryStr).length > 0) {
    const [column, value] = Object.entries(queryStr)[0];
    notes = await Notes.filterNotesBy(userId, column, value);
  } else notes = await Notes.getAllNotesByUserId(userId);

  if (notes.length === 0) return res.sendStatus(404);
  else res.status(200).json(notes);
};

const createNoteHandler = async (req, res) => {
  const newNote = { ...req.body, userId: req.userId };
  try {
    await Notes.createNote(newNote);
    return res.status(201).json(newNote);
  } catch (err) {
    return res.status(500).json({ message: err.toString() });
  }
};

const getNoteByIdHandler = async (req, res) => {
  const userId = parseInt(req.userId);
  const noteId = parseInt(req.params.id);
  try {
    const note = await Notes.getNoteById(userId, noteId);
    if (note.length === 0) return res.sendStatus(404);
    return res.status(200).json(note);
  } catch (err) {
    return res.status(500).json({ message: err.toString() });
  }
};

const editNoteHandler = async (req, res) => {
  const userId = parseInt(req.userId);
  const noteId = parseInt(req.params.id);
  const updatedNote = { ...req.body, userId, noteId };
  try {
    const { rowCount } = await Notes.updateNoteById(updatedNote);
    if (rowCount === 0) return res.sendStatus(404);
    return res.sendStatus(204);
  } catch (err) {
    return res.status(500).json({ message: err.toString() });
  }
};

const deleteNoteById = async (req, res) => {
  const userId = parseInt(req.userId);
  const noteId = parseInt(req.params.id);
  try {
    const { rowCount } = await Notes.deleteNoteById(userId, noteId);
    if (rowCount === 0) return res.sendStatus(404);
    return res.sendStatus(204);
  } catch (err) {
    return res.status(500).json({ message: err.toString() });
  }
};

module.exports = {
  getAllNotesByUserIdHandler,
  createNoteHandler,
  getNoteByIdHandler,
  editNoteHandler,
  deleteNoteById,
};
