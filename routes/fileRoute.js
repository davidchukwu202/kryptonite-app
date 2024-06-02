const express = require('express');
const multer = require('multer');
const authMiddleware = require('../middleware/authMiddleware');
const FileController = require('../controllers/fileController');
const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/upload', authMiddleware, upload.single('file'), FileController.uploadFile);
router.get('/files', FileController.getAllFiles);
router.get('/files/:id', FileController.getFileById);

module.exports = router;
