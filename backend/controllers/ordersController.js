const { pool } = require("../db");

exports.getOrders = async (req, res) => {
  if (req.user.role !== "tailor") {
    return res.status(403).json({
      error: "Forbidden",
    });
  }

  try {
    const result = await pool.query(`SELECT * FROM orders`);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Database error",
    });
  }
};

exports.getOrder = async (req, res) => {
  const id = Number(req.params.id);

  try {
    const result = await pool.query(
      `SELECT * FROM orders 
      WHERE id = $1`,
      [id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "Order not found",
      });
    }

    const order = result.rows[0];

    if (req.user.role === "customer" && req.user.id !== order.user_id) {
      return res.status(403).json({
        error: "Forbidden",
      });
    }
    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Database error",
    });
  }
};

exports.addOrder = async (req, res) => {
  if (req.user.role !== "customer") {
    return res.status(403).json({
      error: "Forbidden",
    });
  }

  const userId = req.user.id;
  const status = "REQUESTED";

  const { designId, size, clothSize, addressId, paymentMode, total } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO orders (user_id, design_id, size, cloth_size, address_id, payment_mode, total, status)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *`,
      [
        userId,
        designId,
        size,
        clothSize,
        addressId,
        paymentMode,
        total,
        status,
      ],
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    if (err.code === "23503") {
      return res.status(400).json({
        error: "Invalid user, design, or address.",
      });
    }
    console.error(err);
    res.status(500).json({
      error: "Database error",
    });
  }
};

exports.changeStatus = async (req, res) => {
  if (req.user.role !== "tailor") {
    return res.status(403).json({
      error: "Forbidden",
    });
  }

  const id = Number(req.params.id);
  const { status } = req.body;

  try {
    const result = await pool.query(
      `UPDATE orders
      SET status = $1
      WHERE id = $2
      RETURNING *`,
      [status, id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "Order not found",
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
