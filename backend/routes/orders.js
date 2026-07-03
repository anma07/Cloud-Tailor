const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");

const ordersController = require("../controllers/ordersController");

router.get("/", auth, ordersController.getOrders);
router.post("/", auth, ordersController.addOrder);
router.get("/:id", auth, ordersController.getOrder);
router.patch("/:id", auth, ordersController.changeStatus);

module.exports = router;
