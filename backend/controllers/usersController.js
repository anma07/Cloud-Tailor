const { pool } = require("../db");
const bcrypt = require("bcrypt");

exports.getUsers = async (req, res) => {
  if (req.user.role !== "tailor") {
    return res.status(403).json({
      error: "Forbidden",
    });
  }

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

  if (req.user.role === "customer" && req.user.id !== id) {
    return res.status(403).json({
      error: "Forbidden",
    });
  }

  try {
    const result = await pool.query(
      `SELECT * FROM users 
      WHERE id = $1`,
      [id],
    );
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
  const role = "customer";

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `INSERT INTO users (username, email, password, phone, role)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *`,
      [username, email, hashedPassword, phone, role],
    );
    const user = result.rows[0];

    res.status(201).json({
      id: user.id,
      username: user.username,
      email: user.email,
      phone: user.phone,
      role: user.role,
    });
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

  console.log("JWT user:", req.user);
  console.log("Requested user id:", id);

  if (req.user.role === "customer" && req.user.id !== id) {
    return res.status(403).json({
      error: "Forbidden",
    });
  }

  try {
    const result = await pool.query(
      `SELECT * FROM addresses 
      WHERE user_id = $1`,
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

  if (req.user.role === "customer" && req.user.id !== id) {
    return res.status(403).json({
      error: "Forbidden",
    });
  }

  try {
    const result = await pool.query(
      `SELECT * FROM orders 
      WHERE user_id = $1`,
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
