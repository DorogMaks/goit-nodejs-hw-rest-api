const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(__dirname, '../../tmp'));
  },
  filename: (req, file, cb) => {
    const [, extension] = file.originalname.split('.');
    const fileName = uuidv4();
    cb(null, `${fileName}.${extension}`);
  },
});

const upload = multer({
  storage,
});

module.exports = upload;
