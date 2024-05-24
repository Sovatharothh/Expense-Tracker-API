// multerConfig.js

const multer = require('multer');
const path = require('path');

// Define storage for multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Uploads directory
    },
    filename: function (req, file, cb) {
        // Rename file with timestamp to avoid overwriting
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

// Function to validate file type
function fileFilter(req, file, cb) {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(file.mimetype)) {
        return cb(new Error('Only JPEG, JPG, PNG, or GIF files are allowed'));
    }
    cb(null, true);
}

// Initialize multer upload with storage options and file filter
const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});

module.exports = upload;
