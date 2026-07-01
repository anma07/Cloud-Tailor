const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");

const designsController = require("../controllers/designsController");

router.get("/", designsController.getDesigns);
router.get("/:id", designsController.getDesign);
router.post("/", upload.single("image"), designsController.addDesign);

module.exports = router;
