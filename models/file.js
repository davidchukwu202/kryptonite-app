const mongoose = require('mongoose');

const FileSchema = new mongoose.Schema({
  data: { type: String, required: true }, // Base64 string
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'Kryptonian' },
});

module.exports = mongoose.model('File', FileSchema);
