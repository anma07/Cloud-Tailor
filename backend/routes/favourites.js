const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");

const favouritesController = require("../controllers/favouritesController");

router.get("/", auth, favouritesController.getFavourites);
router.post("/", auth, favouritesController.addFavourite);
router.get("/all", favouritesController.getAllFaves);

module.exports = router;
