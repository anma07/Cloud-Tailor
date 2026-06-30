const { pool } = require("../db");

exports.getUsers = async (req, res) => {
  try {
    const result = await pool.query(`SELECT * FROM users`);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Database error",
    });
  }
};

exports.getUser = async (req, res) => {
  const id = Number(req.params.id);

  try {
    const result = await pool.query(`SELECT * FROM users WHERE id = $1`, [id]);
    res.json(result.rows[0]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "User not found",
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Database error",
    });
  }
};

exports.addUser = async (req, res) => {
  const { username, email, password, phone } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO users (username, email, password, phone)
      VALUES ($1, $2, $3, $4)
      RETURNING *`,
      [username, email, password, phone],
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    if (err.code === "23505") {
      return res.status(409).json({
        error: "Email already exists",
      });
    }
    console.error(err);
    res.status(500).json({
      error: "Database error",
    });
  }
};

exports.getUserAddresses = async (req, res) => {
  const id = Number(req.params.id);

  try {
    const result = await pool.query(
      `SELECT * FROM addresses WHERE user_id = $1`,
      [id],
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Database error",
    });
  }
};

exports.getUserOrders = async (req, res) => {
  const id = Number(req.params.id);

  try {
    const result = await pool.query(`SELECT * FROM orders WHERE user_id = $1`, [
      id,
    ]);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Database error",
    });
  }
};
