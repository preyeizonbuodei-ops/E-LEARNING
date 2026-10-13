const mongoose = require("mongoose");

const ResearchPaperSchema = new mongoose.Schema(
  {
    majorAreaId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MajorArea",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    authors: {
      type: [String],
      required: true,
    },

    abstract: {
      type: String,
      required: true,
      trim: true,
    },

    publicationYear: {
      type: Number,
      required: true,
    },

    doi: {
      type: String,
      trim: true,
      default: "",
    },

    sourceUrl: {
      type: String,
      required: true,
      trim: true,
    },

    pdfUrl: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ResearchPaper", ResearchPaperSchema);
