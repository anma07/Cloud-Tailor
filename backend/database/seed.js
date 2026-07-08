const bcrypt = require("bcrypt");
const { pool } = require("../db");

async function addUsers() {
  const password1 = await bcrypt.hash("tailor123", 10);
  const password2 = await bcrypt.hash("aster123", 10);
  const password3 = await bcrypt.hash("leo123", 10);

  try {
    const result = await pool.query(
      `INSERT INTO users(username, email, password, phone, role)
            VALUES
            ($1, $2, $3, $4, $5),
            ($6, $7, $8, $9, $10),
            ($11, $12, $13, $14, $15)
            RETURNING *`,
      [
        "Tailor",
        "tailor@gmail.com",
        password1,
        "4577532575",
        "tailor",

        "Aster",
        "aster@gmail.com",
        password2,
        "6785324576",
        "customer",

        "Leo",
        "leo@gmail.com",
        password3,
        "8645234290",
        "customer",
      ],
    );
  } catch (err) {
    console.error(err);
  } finally {
    await pool.end();
  }
}

addUsers();
