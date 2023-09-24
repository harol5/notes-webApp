const pool = require("../config/postgres");

const getUserByUsername = async (username) => {
  try {
    const result = await pool.query(
      `SELECT * FROM users WHERE username = '${username}'`
    );
    return result.rows[0];
  } catch (err) {
    console.log(err);
  }
};

const getUserByRefreshToken = async (refreshToken) => {
  try {
    const result = await pool.query(
      `SELECT * FROM users WHERE refresh_token = '${refreshToken}'`
    );
    return result.rows[0];
  } catch (err) {
    console.log(err);
  }
};

const insertNewUser = async ({ name, email, username, password, date }) => {
  try {
    await pool.query(
      `INSERT INTO users(name,email,username,password,date_created) VALUES('${name}','${email}','${username}','${password}','${date}')`
    );
  } catch (err) {
    console.log(err);
  }
};

const updateUser = async (column, value, username) => {
  try {
    await pool.query(
      `UPDATE users SET ${column} = '${value}' WHERE username = '${username}'`
    );
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getUserByUsername,
  getUserByRefreshToken,
  insertNewUser,
  updateUser,
};
