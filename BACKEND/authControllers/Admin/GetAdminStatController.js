
const User = require("../../modules/registerSchema");
Department = require("../../modules/DepartmentModule/DepartmentSchema")
const MajorArea = require("../../modules/DepartmentModule/MajorAreaSchema");
const MajorAreaTopic = require("../../modules/DepartmentModule/MajorTopicSchema");

// Get Admin Dashboard Statistics
const getAdminDashboardStats = async (req, res) => {
  try {
    const [
      totalUsers,
      totalDepartments,
      totalMajorAreas,
      totalTopics,
      topicMaterials,
    ] = await Promise.all([
      User.countDocuments(),
      Department.countDocuments(),
      MajorArea.countDocuments(),
      MajorAreaTopic.countDocuments(),
      MajorAreaTopic.aggregate([
        {
          $project: {
            materialCount: { $size: { $ifNull: ["$materials", []] } },
          },
        },
        {
          $group: {
            _id: null,
            total: { $sum: "$materialCount" },
          },
        },
      ]),
    ]);

    const totalMaterials = topicMaterials[0]?.total || 0;

    return res.status(200).json({
      success: true,
      stats: {
        totalUsers,
        totalDepartments,
        totalMajorAreas,
        totalTopics,
        totalMaterials,
      },
    });
  } catch (error) {
    console.error("Admin dashboard statistics error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to retrieve dashboard statistics",
    });
  }
};

module.exports = { getAdminDashboardStats };
