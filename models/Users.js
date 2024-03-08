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

const getUserByEmail = async (email) => {
  try {
    const result = await pool.query(
      `SELECT * FROM users WHERE email = '${email}'`
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

const insertNewUser = async ({
  name,
  email,
  username,
  password,
  date,
  active,
}) => {
  try {
    await pool.query(
      `INSERT INTO users(name,email,username,password,date_created,active) VALUES('${name}','${email}','${username}','${password}','${date}',${active})`
    );
  } catch (err) {
    console.log(err);
  }
};

const updateUser = async (username, column, value) => {
  try {
    await pool.query(
      `UPDATE users SET ${column} = '${value}' WHERE username = '${username}'`
    );
  } catch (err) {
    throw new Error("invalid query");
  }
};

const deleteUser = async (username) => {
  try {
    await pool.query(`DELETE FROM users WHERE username = '${username}'`);
  } catch (err) {
    console.log(err);
  }
};

const insertVerificationToken = async (username, confirmToken) => {
  try {
    await pool.query(
      `INSERT INTO verificationtokens(username,token) VALUES('${username}','${confirmToken}')`
    );
  } catch (err) {
    console.log(err);
  }
};

const deleteVerificationToken = async (username) => {
  try {
    await pool.query(
      `DELETE FROM verificationtokens WHERE username = '${username}'`
    );
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
