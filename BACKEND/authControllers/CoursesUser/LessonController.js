
const { ValidateLesson } = require('../../middlewares/Admin/validateLesson');
const Course = require('../../modules/CourseModuels/Courses');
const Lesson = require('../../modules/CourseModuels/LessonSchema');


exports.CreateLesson = async (req, res) => {
    try {

        const {
            courseId,
            title,
            lessonNumber,
            videoUrl,
            material,
            content
        } = req.body;


        const { error } = ValidateLesson.validate({
            courseId,
            title,
            lessonNumber,
            videoUrl,
            material,
            content
        });


        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details[0].message
            });
        }


        const existingCourse = await Course.findById(courseId);


        if (!existingCourse) {
            return res.status(404).json({
                success: false,
                message: "Course not found"
            });
        }


        const lesson = new Lesson({
            courseId,
            title,
            lessonNumber,
            videoUrl,
            material,
            content
        });


        await lesson.save();


        return res.status(201).json({
            success: true,
            message: "Lesson created successfully",
            lesson
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


exports.GetLessons = async (req, res) => {
    try {
        const lessons = await Lesson.find().sort({
            lessonNumber: 1
        });

        return res.status(200).json({
            success: true,
            lessons
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


exports.GetCourses = async (req, res) => {
    try {
        const courses = await Course.find().sort({
            courseTitle: 1
        });

        return res.status(200).json({
            success: true,
            courses
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};





