const { pool } = require("./db");
const express = require("express");
const usersRoutes = require("./routes/users");
const ordersRoutes = require("./routes/orders");
const designsRoutes = require("./routes/designs");
const addressRoutes = require("./routes/address");
const authRoutes = require("./routes/auth");
const favouriteRoutes = require("./routes/favourites");
const payRoutes = require("./routes/pay");
const app = express();
const port = 3000;

const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use("/users", usersRoutes);
app.use("/orders", ordersRoutes);
app.use("/designs", designsRoutes);
app.use("/address", addressRoutes);
app.use("/favourites", favouriteRoutes);
app.use("/login", authRoutes);
app.use("/pay", payRoutes);
app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
