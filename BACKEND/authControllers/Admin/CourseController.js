const { ValidateCourse } = require('../../middlewares/Admin/validateCourse');
const Courses = require('../../modules/CourseModuels/Courses');

exports.CreateCourse = async (req, res) => {
    try {

        const {
            courseType,
            courseScope,
            department,
            level,
            courseTitle,
            courseCode,
            semester,
            description
        } = req.body;


        const { error } = ValidateCourse.validate({
            courseType,
            courseScope,
            department,
            level,
            courseTitle,
            courseCode,
            semester,
            description
        });

        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details[0].message
            });
        }


        let existingCourse;

        if (courseScope === "shared") {

            existingCourse = await Courses.findOne({
                courseCode,
                courseScope: "shared",
                level,
                semester
            });

        } else {

            existingCourse = await Courses.findOne({
                courseCode,
                courseScope: "department",
                department
            });
        }


        if (existingCourse) {
            return res.status(409).json({
                success: false,
                message: "Course already exists"
            });
        }


        const newCourse = new Courses({
            courseType,
            courseScope,
            department: courseScope === "department" ? department : undefined,
            level,
            courseCode,
            courseTitle,
            description,
            semester
        });


        await newCourse.save();


        return res.status(201).json({
            success: true,
            message: "New Course Created Successfully",
            course: newCourse
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Server error while creating course"
        });
    }
};