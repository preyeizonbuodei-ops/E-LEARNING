import { useState } from "react";
import createCourseStore from "../../../DashBoards/UserDashboard/CourseStore/CourseStore";
import { Loader } from "lucide-react";
import { motion } from "motion/react";

const CreateCourse = () => {

    const initialValues = {
        courseType: "",
        department: "",
        level: "",
        semester: "",
        courseCode: "",
        courseTitle: "",
        description: ""
    };

    const [FormValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormError] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [serverError, setServerError] = useState("");
    const [isSubmit, setIsSubmit] = useState(false);

    const { addcourse } = createCourseStore();

    const handelChange = (e) => {
        const { name, value } = e.target;

        setFormValues({
            ...FormValues,
            [name]: value
        });

       
        setFormError({...formErrors, [name]: "" });
    };

    const Validate = (values) => {
        const errors = {};

        // Course Type
        if (!values.courseType) {
            errors.courseType = "Select Course Type";
        }

        // These are only required for semester courses
        if (values.courseType === "semester") {

            if (!values.department) {
                errors.department = "Select Department";
            }

            if (!values.level) {
                errors.level = "Select Level";
            }

            if (!values.semester) {
                errors.semester = "Select Semester";
            }
        }

      
        if (!values.courseCode.trim()) {
            errors.courseCode = "Enter Course Code";
        }

        if (!values.courseTitle.trim()) {
            errors.courseTitle = "Enter Course Title";
        }

        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isLoading) {
            return;
        }

        setServerError("");
        setIsSubmit(false);

        const errors = Validate(FormValues);

        setFormError(errors);

        if (Object.keys(errors).length > 0) {
            return;
        }

        setIsLoading(true);

        try {
            console.log("FORM VALUES:", FormValues);
            const response = await addcourse(
                FormValues.courseType,
                FormValues.department,
                FormValues.level,
                FormValues.courseTitle,
                FormValues.courseCode,
                FormValues.semester,
                FormValues.description
            );

            console.log("CREATE COURSE RESPONSE:", response);

            if (response.success) {
                setIsSubmit(true);
                setFormValues(initialValues);
                setFormError({});
            }

        } catch (error) {

            console.log("FRONTEND ERROR:", error);

            setServerError(
                error.response?.data?.message ||
                "Unable to create course"
            );

        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex w-full min-h-screen justify-center items-center">

            <div className="w-full max-w-md px-4">

                <form onSubmit={handleSubmit}>

                    <div className="w-full min-h-100 mt-10 shadow-[0_2px_12px_rgba(0,0,0,0.12)] px-5 py-5 rounded-lg">

                        <h1 className="text-[28px] font-bold text-center mb-5">
                            Create Course
                        </h1>

                        {isSubmit && (
                            <p className="text-green-600 text-sm mb-3">
                                Course created successfully
                            </p>
                        )}

                        {/* Course Type */}
                        <label>Course Type</label>

                        <select
                            className="w-full rounded-lg py-2 pl-3 pr-3 bg-gray-50 border border-gray-200 outline-none transition duration-500 focus:border-amber-500 focus:ring-2 focus:ring-amber-500 mb-1"
                            name="courseType"
                            value={FormValues.courseType}
                            onChange={handelChange}
                        >
                            <option value="">
                                Select Course Type
                            </option>

                            <option value="semester">
                                Semester
                            </option>

                            <option value="general">
                                General
                            </option>

                        </select>

                        {formErrors.courseType && (
                            <p className="text-red-500 text-sm mb-2">
                                {formErrors.courseType}
                            </p>
                        )}


                        {/* Department */}
                        <label>Department</label>

                        <select
                            className="w-full rounded-lg py-2 pl-3 pr-3 bg-gray-50 border border-gray-200 outline-none transition duration-500 focus:border-amber-500 focus:ring-2 focus:ring-amber-500 mb-1"
                            name="department"
                            value={FormValues.department}
                            onChange={handelChange}
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

                        {formErrors.department && (
                            <p className="text-red-500 text-sm mb-2">
                                {formErrors.department}
                            </p>
                        )}


                        {/* Level */}
                        <label>Level</label>

                        <select
                            className="w-full rounded-lg py-2 pl-3 pr-3 bg-gray-50 border border-gray-200 outline-none transition duration-500 focus:border-amber-500 focus:ring-2 focus:ring-amber-500 mb-1"
                            name="level"
                            value={FormValues.level}
                            onChange={handelChange}
                        >

                            <option value="">
                                Select Level
                            </option>

                            <option value="100">100</option>
                            <option value="200">200</option>
                            <option value="300">300</option>
                            <option value="400">400</option>
                            <option value="500">500</option>

                        </select>

                        {formErrors.level && (
                            <p className="text-red-500 text-sm mb-2">
                                {formErrors.level}
                            </p>
                        )}


                        {/* Semester */}
                        <label>Semester</label>

                        <select
                            className="w-full rounded-lg py-2 pl-3 pr-3 bg-gray-50 border border-gray-200 outline-none transition duration-500 focus:border-amber-500 focus:ring-2 focus:ring-amber-500 mb-1"
                            name="semester"
                            value={FormValues.semester}
                            onChange={handelChange}
                        >

                            <option value="">
                                Select Semester
                            </option>

                            <option value="first">
                                First
                            </option>

                            <option value="second">
                                Second
                            </option>

                        </select>

                        {formErrors.semester && (
                            <p className="text-red-500 text-sm mb-2">
                                {formErrors.semester}
                            </p>
                        )}


                        {/* Course Code */}
                        <label>Course Code</label>

                        <input
                            className="w-full rounded-lg py-2 pl-3 pr-3 bg-gray-50 border border-gray-200 outline-none transition duration-500 focus:border-amber-500 focus:ring-2 focus:ring-amber-500 mb-1"
                            type="text"
                            placeholder="e.g MCE 202"
                            name="courseCode"
                            value={FormValues.courseCode}
                            onChange={handelChange}
                        />

                        {formErrors.courseCode && (
                            <p className="text-red-500 text-sm mb-2">
                                {formErrors.courseCode}
                            </p>
                        )}


                        {/* Course Title */}
                        <label>Course Title</label>

                        <input
                            className="w-full rounded-lg py-2 pl-3 pr-3 bg-gray-50 border border-gray-200 outline-none transition duration-500 focus:border-amber-500 focus:ring-2 focus:ring-amber-500 mb-1"
                            type="text"
                            placeholder="e.g Introduction to Robotics"
                            name="courseTitle"
                            value={FormValues.courseTitle}
                            onChange={handelChange}
                        />

                        {formErrors.courseTitle && (
                            <p className="text-red-500 text-sm mb-2">
                                {formErrors.courseTitle}
                            </p>
                        )}


                        {/* Description */}
                        <label>Description</label>

                        <input
                            className="w-full rounded-lg py-2 pl-3 pr-3 bg-gray-50 border border-gray-200 outline-none transition duration-500 focus:border-amber-500 focus:ring-2 focus:ring-amber-500 mb-2"
                            type="text"
                            placeholder="e.g Optional"
                            name="description"
                            value={FormValues.description}
                            onChange={handelChange}
                        />


                        {/* Server Error */}
                        {serverError && (
                            <p className="text-red-500 text-sm mb-3">
                                {serverError}
                            </p>
                        )}


                        {/* Submit */}
                        <motion.button
                            disabled={isLoading}
                            type="submit"
                            whileHover={
                                isLoading
                                    ? undefined
                                    : { scale: 1.02 }
                            }
                            className="border border-amber-500 px-4 py-2 rounded-lg mb-3 w-full mt-3 bg-blue-950 text-white disabled:opacity-60 flex justify-center items-center"
                        >

                            {isLoading ? (
                                <>
                                    <Loader
                                        className="animate-spin mr-2"
                                        size={20}
                                    />
                                    Creating...
                                </>
                            ) : (
                                "Create"
                            )}

                        </motion.button>

                    </div>

                </form>

            </div>

        </div>
    );
};

export default CreateCourse;