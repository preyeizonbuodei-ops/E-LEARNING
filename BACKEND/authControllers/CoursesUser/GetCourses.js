const Courses = require("../../modules/CourseModuels/Courses");
const User = require("../../modules/registerSchema");

exports.GetCourses = async (req, res) => {
    try {
        const student = await User.findById(req.user.id);

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student not found"
            });
        }

        const semesterCourses = await Courses.find({
            courseType: "semester",
            level: student.level,
            $or: [
                {
                    courseScope: "shared"
                },
                {
                    courseScope: "department",
                    department: student.department
                }
            ]
        });

        const generalCourses = await Courses.find({
            courseType: "general"
        });

        return res.status(200).json({
            success: true,
            semesterCourses,
            generalCourses
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


exports.GetCourseById = async (req, res) => {
    try {
        const { courseId } = req.params;

        const course = await Courses.findById(courseId);

        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found"
            });
        }

        return res.status(200).json({
            success: true,
            course
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};