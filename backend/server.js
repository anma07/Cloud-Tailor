const { DesignsArray } = require("./Designs");
const {AddressArray} = require("./Address");
const { OrdersArray } = require("./Orders");
const express = require('express');
const app = express();
const port = 3000;

const cors = require("cors");
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get("/health", (req, res) => {
  res.json({
    status: "ok"
  });
});

app.get("/designs", (req, res) => {
  res.json(DesignsArray);
})

app.get("/designs/:id", (req, res)=>{
  const id = Number(req.params.id);

  if(!DesignsArray[id]){
    return res.status(404).json({
      error: "Design not found"
    });
  }

  res.json(DesignsArray[id]);
})

app.get("/address", (req, res)=>{
  res.json(AddressArray);
})

app.get("/address/:id", (req,res)=>{
  const id = Number(req.params.id);

  if(!AddressArray[id]){
    return res.status(404).json({
      error: "Address not found"
    });
  }

  res.json(AddressArray[id]);
})

app.get("/orders", (req, res) =>{
  res.json(OrdersArray);
})

app.post("/orders", (req, res) =>{
  const order = req.body;
  const newOrder = {
    id: OrdersArray.length,
    ...order
  };

  OrdersArray.push(newOrder);

  res.status(201).json(newOrder);
  console.log("DOne");
})

app.get("/orders/:id", (req,res)=>{
  const id = Number(req.params.id);

  if(!OrdersArray[id]){
    return res.status(404).json({
      error: "Order not found"
    });
  }

  res.json(OrdersArray[id]);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});