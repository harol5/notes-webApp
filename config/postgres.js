const { Pool } = require("pg");

// const pool = new Pool({
//   host: process.env.POSTGRES_HT,
//   user: process.env.POSTGRES_USER,
//   password: process.env.POSTGRES_PWD,
//   database: process.env.POSTGRES_DB,
//   port: process.env.POSTGRES_PORT,
//   ssl: {
//     rejectUnauthorized: false,
//   },
// });
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = pool;
