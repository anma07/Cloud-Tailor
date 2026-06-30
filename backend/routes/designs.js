const express = require("express");
const router = express.Router();

const designsController = require("../controllers/designsController");

router.get("/", designsController.getDesigns);
router.get("/:id", designsController.getDesign);

module.exports = router;
