const jwt = require("jsonwebtoken");
require('dotenv').config()
const secret = process.env.secret;

const verifyToken = (req, res, next) => {
  //return next();
  const token =
    req.body.token || req.query.token || req.headers["token"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = verifyToken;