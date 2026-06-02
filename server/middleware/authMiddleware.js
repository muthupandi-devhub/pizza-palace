const jwt = require("jsonwebtoken");

const protect = async (req, res, next) => {

    let token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({
            message: "Not authorized, no token"
        });
    }

    try {

        token = token.split(" ")[1];

        const decoded = jwt.verify(token, "secretkey");

        req.user = {
            id: decoded.id
        };

        next();

    } catch (error) {

        res.status(401).json({
            message: "invalid token"
        });

    }

};

module.exports = protect;