
const Lesson = require("../../modules/CourseModuels/LessonSchema");


exports.Getlesson = async (req, res) => {
    try {

        const { courseId } = req.params;

        const lessons = await Lesson.find({ courseId });

        if (lessons.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No lessons found for this course"
            });
        }

        res.status(200).json({
            success: true,
            lessons
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

