const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const authenticateTokenSocket = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err || user.userStatus !== "active") {
      console.log(err);
      return false;
    } else {
      return user.userId;
    }
  });
};

module.exports = authenticateTokenSocket;
