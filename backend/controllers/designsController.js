const { pool } = require("../db");
const path = require("path");

exports.getDesigns = async (req, res) => {
  try {
    const result = await pool.query(`SELECT * FROM designs`);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Database error",
    });
  }
};

exports.getDesign = async (req, res) => {
  const id = Number(req.params.id);

  try {
    const result = await pool.query(`SELECT * FROM designs WHERE id = $1`, [
      id,
    ]);
    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "Design not found",
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

exports.addDesign = async (req, res) => {
  const { name, category, price, days } = req.body;
  const imgsrc = `/uploads/${req.file.filename}`;

  try {
    const result = await pool.query(
      `INSERT INTO designs (name, category, imgsrc, price, days)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *`,
      [name, category, imgsrc, price, days],
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Database error",
    });
  }
};
