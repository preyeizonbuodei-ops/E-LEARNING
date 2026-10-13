const ResearchPaper = require("../../../modules/DepartmentModule/ResearchPaperSchema");

// Admin: Create Research Paper
exports.createResearchPaper = async (req, res) => {
  try {
    const researchPaper = await ResearchPaper.create(req.body);

    return res.status(201).json({
      message: "Research paper created successfully",
      researchPaper,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to create research paper",
      error: error.message,
    });
  }
};

// User: Get All Research Papers
exports.getAllResearchPapers = async (req, res) => {
  try {
    const researchPapers = await ResearchPaper.find()
      .populate("majorAreaId", "name");

    return res.status(200).json({
      message: "Research papers retrieved successfully",
      researchPapers,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to retrieve research papers",
      error: error.message,
    });
  }
};

// User: Get Research Paper By ID
exports.getResearchPaperById = async (req, res) => {
  try {
    const researchPaper = await ResearchPaper.findById(req.params.id)
      .populate("majorAreaId", "name");

    if (!researchPaper) {
      return res.status(404).json({
        message: "Research paper not found",
      });
    }

    return res.status(200).json({
      message: "Research paper retrieved successfully",
      researchPaper,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to retrieve research paper",
      error: error.message,
    });
  }
};