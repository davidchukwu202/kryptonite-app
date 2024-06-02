const FileService = require('../services/fileService');

class FileController {
  static async uploadFile(req, res) {
    try {
      const { id } = req.user;
      const file = req.file;
      const newFile = await FileService.uploadFile(id, file);
      res.status(201).json({ message: 'File uploaded successfully.', file: newFile });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getAllFiles(req, res) {
    try {
      const files = await FileService.getAllFiles();
      res.status(200).json(files);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getFileById(req, res) {
    try {
      const { id } = req.params;
      const file = await FileService.getFileById(id);
      res.status(200).json(file);
    } catch (error) {
      res.status(400).json({error: error.message });
    }
    }
    }
    
    module.exports = FileController;
