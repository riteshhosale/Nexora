const multer = require("multer");

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    console.log("File:", file.originalname);
    console.log("Mimetype:", file.mimetype);

    cb(null, true); // Accept all files temporarily
};

const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
    fileFilter,
});

module.exports = upload;