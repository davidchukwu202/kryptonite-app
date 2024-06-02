const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const transporter = require('../config/emailConfig');
const redisClient = require('../config/redisConfig');
const Kryptonian = require('../models/kryptonian');

class AuthService {
  static async register(email, password) {
    const kryptonian = new Kryptonian({ email, password });
    await kryptonian.save();
    // Send confirmation email logic here
    return kryptonian;
  }

  static async login(email, password) {
    const kryptonian = await Kryptonian.findOne({ email });
    if (!kryptonian || !await bcrypt.compare(password, kryptonian.password)) {
      throw new Error('Invalid credentials');
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    await redisClient.setex(email, 300, otp); // Store OTP for 5 minutes

    await transporter.sendMail({
      from: 'no-reply@kryptonite.com',
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP code is ${otp}`
    });

    return { message: 'OTP sent to email' };
  }

  static async verifyOTP(email, otp) {
    const storedOtp = await redisClient.get(email);
    if (otp !== storedOtp) {
      throw new Error('Invalid OTP');
    }

    const kryptonian = await Kryptonian.findOne({ email });
    const token = jwt.sign({ id: kryptonian._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return { token };
  }

  static async generateApiKey(kryptonianId) {
    const apiKey = require('crypto').randomBytes(32).toString('hex');
    await Kryptonian.findByIdAndUpdate(kryptonianId, { apiKey });
    return apiKey;
  }

  static async invalidateApiKey(kryptonianId) {
    await Kryptonian.findByIdAndUpdate(kryptonianId, { apiKey: null });
    return { message: 'API key invalidated.' };
  }
}

module.exports = AuthService;
