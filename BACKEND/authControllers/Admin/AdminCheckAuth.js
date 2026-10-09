const Admin = require("../../modules/adminSchema");

exports.AdminCheckAuth = async (req, res) => {
    try {

        const adminId = req.admin.id;

        const existingAdmin = await Admin.findById(adminId);

        if (!existingAdmin) {
            return res.status(404).json({
                success: false,
                message: "No Admin Found"
            });
        }

        return res.status(200).json({
            success: true,
            admin: existingAdmin,
            message: "Admin authenticated successfully"
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};