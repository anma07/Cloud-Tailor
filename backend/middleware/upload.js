const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, next) => {
    const filename = req.body.name.toLowerCase().replace(/\s+/g, "-");
    const extension = path.extname(file.originalname);

    next(null, filename + extension);
  },
});

const upload = multer({ storage });

module.exports = upload;
