import { useEffect, useState } from "react";
import { BookOpen, FileText, Link, Plus, Video } from "lucide-react";

import createCourseStore from "../../UserDashboard/CourseStore/CourseStore";
import useLessonStore from "../../UserDashboard/CourseStore/CreateLessonStore";

const CreateLessonForm = () => {

    const [courses, setCourses] = useState([]);

    const [formData, setFormData] = useState({
        courseId: "",
        title: "",
        lessonNumber: "",
        videoUrl: "",
        material: "",
        content: ""
    });

    const [loadingCourses, setLoadingCourses] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [serverError, setServerError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const { getCourses } = createCourseStore();
    const { createLesson } = useLessonStore();


    // ==================== GET COURSES ====================

    useEffect(() => {

        const fetchCourses = async () => {

            try {

                setLoadingCourses(true);

                const response = await getCourses();

                console.log(
                    "COURSES FOR LESSON FORM:",
                    response
                );

                setCourses(response.courses || []);

            } catch (error) {

                console.log(
                    "ERROR GETTING COURSES:",
                    error
                );

                setServerError(
                    error.response?.data?.message ||
                    "Unable to load courses"
                );

            } finally {

                setLoadingCourses(false);

            }

        };

        fetchCourses();

    }, [getCourses]);


    // ==================== HANDLE INPUT ====================

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));

        setServerError("");
        setSuccessMessage("");

    };


    // ==================== SUBMIT ====================

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (submitting) {
            return;
        }

        setServerError("");
        setSuccessMessage("");

        if (!formData.courseId) {
            setServerError("Please select a course");
            return;
        }

        if (!formData.title.trim()) {
            setServerError("Please enter a lesson title");
            return;
        }

        if (!formData.lessonNumber) {
            setServerError("Please enter a lesson number");
            return;
        }

        try {

            setSubmitting(true);

            const lessonData = {
                ...formData,
                lessonNumber: Number(formData.lessonNumber)
            };

            console.log(
                "LESSON DATA:",
                lessonData
            );

            const response = await createLesson(
                lessonData
            );

            console.log(
                "CREATE LESSON RESPONSE:",
                response
            );

            if (response.success) {

                setSuccessMessage(
                    "Lesson created successfully"
                );

                setFormData({
                    courseId: "",
                    title: "",
                    lessonNumber: "",
                    videoUrl: "",
                    material: "",
                    content: ""
                });

            }

        } catch (error) {

            console.log(
                "CREATE LESSON ERROR:",
                error
            );

            setServerError(
                error.response?.data?.message ||
                "Unable to create lesson"
            );

        } finally {

            setSubmitting(false);

        }

    };


    return (

        <div className="flex w-full justify-center p-4 sm:p-6 lg:p-8">

            <form
                onSubmit={handleSubmit}
                className="w-full max-w-4xl rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7"
            >

                {/* Header */}

                <div className="mb-8">

                    <div className="flex items-center gap-3">

                        <div className="rounded-xl bg-blue-100 p-3 text-blue-950">

                            <BookOpen size={24} />

                        </div>

                        <div>

                            <h1 className="text-2xl font-bold text-blue-950 sm:text-3xl">
                                Create Lesson
                            </h1>

                            <p className="mt-1 text-sm text-gray-500">
                                Add a new lesson to an existing course.
                            </p>

                        </div>

                    </div>

                </div>


                {/* Success Message */}

                {successMessage && (

                    <div className="mb-5 rounded-lg bg-green-50 px-4 py-3 text-sm text-green-600">
                        {successMessage}
                    </div>

                )}


                {/* Server Error */}

                {serverError && (

                    <div className="mb-5 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
                        {serverError}
                    </div>

                )}


                {/* Course */}

                <div className="mb-6">

                    <label
                        htmlFor="courseId"
                        className="mb-2 block text-sm font-semibold text-gray-700"
                    >
                        Course
                    </label>

                    <div className="relative">

                        <BookOpen
                            size={18}
                            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        />

                        <select
                            id="courseId"
                            name="courseId"
                            value={formData.courseId}
                            onChange={handleChange}
                            required
                            disabled={loadingCourses}
                            className="w-full appearance-none rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-blue-950 focus:bg-white"
                        >

                            <option value="">

                                {loadingCourses
                                    ? "Loading courses..."
                                    : "Select a course"
                                }

                            </option>

                            {courses.map((course) => (

                                <option
                                    key={course._id}
                                    value={course._id}
                                >

                                    {course.courseCode} — {course.courseTitle}

                                </option>

                            ))}

                        </select>

                    </div>

                </div>


                {/* Lesson Title + Number */}

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">

                    <div>

                        <label
                            htmlFor="title"
                            className="mb-2 block text-sm font-semibold text-gray-700"
                        >
                            Lesson Title
                        </label>

                        <input
                            id="title"
                            name="title"
                            type="text"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Introduction to Robotics"
                            required
                            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-blue-950 focus:bg-white"
                        />

                    </div>


                    <div>

                        <label
                            htmlFor="lessonNumber"
                            className="mb-2 block text-sm font-semibold text-gray-700"
                        >
                            Lesson Number
                        </label>

                        <input
                            id="lessonNumber"
                            name="lessonNumber"
                            type="number"
                            min="1"
                            value={formData.lessonNumber}
                            onChange={handleChange}
                            placeholder="1"
                            required
                            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-blue-950 focus:bg-white"
                        />

                    </div>

                </div>


                {/* Video URL */}

                <div className="mt-6">

                    <label
                        htmlFor="videoUrl"
                        className="mb-2 block text-sm font-semibold text-gray-700"
                    >
                        Video URL
                    </label>

                    <div className="relative">

                        <Video
                            size={18}
                            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        />

                        <input
                            id="videoUrl"
                            name="videoUrl"
                            type="url"
                            value={formData.videoUrl}
                            onChange={handleChange}
                            placeholder="https://youtube.com/watch?v=..."
                            className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-blue-950 focus:bg-white"
                        />

                    </div>

                    <p className="mt-1 text-xs text-gray-400">
                        Optional. Add a YouTube or other video URL.
                    </p>

                </div>


                {/* Study Material */}

                <div className="mt-6">

                    <label
                        htmlFor="material"
                        className="mb-2 block text-sm font-semibold text-gray-700"
                    >
                        Study Material URL
                    </label>

                    <div className="relative">

                        <Link
                            size={18}
                            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        />

                        <input
                            id="material"
                            name="material"
                            type="url"
                            value={formData.material}
                            onChange={handleChange}
                            placeholder="https://..."
                            className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-blue-950 focus:bg-white"
                        />

                    </div>

                    <p className="mt-1 text-xs text-gray-400">
                        Optional. Link to a PDF, document, or external material.
                    </p>

                </div>


                {/* Content */}

                <div className="mt-6">

                    <label
                        htmlFor="content"
                        className="mb-2 block text-sm font-semibold text-gray-700"
                    >
                        Lesson Content
                    </label>

                    <div className="relative">

                        <FileText
                            size={18}
                            className="pointer-events-none absolute left-3 top-3.5 text-gray-400"
                        />

                        <textarea
                            id="content"
                            name="content"
                            value={formData.content}
                            onChange={handleChange}
                            rows={8}
                            placeholder="Write the lesson content here..."
                            className="w-full resize-y rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-4 text-sm leading-6 outline-none transition focus:border-blue-950 focus:bg-white"
                        />

                    </div>

                </div>


                {/* Submit */}

                <div className="mt-8 flex justify-end">

                    <button
                        type="submit"
                        disabled={submitting || loadingCourses}
                        className="inline-flex items-center gap-2 rounded-xl bg-blue-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
                    >

                        {submitting ? (

                            <>
                                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                Creating...
                            </>

                        ) : (

                            <>
                                <Plus size={18} />
                                Create Lesson
                            </>

                        )}

                    </button>

                </div>

            </form>

        </div>

    );

};

export default CreateLessonForm;