const express = require("express");
const router = express.Router();

const usersController = require("../controllers/usersController");

router.get("/", usersController.getUsers);
router.post("/", usersController.addUser);
router.get("/:id", usersController.getUser);
router.get("/:id/address", usersController.getUserAddresses);
router.get("/:id/orders", usersController.getUserOrders);

module.exports = router;
