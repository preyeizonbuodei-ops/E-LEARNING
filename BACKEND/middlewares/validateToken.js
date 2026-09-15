const jwt = require("jsonwebtoken");


exports.ValidateToken = (req, res, next) => {

    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    if(authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1]
    }

    if(!token) {
        return res.status(401).json({ success: false, message: "No token was given, Authorization denied" });
    }

    try {
        
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decode;
        console.log(`The decoded user is:`, req.user);
        next();
    } catch (error) {
        console.log(error);
        res.status(400).json({ success: false, message: "an error occured" });
    }
};