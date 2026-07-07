const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const { auth } = require("../middleware/auth");

const designsController = require("../controllers/designsController");

router.get("/", designsController.getDesigns);
router.get("/all", designsController.getAllDesigns);
router.get("/:id", designsController.getDesign);
router.post("/", auth, upload.single("image"), designsController.addDesign);
router.delete("/:id", auth, designsController.deleteDesign);

module.exports = router;
