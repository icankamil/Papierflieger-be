const jwt = require('jsonwebtoken');
const { users } = require('../app/models');
const dotenv = require('dotenv');
dotenv.config();
const auth = (req, res, next) => {
  try {
    const bearerToken = req.headers.authorization;
    const token = bearerToken.split('Bearer ')[1];
    if (!token) {
      return res.status(401).json({
        status: 'failed',
        message: 'Required authorization',
      });
    }
    const payload = jwt.verify(token, process.env.SECRET_KEY);
    users.findByPk(payload.id).then((instance) => {
      req.user = instance;
      next();
    });
  } catch {
    res.status(401).json({
      status: 'failed',
      message: 'Invalid token',
    });
  }
};
module.exports = auth;
