const jwt = require("jsonwebtoken");


const InitToken = (req, res, next) => {
    const token = req.session.token;
    jwt.verify(token, res.locals.secrets.JWT_SECRET, (err, user) => {
        if (err || user.userStatus != "active") {
            res.json({
                success: false
            });
        } else {
            req.userId = user.userId;
            req.userRole = user.userRole;
            req.userStatus = user.userStatus;

            next();
        }
    });
};

module.exports = InitToken;