const { pool } = require("../db");

exports.basicLogin = async (req, res) => {
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
};
