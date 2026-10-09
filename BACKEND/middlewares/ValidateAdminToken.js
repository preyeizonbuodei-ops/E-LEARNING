const jwt = require("jsonwebtoken");


exports.ValidateAdminToken = async (req, res, next) => {
    let adminToken;

    const authHeader = req.cookies.adminAuthorization || req.headers.adminauthorization;

    if (authHeader && authHeader.startsWith("Bearer")) {
        adminToken = authHeader.split(" ")[1];
    }

    if (!adminToken) {
        return res.status(401).json({
            success: false,
            message: "Access Denied: No Cookie was provided"
        });
    }

    try {
        const decodedAdmin = jwt.verify( adminToken, process.env.JWT_SECRET );

        req.admin = decodedAdmin;
        console.log("The decoded Admin is:", req.admin);

        next();

    } catch (error) {
        console.log(error);
    }
};