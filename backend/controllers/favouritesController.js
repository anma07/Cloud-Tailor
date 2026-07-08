const { pool } = require("../db");

exports.getFavourites = async (req, res) => {
  const userId = req.user.id;
  try {
    const result = await pool.query(
      `SELECT d.* 
      FROM favourites f
      JOIN designs d
      ON f.design_id = d.id
      WHERE f.user_id = $1 
      AND d.is_active = TRUE`,
      [userId],
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Database error",
    });
  }
};

exports.addFavourite = async (req, res) => {
  const userId = req.user.id;
  const { designId } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO favourites (user_id, design_id)
      VALUES ($1, $2)
      RETURNING *`,
      [userId, designId],
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
      error: "Database error",
    });
  }
};

exports.getAllFaves = async (req, res) => {
  try {
    const result = await pool.query(`SELECT * FROM favourites`);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({
      error: "Database error",
    });
  }
};

exports.deleteFavourite = async (req, res) => {
  const designId = Number(req.params.id);
  const userId = req.user.id;

  try {
    const result = await pool.query(
      `DELETE FROM favourites
      WHERE user_id = $1
      AND design_id = $2`,
      [userId, designId],
    );

    res.status(200).json({ message: "Removed" });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Database error",
    });
  }
};
