const { pool } = require("../db");
const path = require("path");

exports.getDesigns = async (req, res) => {
  const { category, sort, search } = req.query;

  try {
    let result;
    if (category) {
      result = await pool.query(
        `SELECT * FROM designs 
        WHERE category = $1`,
        [category],
      );
    } else if (sort) {
      if (sort === "price_asc") {
        result = await pool.query(
          `SELECT * FROM designs 
          ORDER BY price ASC`,
        );
      } else if (sort === "price_desc") {
        result = await pool.query(
          `SELECT * FROM designs 
          ORDER BY price DESC`,
        );
      } else if (sort === "range_500") {
        result = await pool.query(
          `SELECT * FROM designs 
          WHERE price <= 500`,
        );
      } else if (sort === "range_500-1000") {
        result = await pool.query(
          `SELECT * FROM designs 
          WHERE price >= 500 
          AND price <= 1000`,
        );
      } else if (sort === "range_1000") {
        result = await pool.query(
          `SELECT * FROM designs 
          WHERE price >= 1000`,
        );
      }
    } else if (search) {
      result = await pool.query(
        `SELECT * FROM designs
        WHERE name ILIKE $1`,
        [`%${search}%`],
      );
    } else {
      result = await pool.query(`SELECT * FROM designs`);
    }
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
    const result = await pool.query(
      `
      SELECT * FROM designs 
      WHERE id = $1`,
      [id],
    );
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
  if (req.user.role !== "tailor") {
    return res.status(403).json({
      error: "Forbidden",
    });
  }

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
