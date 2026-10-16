
const jwt = require("jsonwebtoken");

exports.ValidateToken = (req, res, next) => {
    let token;
    let authHeader = req.cookies.authorization || req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];
    }

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "No token was given, Authorization denied"
        });
    }

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decode;
        

        next();
    } catch (error) {
        console.log(error);

        return res.status(401).json({
            success: false,
            message: error.name === "TokenExpiredError"
                ? "Access token expired"
                : "Invalid access token"
        });
    }
};
