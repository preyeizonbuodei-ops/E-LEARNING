const Courses = require('../../modules/CourseModuels/Courses');
const User = require('../../modules/registerSchema');

exports.GetCourses = async (req, res) => {
    try {

       const student = await User.findById(req.user.id);

        const getCourse = await Courses.find({
            department: student.department,
            level: student.level
        });

        if (getCourse.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No courses found"
            });
        }

        res.status(200).json({
            success: true,
            courses: getCourse
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};