
const Topic = require("../../modules/CourseModuels/TopicsSchema");

exports.GetTopicById = async (req, res) => {
    try {
        const { topicId } = req.params;

        // Find the topic using its ID
        const topic = await Topic.findById(topicId);


        console.log(
            "TOPIC DATA FROM DATABASE:",
            JSON.stringify(topic, null, 2)
        );

        // Check whether the topic exists
        if (!topic) {
            return res.status(404).json({
                success: false,
                message: "Topic not found"
            });
        }

        // Return the topic content and other stored fields
        return res.status(200).json({
            success: true,
            message: "Topic retrieved successfully",
            topic
        });

    } catch (error) {
        console.error("GET TOPIC BY ID ERROR:", error);

        // Handle invalid MongoDB ObjectIds
        if (error.name === "CastError") {
            return res.status(400).json({
                success: false,
                message: "Invalid topic ID"
            });
        }

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

