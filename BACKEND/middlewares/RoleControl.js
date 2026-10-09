
const authorizedUserRoles = (...allowedRoles) => {
    return (req, res, next) => {

        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized"
            });
        }

        next();
    };
};


const authorizedAdminRoles = (...allowedRoles) => {
    return (req, res, next) => {

        if (!allowedRoles.includes(req.admin.role)) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized"
            });
        }

        next();
    };
};


const allowUserOrAdmin = (req, res, next) => {

    if (req.user || req.admin) {
        return next();
    }

    return res.status(401).json({
        success: false,
        message: "Authentication required"
    });
};


module.exports = {
    authorizedUserRoles,
    authorizedAdminRoles,
    allowUserOrAdmin
};