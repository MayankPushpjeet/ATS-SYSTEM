// multerConfig.js
const multer = require('multer')

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/') // directory where files will be stored
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // naming files with a timestamp
  }
});

const fileFilter = (req, file, cb) => {
  // Check file type
  if (file.mimetype === 'application/pdf') {
    cb(null, true); // Accept file
  } else {
    cb(new Error('Only PDF files are allowed'), false); // Reject file
  }
};

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter
});

module.exports = {upload};
