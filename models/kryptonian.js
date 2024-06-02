const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const KryptonianSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  apiKey: { type: String, unique: true },
  files: [{ type: mongoose.Schema.Types.ObjectId, ref: 'File' }],
});

KryptonianSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

module.exports = mongoose.model('Kryptonian', KryptonianSchema);
