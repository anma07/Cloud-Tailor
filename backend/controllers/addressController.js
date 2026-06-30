const { pool } = require("../db");

exports.getAddresses = async (req, res) => {
  try {
    const result = await pool.query(`SELECT * FROM addresses`);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Database error",
    });
  }
};

exports.addAddress = async (req, res) => {
  const { userId, label, value, pincode } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO addresses (user_id, label, value, pincode)
      VALUES ($1, $2, $3, $4)
      RETURNING *`,
      [userId, label, value, pincode],
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    if (err.code === "23503") {
      return res.status(400).json({
        error: "Invalid user",
      });
    }
    console.error(err);
    res.status(500).json({
      error: "Datbase error",
    });
  }
};

exports.getAddress = async (req, res) => {
  const id = Number(req.params.id);

  try {
    const result = await pool.query(`SELECT * FROM addresses WHERE id = $1`, [
      id,
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "Address not found",
      });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Database error",
    });
  }
};
