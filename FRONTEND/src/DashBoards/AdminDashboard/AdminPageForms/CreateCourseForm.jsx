
import { useState } from "react";
import { Loader } from "lucide-react";
import { motion } from "motion/react";
import createCourseStore from "../../UserDashboard/CourseStore/CourseStore";


const initialValues = {
    courseType: "semester",
    courseScope: "shared",
    department: "",
    level: "",
    courseTitle: "",
    courseCode: "",
    semester: "first",
    description: ""
};

const CreateCourseForm = () => {
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [serverError, setServerError] = useState("");
    const [isSubmit, setIsSubmit] = useState(false);

    const { addcourse } = createCourseStore();

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormValues((prev) => {
            const updated = {
                ...prev,
                [name]: value
            };

            if (name === "courseType" && value === "general") {
                updated.courseScope = "";
                updated.department = "";
                updated.level = "";
                updated.semester = "";
            }

            if (name === "courseType" && value === "semester") {
                updated.courseScope = "shared";
                updated.semester = "first";
            }

            if (name === "courseScope" && value === "shared") {
                updated.department = "";
            }

            return updated;
        });

        setFormErrors((prev) => ({
            ...prev,
            [name]: ""
        }));

        setServerError("");
        setIsSubmit(false);
    };

    const validateForm = () => {
        const errors = {};

        if (!formValues.courseType) {
            errors.courseType = "Select a course type";
        }

        if (
            formValues.courseType === "semester" &&
            !formValues.courseScope
        ) {
            errors.courseScope = "Select a course scope";
        }

        if (
            formValues.courseType === "semester" &&
            formValues.courseScope === "department" &&
            !formValues.department.trim()
        ) {
            errors.department = "Enter the department";
        }

        if (
            formValues.courseType === "semester" &&
            !formValues.level
        ) {
            errors.level = "Select a level";
        }

        if (
            formValues.courseType === "semester" &&
            !formValues.semester
        ) {
            errors.semester = "Select a semester";
        }

        if (!formValues.courseTitle.trim()) {
            errors.courseTitle = "Enter the course title";
        }

        if (!formValues.courseCode.trim()) {
            errors.courseCode = "Enter the course code";
        }

        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isLoading) return;

        setServerError("");
        setIsSubmit(false);

        const errors = validateForm();
        setFormErrors(errors);

        if (Object.keys(errors).length > 0) return;

        setIsLoading(true);

        try {
            const isSemester = formValues.courseType === "semester";

            const courseData = {
                courseType: formValues.courseType,
                courseScope: isSemester
                    ? formValues.courseScope
                    : undefined,
                department:
                    isSemester &&
                    formValues.courseScope === "department"
                        ? formValues.department.trim()
                        : undefined,
                level: isSemester ? formValues.level : undefined,
                semester: isSemester ? formValues.semester : undefined,
                courseTitle: formValues.courseTitle.trim(),
                courseCode: formValues.courseCode.trim(),
                description: formValues.description.trim()
            };

            const response = await addcourse(
                courseData.courseType,
                courseData.courseScope,
                courseData.department,
                courseData.level,
                courseData.courseTitle,
                courseData.courseCode,
                courseData.semester,
                courseData.description
            );

            if (response?.success) {
                setIsSubmit(true);
                setFormValues(initialValues);
                setFormErrors({});
            } else {
                setServerError(
                    response?.message || "Unable to create course"
                );
            }
        } catch (error) {
            console.error("CREATE COURSE FORM ERROR:", error);

            setServerError(
                error.response?.data?.message ||
                "Unable to create course"
            );
        } finally {
            setIsLoading(false);
        }
    };

    const inputClass =
        "w-full rounded-lg py-2.5 px-3 bg-gray-50 border border-gray-200 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-500";

    const renderError = (field) =>
        formErrors[field] ? (
            <p className="text-red-500 text-sm mt-1">
                {formErrors[field]}
            </p>
        ) : null;

    return (
        <div className="flex w-full min-h-screen justify-center items-center p-4">
            <div className="w-full max-w-3xl">
                <form onSubmit={handleSubmit}>
                    <div className="w-full shadow-[0_2px_12px_rgba(0,0,0,0.12)] px-5 py-6 rounded-lg bg-white">
                        <h1 className="text-2xl md:text-[28px] font-bold text-center mb-2">
                            Create Course
                        </h1>

                        <p className="text-gray-500 text-sm text-center mb-6">
                            Add a new course to StudStore
                        </p>

                        {isSubmit && (
                            <p className="text-green-600 text-sm mb-4 text-center">
                                Course created successfully
                            </p>
                        )}

                        <div className="mb-4">
                            <label className="block mb-1">
                                Course Type
                            </label>

                            <select
                                className={inputClass}
                                name="courseType"
                                value={formValues.courseType}
                                onChange={handleChange}
                            >
                                <option value="semester">
                                    Semester Course
                                </option>
                                <option value="general">
                                    General Course
                                </option>
                            </select>

                            {renderError("courseType")}
                        </div>

                        {formValues.courseType === "semester" && (
                            <>
                                <div className="mb-4">
                                    <label className="block mb-1">
                                        Course Scope
                                    </label>

                                    <select
                                        className={inputClass}
                                        name="courseScope"
                                        value={formValues.courseScope}
                                        onChange={handleChange}
                                    >
                                        <option value="shared">
                                            Shared Course
                                        </option>
                                        <option value="department">
                                            Department Course
                                        </option>
                                    </select>

                                    {renderError("courseScope")}
                                </div>

                                {formValues.courseScope === "department" && (
                                    <div className="mb-4">
                                        <label className="block mb-1">
                                            Department
                                        </label>

                                        <select
                                            className={inputClass}
                                            name="department"
                                            value={formValues.department}
                                            onChange={handleChange}
                                        >
                                            <option value="">
                                                Select Department
                                            </option>
                                            <option value="Mechatronics Engineering">
                                                Mechatronics Engineering
                                            </option>
                                            <option value="Mechanical Engineering">
                                                Mechanical Engineering
                                            </option>
                                            <option value="Electrical Electronics Engineering">
                                                Electrical Electronics Engineering
                                            </option>
                                            <option value="Civil Engineering">
                                                Civil Engineering
                                            </option>
                                            <option value="Chemical Engineering">
                                                Chemical Engineering
                                            </option>
                                            <option value="Petroleum and Gas Engineering">
                                                Petroleum and Gas Engineering
                                            </option>
                                        </select>

                                        {renderError("department")}
                                    </div>
                                )}

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <label className="block mb-1">
                                            Level
                                        </label>

                                        <select
                                            className={inputClass}
                                            name="level"
                                            value={formValues.level}
                                            onChange={handleChange}
                                        >
                                            <option value="">
                                                Select Level
                                            </option>
                                            <option value="100">100 Level</option>
                                            <option value="200">200 Level</option>
                                            <option value="300">300 Level</option>
                                            <option value="400">400 Level</option>
                                            <option value="500">500 Level</option>
                                        </select>

                                        {renderError("level")}
                                    </div>

                                    <div>
                                        <label className="block mb-1">
                                            Semester
                                        </label>

                                        <select
                                            className={inputClass}
                                            name="semester"
                                            value={formValues.semester}
                                            onChange={handleChange}
                                        >
                                            <option value="first">
                                                First Semester
                                            </option>
                                            <option value="second">
                                                Second Semester
                                            </option>
                                        </select>

                                        {renderError("semester")}
                                    </div>
                                </div>
                            </>
                        )}

                        <div className="mb-4">
                            <label className="block mb-1">
                                Course Title
                            </label>

                            <input
                                className={inputClass}
                                type="text"
                                name="courseTitle"
                                placeholder="e.g. General Physics"
                                value={formValues.courseTitle}
                                onChange={handleChange}
                            />

                            {renderError("courseTitle")}
                        </div>

                        <div className="mb-4">
                            <label className="block mb-1">
                                Course Code
                            </label>

                            <input
                                className={inputClass}
                                type="text"
                                name="courseCode"
                                placeholder="e.g. PHY 101"
                                value={formValues.courseCode}
                                onChange={handleChange}
                            />

                            {renderError("courseCode")}
                        </div>

                        <div className="mb-5">
                            <label className="block mb-1">
                                Course Description
                            </label>

                            <textarea
                                className={`${inputClass} resize-y`}
                                rows={5}
                                name="description"
                                placeholder="Enter a brief course description..."
                                value={formValues.description}
                                onChange={handleChange}
                            />
                        </div>

                        {serverError && (
                            <p className="text-red-500 text-sm mb-3">
                                {serverError}
                            </p>
                        )}

                        <motion.button
                            disabled={isLoading}
                            type="submit"
                            whileHover={
                                isLoading ? undefined : { scale: 1.02 }
                            }
                            className="border border-amber-500 px-4 py-3 rounded-lg w-full mt-2 bg-blue-950 text-white disabled:opacity-60 flex justify-center items-center"
                        >
                            {isLoading ? (
                                <>
                                    <Loader
                                        className="animate-spin mr-2"
                                        size={20}
                                    />
                                    Creating Course...
                                </>
                            ) : (
                                "Create Course"
                            )}
                        </motion.button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateCourseForm;
