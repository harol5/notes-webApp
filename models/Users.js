const pool = require("../config/postgres");
const format = require("pg-format");

const getUserByUsername = async (username) => {
  try {
    const sql = format("SELECT * FROM users WHERE username = %L", username);
    const result = await pool.query(sql);
    return result.rows[0];
  } catch (err) {
    console.log("login query error:", err);
  }
};

const getUserByEmail = async (email) => {
  try {
    const sql = format("SELECT * FROM users WHERE email = %L", email);
    const result = await pool.query(sql);
    return result.rows[0];
  } catch (err) {
    console.log(err);
  }
};

const getUserByRefreshToken = async (refreshToken) => {
  try {
    const sql = format(
      "SELECT * FROM users WHERE refresh_token = %L",
      refreshToken
    );
    const result = await pool.query(sql);
    return result.rows[0];
  } catch (err) {
    console.log(err);
  }
};

const insertNewUser = async ({
  name,
  email,
  username,
  password,
  date,
  active,
}) => {
  try {
    const sql = format(
      "INSERT INTO users(name,email,username,password,date_created,active) VALUES(%L,%L,%L,%L,%L,%L)",
      name,
      email,
      username,
      password,
      date,
      active
    );
    await pool.query(sql);
  } catch (err) {
    console.log(err);
  }
};

const updateUser = async (username, column, value) => {
  try {
    const sql = format(
      "UPDATE users SET %I = %L WHERE username = %L",
      column,
      value,
      username
    );
    await pool.query(sql);
  } catch (err) {
    throw new Error("invalid query");
  }
};

const deleteUser = async (username) => {
  try {
    const sql = format("DELETE FROM users WHERE username = %L", username);
    await pool.query(sql);
  } catch (err) {
    console.log(err);
  }
};

const insertVerificationToken = async (username, confirmToken) => {
  try {
    const sql = format(
      "INSERT INTO verificationtokens(username,token) VALUES(%L,%L)",
      username,
      confirmToken
    );
    await pool.query(sql);
  } catch (err) {
    console.log(err);
  }
};

const deleteVerificationToken = async (username) => {
  try {
    const sql = format(
      "DELETE FROM verificationtokens WHERE username = %L",
      username
    );
    await pool.query(sql);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getUserByUsername,
  getUserByEmail,
  getUserByRefreshToken,
  insertNewUser,
  updateUser,
  insertVerificationToken,
  deleteVerificationToken,
  deleteUser,
};
