const { DesignsArray } = require("./Designs");
const { AddressArray } = require("./Address");
const { OrdersArray } = require("./Orders");
const { UsersArray } = require("./Users");
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

app.get("/designs", (req, res) => {
  res.json(DesignsArray);
});

app.get("/designs/:id", (req, res) => {
  const id = Number(req.params.id);

  if (!DesignsArray[id]) {
    return res.status(404).json({
      error: "Design not found",
    });
  }

  res.json(DesignsArray[id]);
});

app.get("/address", (req, res) => {
  res.json(AddressArray);
});

app.get("/address/:id", (req, res) => {
  const id = Number(req.params.id);

  if (!AddressArray[id]) {
    return res.status(404).json({
      error: "Address not found",
    });
  }

  res.json(AddressArray[id]);
});

app.post("/address", (req, res) => {
  const address = req.body;
  const newAddress = {
    id: AddressArray.length,
    ...address,
  };

  AddressArray.push(newAddress);

  res.status(201).json(newAddress);
});

app.get("/orders", (req, res) => {
  res.json(OrdersArray);
});

app.post("/orders", (req, res) => {
  const order = req.body;
  const newOrder = {
    id: OrdersArray.length,
    userId: CURRENT_USER_ID,
    ...order,
  };

  OrdersArray.push(newOrder);

  res.status(201).json(newOrder);
});

app.get("/orders/:id", (req, res) => {
  const id = Number(req.params.id);

  if (!OrdersArray[id]) {
    return res.status(404).json({
      error: "Order not found",
    });
  }

  res.json(OrdersArray[id]);
});

app.patch("/orders/:id", (req, res) => {
  const id = Number(req.params.id);

  if (!OrdersArray[id]) {
    return res.status(404).json({
      error: "Order not found",
    });
  }
  const order = OrdersArray[id];

  order.status = req.body.status;
  res.json(order);
});

app.get("/users", (req, res) => {
  res.json(UsersArray);
});

app.get("/users/:id", (req, res) => {
  const id = Number(req.params.id);

  if (!UsersArray[id]) {
    return res.status(404).json({
      error: "User not found",
    });
  }
  res.json(UsersArray[id]);
});

app.post("/users", (req, res) => {
  const user = req.body;

  newUser = {
    id: UsersArray.length,
    ...user,
  };
  UsersArray.push(newUser);
  res.status(201).json(newUser);
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const user = UsersArray.find((user) => user.email === email);

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
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
