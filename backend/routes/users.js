const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");

const usersController = require("../controllers/usersController");

router.get("/", auth, usersController.getUsers);
router.post("/", usersController.addUser);
router.get("/:id", auth, usersController.getUser);
router.get("/:id/address", auth, usersController.getUserAddresses);
router.get("/:id/orders", auth, usersController.getUserOrders);

module.exports = router;
