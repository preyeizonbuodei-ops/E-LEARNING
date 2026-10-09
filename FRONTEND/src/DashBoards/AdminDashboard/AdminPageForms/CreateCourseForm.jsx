import { useEffect, useState } from "react";
import { Loader } from "lucide-react";
import { motion } from "motion/react";

import useCourseStore from "../../UserDashboard/CourseStore/GetCourseStore";
import useLessonStore from "../../UserDashboard/CourseStore/CreateLessonStore";

const CreateLessonForm = () => {

    const initialValues = {
        courseId: "",
        title: "",
        lessonNumber: "",
        videoUrl: "",
        material: "",
        content: ""
    };

    const [FormValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormError] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [serverError, setServerError] = useState("");
    const [isSubmit, setIsSubmit] = useState(false);

    const [courses, setCourses] = useState([]);
    const [loadingCourses, setLoadingCourses] = useState(true);

    const { getCourse } = useCourseStore();
    const { createLesson } = useLessonStore();

    useEffect(() => {

        const fetchCourses = async () => {

            try {

                setLoadingCourses(true);

                const response = await getCourse();

                const semesterCourses = response.semesterCourses || [];
                const generalCourses = response.generalCourses || [];

                setCourses([
                    ...semesterCourses,
                    ...generalCourses
                ]);

            } catch (error) {

                console.log("GET COURSES ERROR:", error);

                setServerError(
                    error.response?.data?.message ||
                    "Unable to load courses"
                );

            } finally {

                setLoadingCourses(false);

            }

        };

        fetchCourses();

    }, [getCourse]);


    const handelChange = (e) => {

        const { name, value } = e.target;

        setFormValues({
            ...FormValues,
            [name]: value
        });

        setFormError({
            ...formErrors,
            [name]: ""
        });

        setServerError("");
        setIsSubmit(false);

    };


    const Validate = (values) => {

        const errors = {};

        if (!values.courseId) {
            errors.courseId = "Select a course";
        }

        if (!values.title.trim()) {
            errors.title = "Enter lesson title";
        }

        if (!values.lessonNumber) {
            errors.lessonNumber = "Enter lesson number";
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

            console.log("LESSON FORM VALUES:", FormValues);

            const response = await createLesson({
                ...FormValues,
                lessonNumber: Number(FormValues.lessonNumber)
            });

            console.log("CREATE LESSON RESPONSE:", response);

            if (response.success) {

                setIsSubmit(true);

                setFormValues(initialValues);

                setFormError({});

            }

        } catch (error) {

            console.log("FRONTEND ERROR:", error);

            setServerError(
                error.response?.data?.message ||
                "Unable to create lesson"
            );

        } finally {

            setIsLoading(false);

        }

    };


    return (

        <div className="flex w-full min-h-screen justify-center items-center p-4">

            <div className="w-full max-w-3xl">

                <form onSubmit={handleSubmit}>

                    <div className="w-full shadow-[0_2px_12px_rgba(0,0,0,0.12)] px-5 py-6 rounded-lg bg-white">

                        <h1 className="text-[28px] font-bold text-center mb-2">
                            Create Lesson
                        </h1>

                        <p className="text-gray-500 text-sm text-center mb-6">
                            Add a new lesson to an existing course
                        </p>


                        {isSubmit && (
                            <p className="text-green-600 text-sm mb-4 text-center">
                                Lesson created successfully
                            </p>
                        )}


                        {/* Course */}

                        <label className="block mb-1">
                            Course
                        </label>

                        <select
                            className="w-full rounded-lg py-2 pl-3 pr-3 bg-gray-50 border border-gray-200 outline-none transition duration-500 focus:border-amber-500 focus:ring-2 focus:ring-amber-500 mb-1"
                            name="courseId"
                            value={FormValues.courseId}
                            onChange={handelChange}
                            disabled={loadingCourses}
                        >

                            <option value="">
                                {loadingCourses
                                    ? "Loading courses..."
                                    : "Select Course"
                                }
                            </option>

                            {courses.map((course) => (

                                <option
                                    key={course._id}
                                    value={course._id}
                                >
                                    {course.courseCode} - {course.courseTitle}
                                </option>

                            ))}

                        </select>


                        {formErrors.courseId && (
                            <p className="text-red-500 text-sm mb-2">
                                {formErrors.courseId}
                            </p>
                        )}


                        {/* Lesson Title */}

                        <label className="block mb-1 mt-4">
                            Lesson Title
                        </label>

                        <input
                            className="w-full rounded-lg py-2 pl-3 pr-3 bg-gray-50 border border-gray-200 outline-none transition duration-500 focus:border-amber-500 focus:ring-2 focus:ring-amber-500 mb-1"
                            type="text"
                            placeholder="e.g Introduction to Robotics"
                            name="title"
                            value={FormValues.title}
                            onChange={handelChange}
                        />


                        {formErrors.title && (
                            <p className="text-red-500 text-sm mb-2">
                                {formErrors.title}
                            </p>
                        )}


                        {/* Lesson Number */}

                        <label className="block mb-1 mt-4">
                            Lesson Number
                        </label>

                        <input
                            className="w-full rounded-lg py-2 pl-3 pr-3 bg-gray-50 border border-gray-200 outline-none transition duration-500 focus:border-amber-500 focus:ring-2 focus:ring-amber-500 mb-1"
                            type="number"
                            min="1"
                            placeholder="e.g 1"
                            name="lessonNumber"
                            value={FormValues.lessonNumber}
                            onChange={handelChange}
                        />


                        {formErrors.lessonNumber && (
                            <p className="text-red-500 text-sm mb-2">
                                {formErrors.lessonNumber}
                            </p>
                        )}


                        {/* Video URL */}

                        <label className="block mb-1 mt-4">
                            Video URL
                        </label>

                        <input
                            className="w-full rounded-lg py-2 pl-3 pr-3 bg-gray-50 border border-gray-200 outline-none transition duration-500 focus:border-amber-500 focus:ring-2 focus:ring-amber-500 mb-1"
                            type="url"
                            placeholder="e.g https://youtube.com/watch?v=..."
                            name="videoUrl"
                            value={FormValues.videoUrl}
                            onChange={handelChange}
                        />

                        <p className="text-gray-400 text-xs mb-2">
                            Optional
                        </p>


                        {/* Material */}

                        <label className="block mb-1 mt-4">
                            Study Material URL
                        </label>

                        <input
                            className="w-full rounded-lg py-2 pl-3 pr-3 bg-gray-50 border border-gray-200 outline-none transition duration-500 focus:border-amber-500 focus:ring-2 focus:ring-amber-500 mb-1"
                            type="url"
                            placeholder="e.g https://..."
                            name="material"
                            value={FormValues.material}
                            onChange={handelChange}
                        />

                        <p className="text-gray-400 text-xs mb-2">
                            Optional
                        </p>


                        {/* Content */}

                        <label className="block mb-1 mt-4">
                            Lesson Content
                        </label>

                        <textarea
                            className="w-full rounded-lg py-3 px-3 bg-gray-50 border border-gray-200 outline-none transition duration-500 focus:border-amber-500 focus:ring-2 focus:ring-amber-500 resize-y"
                            rows="8"
                            placeholder="Write the lesson content here..."
                            name="content"
                            value={FormValues.content}
                            onChange={handelChange}
                        />

                        <p className="text-gray-400 text-xs mb-2">
                            Optional
                        </p>


                        {/* Server Error */}

                        {serverError && (
                            <p className="text-red-500 text-sm mb-3">
                                {serverError}
                            </p>
                        )}


                        {/* Submit */}

                        <motion.button
                            disabled={isLoading || loadingCourses}
                            type="submit"
                            whileHover={
                                isLoading
                                    ? undefined
                                    : { scale: 1.02 }
                            }
                            className="border border-amber-500 px-4 py-2 rounded-lg mb-3 w-full mt-4 bg-blue-950 text-white disabled:opacity-60 flex justify-center items-center"
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

                                "Create Lesson"

                            )}

                        </motion.button>

                    </div>

                </form>

            </div>

        </div>

    );

};

export default CreateLessonForm;