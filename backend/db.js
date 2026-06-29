const pkg = require("pg");

const { Pool } = pkg;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "cloud_tailor",
  password: "cloudtailor123",
  port: 5432,
});

module.exports = {
  pool,
};
