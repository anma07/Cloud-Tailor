const { pool } = require("./db");
const express = require("express");
const app = express();
const port = 3000;

const CURRENT_USER_ID = 0;

const cors = require("cors");
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
  });
});

app.get("/designs", async (req, res) => {
  try {
    const result = await pool.query(`SELECT * FROM designs`);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Database error",
    });
  }
});

app.get("/designs/:id", async (req, res) => {
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
});

app.get("/address", async (req, res) => {
  try {
    const result = await pool.query(`SELECT * FROM addresses`);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Database error",
    });
  }
});

app.get("/address/:id", async (req, res) => {
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
});

app.get("/:id/address", async (req, res) => {
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
});

app.post("/address", async (req, res) => {
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
    console.error(err);
    res.status(500).json({
      error: "Datbase error",
    });
  }
});

app.get("/orders", async (req, res) => {
  try {
    const result = await pool.query(`SELECT * FROM orders`);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Database error",
    });
  }
});

app.post("/orders", async (req, res) => {
  const {
    userId,
    designId,
    size,
    clothSize,
    addressId,
    paymentMode,
    total,
    status,
  } = req.body;

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
    console.error(err);
    res.status(500).json({
      error: "Database error",
    });
  }
});

app.get("/orders/:id", async (req, res) => {
  const id = Number(req.params.id);

  try {
    const result = await pool.query(`SELECT * FROM orders WHERE id = $1`, [id]);

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
});

app.patch("/orders/:id", async (req, res) => {
  const id = Number(req.params.id);
  const { status } = req.body;

  try {
    const result = await pool.query(
      `UPDATE orders
      SET status = $1
      WHERE id = $2`,
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
});

app.get("/users", async (req, res) => {
  try {
    const result = await pool.query(`SELECT * FROM users`);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Database error",
    });
  }
});

app.get("/users/:id", async (req, res) => {
  const id = Number(req.params.id);

  try {
    const result = await pool.query(`SELECT * FROM users WHERE id = $1`, [id]);
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Database error",
    });
  }

  if (result.rows.length === 0) {
    return res.status(404).json({
      error: "User not found",
    });
  }
});

app.post("/users", async (req, res) => {
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
    console.error(err);
    res.status(500).json({
      error: "Database error",
    });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [
      email,
    ]);

    const user = result.rows[0];

    if (!user) {
      res.status(401).json({
        error: "User Not Found",
      });
    }

    if (user.password !== password) {
      res.status(401).json({
        error: "Incorrect Password",
      });
    }

    res.json({
      id: user.id,
      username: user.username,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Database error",
    });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
