const fs = require('fs');
const File = require('../models/file');
const Kryptonian = require('../models/kryptonian');

class FileService {
  static async uploadFile(kryptonianId, file) {
    const base64Data = fs.readFileSync(file.path, 'base64');
    const newFile = new File({ data: base64Data, owner: kryptonianId });
    await newFile.save();

    // Associate file with Kryptonian
    await Kryptonian.findByIdAndUpdate(kryptonianId, { $push: { files: newFile._id } });

    // Remove file from system after encoding
    fs.unlinkSync(file.path);

    return newFile;
  }

  static async getAllFiles() {
    return await File.find().populate('owner', 'email');
  }

  static async getFileById(id) {
    return await File.findById(id).populate('owner', 'email');
  }
}

module.exports = FileService;
