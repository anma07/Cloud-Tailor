const { pool } = require("../db");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
require("dotenv").config();

exports.basicLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query(
      `
      SELECT * FROM users 
      WHERE email = $1`,
      [email],
    );

    const user = result.rows[0];

    if (!user) {
      return res.status(401).json({
        error: "User Not Found",
      });
    }

    const correctPass = await bcrypt.compare(password, user.password);

    if (!correctPass) {
      return res.status(401).json({
        error: "Incorrect Password",
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      },
    );

    res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Database error",
    });
  }
};
