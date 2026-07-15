const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");

const payController = require("../controllers/payController");

router.post("/create-order", auth, payController.payOrder);
router.post("/verify", auth, payController.payOrder);

module.exports = router;
