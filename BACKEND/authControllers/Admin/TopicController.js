const Topic = require("../../modules/CourseModuels/TopicsSchema");
const Lessons = require("../../modules/CourseModuels/LessonSchema");
const ValidteTopic = require("../../middlewares/Admin/ValidateTopic");

exports.CreateTopic = async (req, res) => {
    const { lessonId } = req.params;

    try {
        const {
            topicNumber,
            title,
            content,
            examples,
            videos,
            materials,
            resources
        } = req.body;

        const { error } = ValidteTopic.validate({
            lessonId,
            topicNumber,
            title,
            content,
            examples,
            videos,
            materials,
            resources
        });

        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details[0].message
            });
        }

        const lesson = await Lessons.findById(lessonId);

        if (!lesson) {
            return res.status(404).json({
                success: false,
                message: "Lesson not found"
            });
        }

        const topic = await Topic.create({
            lessonId,
            topicNumber,
            title,
            content,
            examples,
            videos,
            materials,
            resources
        });

        return res.status(201).json({
            success: true,
            message: "Topic created successfully",
            topic
        });

    } catch (error) {
        console.log("CREATE TOPIC ERROR:", error);

        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

exports.GetTopics = async (req, res) => {
    try {
        const { lessonId } = req.params;

        const lesson = await Lessons.findById(lessonId);

        if (!lesson) {
            return res.status(404).json({
                success: false,
                message: "Lesson not found"
            });
        }

        const topics = await Topic.find({ lessonId }).sort({
            topicNumber: 1
        });

        return res.status(200).json({
            success: true,
            message: "Topics retrieved successfully",
            topics
        });

    } catch (error) {
        console.log("GET TOPICS ERROR:", error);

        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};