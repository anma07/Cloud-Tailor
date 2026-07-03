const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");

const addressController = require("../controllers/addressController");

router.get("/", auth, addressController.getAddresses);
router.post("/", auth, addressController.addAddress);
router.get("/:id", auth, addressController.getAddress);

module.exports = router;
