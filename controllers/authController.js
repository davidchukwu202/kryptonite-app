const AuthService = require('../services/authService');

class AuthController {
  static async register(req, res) {
    try {
      const { email, password } = req.body;
      const kryptonian = await AuthService.register(email, password);
      res.status(201).json({ message: "Registration successful. Please check your email for confirmation." });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;
      const response = await AuthService.login(email, password);
      res.status(200).json(response);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async verifyOTP(req, res) {
    try {
      const { email, otp } = req.body;
      const response = await AuthService.verifyOTP(email, otp);
      res.status(200).json(response);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async generateApiKey(req, res) {
    try {
      const { id } = req.user;
      const apiKey = await AuthService.generateApiKey(id);
      res.status(200).json({ apiKey });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async invalidateApiKey(req, res) {
    try {
      const { id } = req.user;
      const response = await AuthService.invalidateApiKey(id);
      res.status(200).json(response);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = AuthController;
