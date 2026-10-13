
import { useEffect, useState } from "react";
import { useDepartmentStore } from "../../UserDashboard/DepartmentStore/DepartmentStore";
import { useAdminResearchPaperStore } from "../../UserDashboard/CourseStore/ResearchPaperStore";
import { useAdminMajorAreaStore } from "../../UserDashboard/DepartmentStore/MajorAreaStore";


const CreateResearchPaper = () => {
  const { createResearchPaper, loading, error, success } =
    useAdminResearchPaperStore();

  const { departments, getDepartments } = useDepartmentStore();
  const { majorAreas, getMajorAreas } = useAdminMajorAreaStore();

  const [formData, setFormData] = useState({
    departmentId: "",
    majorAreaId: "",
    title: "",
    authors: "",
    abstract: "",
    publicationYear: "",
    doi: "",
    sourceUrl: "",
    pdfUrl: "",
  });

  useEffect(() => {
  getDepartments();
    }, [getDepartments]);

    useEffect(() => {
    if (formData.departmentId) {
        getMajorAreas(formData.departmentId);
    }
    }, [formData.departmentId, getMajorAreas]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
      ...(name === "departmentId" ? { majorAreaId: "" } : {}),
    }));
  };

  
const filteredMajorAreas = majorAreas.filter((area) => {
  const areaDepartmentId =
    area.department?._id || area.department;

  return String(areaDepartmentId) === String(formData.departmentId);
});


  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await createResearchPaper({
        majorAreaId: formData.majorAreaId,
        title: formData.title.trim(),
        authors: formData.authors
          .split(",")
          .map((author) => author.trim())
          .filter(Boolean),
        abstract: formData.abstract.trim(),
        publicationYear: Number(formData.publicationYear),
        doi: formData.doi.trim(),
        sourceUrl: formData.sourceUrl.trim(),
        pdfUrl: formData.pdfUrl.trim(),
      });

      setFormData({
        departmentId: "",
        majorAreaId: "",
        title: "",
        authors: "",
        abstract: "",
        publicationYear: "",
        doi: "",
        sourceUrl: "",
        pdfUrl: "",
      });
    } catch (error) {
      // The Zustand store handles the error message.
    }
  };

  const inputClass =
    "w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100";

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-3xl rounded-2xl bg-white p-5 shadow-sm sm:p-8">
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          Create Research Paper
        </h1>

        <p className="mt-2 text-sm leading-6 text-gray-600">
          Add an engineering research paper to its relevant major area.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label
              htmlFor="departmentId"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Department
            </label>

            <select
              id="departmentId"
              name="departmentId"
              value={formData.departmentId}
              onChange={handleChange}
              required
              className={inputClass}
            >
              <option value="">Select Department</option>
              {departments.map((department) => (
                <option key={department._id} value={department._id}>
                  {department.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="majorAreaId"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Major Area
            </label>

            <select
              id="majorAreaId"
              name="majorAreaId"
              value={formData.majorAreaId}
              onChange={handleChange}
              required
              disabled={!formData.departmentId}
              className={inputClass}
            >
              <option value="">Select Major Area</option>
              {filteredMajorAreas.map((area) => (
                <option key={area._id} value={area._id}>
                  {area.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="title"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Research Paper Title
            </label>
            <input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className={inputClass}
              placeholder="Enter the research paper title"
            />
          </div>

          <div>
            <label
              htmlFor="authors"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Authors
            </label>
            <input
              id="authors"
              name="authors"
              value={formData.authors}
              onChange={handleChange}
              required
              className={inputClass}
              placeholder="Separate author names with commas"
            />
          </div>

          <div>
            <label
              htmlFor="abstract"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Abstract
            </label>
            <textarea
              id="abstract"
              name="abstract"
              value={formData.abstract}
              onChange={handleChange}
              required
              rows={5}
              className={inputClass}
              placeholder="Summarize the research paper"
            />
          </div>

          <div>
            <label
              htmlFor="publicationYear"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Publication Year
            </label>
            <input
              id="publicationYear"
              name="publicationYear"
              type="number"
              min="1800"
              max={new Date().getFullYear()}
              value={formData.publicationYear}
              onChange={handleChange}
              required
              className={inputClass}
              placeholder="e.g. 2025"
            />
          </div>

          <div>
            <label
              htmlFor="doi"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              DOI (Optional)
            </label>
            <input
              id="doi"
              name="doi"
              value={formData.doi}
              onChange={handleChange}
              className={inputClass}
              placeholder="e.g. 10.1234/example"
            />
          </div>

          <div>
            <label
              htmlFor="sourceUrl"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Research Paper Source URL
            </label>
            <input
              id="sourceUrl"
              name="sourceUrl"
              type="url"
              value={formData.sourceUrl}
              onChange={handleChange}
              required
              className={inputClass}
              placeholder="https://..."
            />
          </div>

          <div>
            <label
              htmlFor="pdfUrl"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              PDF URL (Optional)
            </label>
            <input
              id="pdfUrl"
              name="pdfUrl"
              type="url"
              value={formData.pdfUrl}
              onChange={handleChange}
              className={inputClass}
              placeholder="https://.../paper.pdf"
            />
          </div>

          {error && (
            <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
              {error}
            </p>
          )}

          {success && (
            <p role="status" className="rounded-lg bg-green-50 p-3 text-sm text-green-700">
              {success}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-950 px-5 py-3 font-semibold text-white transition hover:bg-blue-900 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Creating Research Paper..." : "Create Research Paper"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateResearchPaper;
