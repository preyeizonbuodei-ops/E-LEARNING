const majorAreaTopicValidation = require("../../../middlewares/Admin/ValidateMajorTopics");
const MajorAreaTopic = require("../../../modules/DepartmentModule/MajorTopicSchema");



// Create Topic
const createMajorAreaTopic = async (req, res) => {
    try {
        const { error, value } = majorAreaTopicValidation.validate(req.body);

        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details[0].message,
            });
        }

        const existingTopic = await MajorAreaTopic.findOne({
            majorArea: value.majorArea,
            title: value.title,
        });

        if (existingTopic) {
            return res.status(409).json({
                success: false,
                message: "This topic already exists in this major area",
            });
        }

        const topic = await MajorAreaTopic.create(value);

        return res.status(201).json({
            success: true,
            message: "Topic created successfully",
            topic,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Get All Topics
const getAllMajorAreaTopics = async (req, res) => {
    try {
        const topics = await MajorAreaTopic.find()
            .populate("majorArea", "name")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            topics,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Get One Topic By ID
const getMajorAreaTopicById = async (req, res) => {
    try {
        const { majorTopicId } = req.params;

        if (!majorTopicId.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({
                success: false,
                message: "Invalid topic ID",
            });
        }

        const topic = await MajorAreaTopic.findById(majorTopicId)
            .populate("majorArea", "name");

        if (!topic) {
            return res.status(404).json({
                success: false,
                message: "Topic not found",
            });
        }

        return res.status(200).json({
            success: true,
            topic,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    createMajorAreaTopic,
    getAllMajorAreaTopics,
    getMajorAreaTopicById,
};