const express = require("express");
const router = express.Router();
const notesController = require("../controllers/notesController");
const verifyJWT = require("../middleware/verifyJWT");

router.use(verifyJWT);
router.get("/", notesController.getAllNotesByUserIdHandler);
router.post("/", notesController.createNoteHandler);
router
  .route("/:id")
  .get(notesController.getNoteByIdHandler)
  .put(notesController.editNoteHandler)
  .delete(notesController.deleteNoteById);

module.exports = router;
