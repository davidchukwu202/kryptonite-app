const jwt = require('jsonwebtoken');
const Kryptonian = require('../models/kryptonian');

const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const kryptonian = await Kryptonian.findOne({ _id: decoded.id, apiKey: token });
    if (!kryptonian) {
      throw new Error();
    }
    req.user = { id: kryptonian._id };
    next();
  } catch (error) {
    res.status(401).send({ error: 'Unauthorized access' });
  }
};

module.exports = authMiddleware;
