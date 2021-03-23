const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../secrets.json");

let secret;
if (process.env.NODE_ENV == "production") {
    secret = process.env.config.JWT_SECRET;
} else {
    secret = JWT_SECRET;
}


const authenticateTokenSocket = (token) => {
    return jwt.verify(token, secret, (err, user) => {
        if (err || user.userStatus !== "active") {
            console.log(err)
            return false
        } else {
            return user.userId;
        }
    });
};

module.exports = authenticateTokenSocket;