const pool = require("../config/postgres");

const getAllNotesByUserId = async (userId) => {
  try {
    const result = await pool.query(
      `SELECT * FROM notes WHERE user_id = ${userId}`
    );
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
  userId,
}) => {
  await pool.query(
    `INSERT INTO notes(title,category,date_created,content,user_id) VALUES('${title}','${category}','${dateCreated}','${content}',${userId})`
  );
};

const getNoteById = async (userId, noteId) => {
  const result = await pool.query(
    `SELECT * FROM notes WHERE user_id = ${userId} AND id = ${noteId}`
  );
  return result.rows;
};

const updateNoteById = async ({
  title,
  category,
  content,
  dateUpdated,
  userId,
  noteId,
}) => {
  const result = await pool.query(
    `UPDATE notes SET title = '${title}', category = '${category}', date_updated = '${dateUpdated}', content = '${content}' WHERE user_id = ${userId} and id = ${noteId}`
  );
  return result;
};

const deleteNoteById = async (userId, noteId) => {
  const result = await pool.query(
    `DELETE FROM notes WHERE user_id = ${userId} AND id = ${noteId}`
  );
  return result;
};

const filterNotesBy = async (userId, column, value) => {
  try {
    const result = await pool.query(
      `SELECT * FROM notes WHERE ${column} = '${value}' and user_id = '${userId}';`
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
