const express = require("express");
const router = express.Router();

const addressController = require("../controllers/addressController");

router.get("/", addressController.getAddresses);
router.post("/", addressController.addAddress);
router.post("/:id", addressController.getAddress);

module.exports = router;
