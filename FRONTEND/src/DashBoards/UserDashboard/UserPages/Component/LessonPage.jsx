import { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import {
    ArrowLeft,
    ArrowRight,
    BookOpen,
    PlayCircle
} from "lucide-react";

import LessonStore from "../../CourseStore/LessonStore";
import useCourseStore from "../../CourseStore/GetCourseStore";

const Lessons = () => {
    const { courseId } = useParams();

    const [lessons, setLessons] = useState([]);
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);

    const { getLesson } = LessonStore();
    const { getCourseById } = useCourseStore();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                console.log("COURSE ID:", courseId);

                const lessonResponse = await getLesson(courseId);
                const courseResponse = await getCourseById(courseId);

                console.log("COURSE LESSONS:", lessonResponse);
                console.log("SELECTED COURSE:", courseResponse);

                setLessons(lessonResponse.lessons || []);
                setCourse(courseResponse.course || null);

            } catch (error) {
                console.log(
                    "ERROR GETTING COURSE/LESSONS:",
                    error
                );

                setLessons([]);
                setCourse(null);

            } finally {
                setLoading(false);
            }
        };

        if (courseId) {
            fetchData();
        }
    }, [courseId, getLesson, getCourseById]);

    return (
        <div className="w-full p-4 sm:p-6 lg:p-8">

            {/* Back to Courses */}
            <NavLink
                to="/me/courses"
                className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-blue-950 transition-colors hover:text-amber-500"
            >
                <ArrowLeft size={18} />
                Back to Courses
            </NavLink>

            {/* Hero */}
            <div className="mb-8 rounded-2xl bg-blue-950 p-6 text-white sm:p-8">

                <div className="flex items-center gap-3">

                    <div className="rounded-xl bg-white/10 p-3">
                        <BookOpen size={24} />
                    </div>

                    <div>

                        <p className="text-sm font-semibold text-blue-200">
                            {course?.courseCode || "Course"}
                        </p>

                        <h1 className="text-2xl font-bold sm:text-3xl">
                            {course?.courseTitle || "Loading course..."}
                        </h1>

                    </div>

                </div>

                <p className="mt-4 max-w-2xl text-sm leading-6 text-blue-100">
                    Work through the lessons in this course and build your
                    understanding one topic at a time.
                </p>

            </div>

            {/* Loading */}
            {loading && (
                <div className="flex min-h-[250px] items-center justify-center">

                    <div className="text-center">

                        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-blue-950" />

                        <p className="mt-4 text-sm text-gray-500">
                            Loading lessons...
                        </p>

                    </div>

                </div>
            )}

            {/* No Lessons */}
            {!loading && lessons.length === 0 && (
                <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-10 text-center">

                    <BookOpen
                        size={40}
                        className="mx-auto text-gray-400"
                    />

                    <h2 className="mt-4 text-lg font-bold text-gray-700">
                        No lessons available
                    </h2>

                    <p className="mt-2 text-sm text-gray-500">
                        Lessons for this course haven't been added yet.
                    </p>

                </div>
            )}

            {/* Lessons */}
            {!loading && lessons.length > 0 && (
                <div className="space-y-4">

                    {lessons.map((lesson) => (
                        <div
                            key={lesson._id}
                            className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-6"
                        >

                            <div className="flex items-center justify-between gap-4">

                                {/* Lesson Information */}
                                <div className="flex min-w-0 items-center gap-4">

                                    {/* Lesson Number */}
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-100 font-bold text-blue-950">
                                        {lesson.lessonNumber}
                                    </div>

                                    {/* Lesson Title */}
                                    <div className="min-w-0">

                                        <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                                            Lesson {lesson.lessonNumber}
                                        </p>

                                        <h2 className="mt-1 truncate text-base font-bold text-blue-950 sm:text-lg">
                                            {lesson.title}
                                        </h2>

                                    </div>

                                </div>

                                {/* Start Lesson */}
                                <NavLink
                                    to={`/lessons/${lesson._id}/topics`}
                                    className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-blue-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-800"
                                >

                                    <PlayCircle size={16} />

                                    <span className="hidden sm:inline">
                                        Start
                                    </span>

                                    <ArrowRight size={16} />

                                </NavLink>

                            </div>

                        </div>
                    ))}

                </div>
            )}

        </div>
    );
};

export default Lessons;