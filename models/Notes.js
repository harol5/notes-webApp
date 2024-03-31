const pool = require("../config/postgres");

const getAllNotesByUserId = async (userId) => {
  try {
    const result = await pool.query("SELECT * FROM notes WHERE user_id = $1", [
      userId,
    ]);
    return result.rows;
  } catch (err) {
    console.log(err);
  }
};

const createNote = async ({
  title,
  category,
  content,
  dateCreated,
  status,
  userId,
}) => {
  await pool.query(
    "INSERT INTO notes(title,category,date_created,content,user_id,status) VALUES($1,$2,$3,$4,$5,$6)",
    [title, category, dateCreated, content, userId, status]
  );
};

const getNoteById = async (userId, noteId) => {
  const result = await pool.query(
    "SELECT * FROM notes WHERE user_id = $1 AND id = $2",
    [userId, noteId]
  );
  return result.rows;
};

const updateNoteById = async ({
  title,
  category,
  content,
  date_updated,
  userId,
  noteId,
  status,
}) => {
  const result = await pool.query(
    `UPDATE notes SET title = $1, category = $2, date_updated = $3, content = $4, status = $5 WHERE user_id = $6 and id = $7`,
    [title, category, date_updated, content, status, userId, noteId]
  );
  return result;
};

const deleteNoteById = async (userId, noteId) => {
  const result = await pool.query(
    "DELETE FROM notes WHERE user_id = $1 AND id = $2",
    [userId, noteId]
  );
  return result;
};

const filterNotesBy = async (userId, column, value) => {
  try {
    const result = await pool.query(
      `SELECT * FROM notes WHERE $1 = $2 and user_id = $3`,
      [column, value, userId]
    );
    return result.rows;
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getAllNotesByUserId,
  createNote,
  getNoteById,
  updateNoteById,
  deleteNoteById,
  filterNotesBy,
};
