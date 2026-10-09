import { useEffect, useState } from "react";
import useCourseStore from "../../CourseStore/GetCourseStore";
import { NavLink } from "react-router-dom";
import {
    ArrowRight,
    BookOpen,
    GraduationCap
} from "lucide-react";

const UserProgressArea = () => {
    const [semesterCourses, setSemesterCourses] = useState([]);
    const [generalCourses, setGeneralCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    const { getCourses } = useCourseStore();

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                setLoading(true);

                const userCourse = await getCourses();

                console.log("USER COURSES:", userCourse);

                setSemesterCourses(
                    userCourse.semesterCourses || []
                );

                setGeneralCourses(
                    userCourse.generalCourses || []
                );
            } catch (error) {
                console.log(
                    "ERROR GETTING COURSES:",
                    error
                );
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, [getCourses]);

    // Separate first and second semester courses
    const firstSemesterCourses = semesterCourses.filter(
        (course) => course.semester === "first"
    );

    const secondSemesterCourses = semesterCourses.filter(
        (course) => course.semester === "second"
    );

    // Only display 3 courses on dashboard
    const displayedFirstSemesterCourses =
        firstSemesterCourses.slice(0, 3);

    const displayedSecondSemesterCourses =
        secondSemesterCourses.slice(0, 3);

    const displayedGeneralCourses =
        generalCourses.slice(0, 3);

    /*
        Course Card Themes
    */

    const courseThemes = [
        {
            border: "border-blue-500",
            background: "bg-blue-50/60",
            code: "bg-blue-100 text-blue-700",
            icon: "text-blue-600",
            title: "text-blue-950",
            info: "bg-blue-100 text-blue-700",
            button: "bg-blue-950 hover:bg-blue-800"
        },
        {
            border: "border-purple-500",
            background: "bg-purple-50/60",
            code: "bg-purple-100 text-purple-700",
            icon: "text-purple-600",
            title: "text-purple-950",
            info: "bg-purple-100 text-purple-700",
            button: "bg-purple-700 hover:bg-purple-800"
        },
        {
            border: "border-emerald-500",
            background: "bg-emerald-50/60",
            code: "bg-emerald-100 text-emerald-700",
            icon: "text-emerald-600",
            title: "text-emerald-950",
            info: "bg-emerald-100 text-emerald-700",
            button: "bg-emerald-700 hover:bg-emerald-800"
        },
        {
            border: "border-orange-500",
            background: "bg-orange-50/60",
            code: "bg-orange-100 text-orange-700",
            icon: "text-orange-600",
            title: "text-orange-950",
            info: "bg-orange-100 text-orange-700",
            button: "bg-orange-600 hover:bg-orange-700"
        },
        {
            border: "border-rose-500",
            background: "bg-rose-50/60",
            code: "bg-rose-100 text-rose-700",
            icon: "text-rose-600",
            title: "text-rose-950",
            info: "bg-rose-100 text-rose-700",
            button: "bg-rose-700 hover:bg-rose-800"
        },
        {
            border: "border-cyan-500",
            background: "bg-cyan-50/60",
            code: "bg-cyan-100 text-cyan-700",
            icon: "text-cyan-600",
            title: "text-cyan-950",
            info: "bg-cyan-100 text-cyan-700",
            button: "bg-cyan-700 hover:bg-cyan-800"
        }
    ];

    /*
        Reusable Course Card
    */

    const CourseCard = ({
        course,
        semester,
        general = false,
        index = 0
    }) => {
        const theme =
            courseThemes[index % courseThemes.length];

        return (
            <div
                className={`
                    group
                    flex
                    min-h-[210px]
                    flex-col
                    justify-between
                    rounded-2xl
                    border-2
                    ${theme.border}
                    ${theme.background}
                    p-3
                    shadow-sm
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:shadow-xl
                    sm:p-4
                `}
            >
                <div>
                    {/* Top row */}
                    <div
                        className="
                            flex
                            items-start
                            justify-between
                            gap-3
                        "
                    >
                        <span
                            className={`
                                rounded-full
                                px-3
                                py-1
                                text-xs
                                font-bold
                                tracking-wide
                                ${theme.code}
                            `}
                        >
                            {course.courseCode}
                        </span>

                        <BookOpen
                            size={20}
                            className={`
                                shrink-0
                                ${theme.icon}
                                transition-transform
                                duration-300
                                group-hover:scale-110
                            `}
                        />
                    </div>

                    {/* Course title */}
                    <h2
                        className={`
                            mt-5
                            text-lg
                            font-bold
                            leading-7
                            ${theme.title}
                            sm:text-xl
                        `}
                    >
                        {course.courseTitle}
                    </h2>

                    {/* Description */}
                    {course.description && (
                        <p
                            className="
                                mt-3
                                line-clamp-2
                                text-sm
                                leading-6
                                text-gray-600
                            "
                        >
                            {course.description}
                        </p>
                    )}

                    {/* Course information */}
                    <div
                        className="
                            mt-5
                            flex
                            flex-wrap
                            gap-2
                        "
                    >
                        {general ? (
                            <span
                                className={`
                                    rounded-lg
                                    px-3
                                    py-1.5
                                    text-xs
                                    font-medium
                                    ${theme.info}
                                `}
                            >
                                General Course
                            </span>
                        ) : (
                            <>
                                <span
                                    className={`
                                        inline-flex
                                        items-center
                                        gap-1.5
                                        rounded-lg
                                        px-3
                                        py-1.5
                                        text-xs
                                        font-medium
                                        ${theme.info}
                                    `}
                                >
                                    <GraduationCap size={14} />
                                    Level {course.level}
                                </span>

                                <span
                                    className={`
                                        rounded-lg
                                        px-3
                                        py-1.5
                                        text-xs
                                        font-medium
                                        capitalize
                                        ${theme.info}
                                    `}
                                >
                                    {semester}
                                </span>

                                {course.courseScope && (
                                    <span
                                        className={`
                                            rounded-lg
                                            px-3
                                            py-1.5
                                            text-xs
                                            font-medium
                                            capitalize
                                            ${theme.info}
                                        `}
                                    >
                                        {course.courseScope === "shared"
                                            ? "Shared"
                                            : "Department"}
                                    </span>
                                )}
                            </>
                        )}
                    </div>
                </div>

                {/* Take Lessons button */}
                <NavLink
                    to={`/courses/${course._id}/lesson`}
                    className={`
                        mt-6
                        flex
                        w-full
                        items-center
                        justify-between
                        rounded-xl
                        px-4
                        py-3
                        text-sm
                        font-semibold
                        text-white
                        transition-all
                        duration-300
                        ${theme.button}
                    `}
                >
                    <span>Take Lessons</span>

                    <ArrowRight
                        size={18}
                        className="
                            transition-transform
                            duration-300
                            group-hover:translate-x-1
                        "
                    />
                </NavLink>
            </div>
        );
    };

    return (
        <div className="w-full p-4 sm:p-6 lg:p-8">

            {/* Loading */}
            {loading ? (
                <div
                    className="
                        flex
                        min-h-[300px]
                        items-center
                        justify-center
                    "
                >
                    <div className="text-center">
                        <div
                            className="
                                mx-auto
                                h-10
                                w-10
                                animate-spin
                                rounded-full
                                border-4
                                border-gray-200
                                border-t-blue-950
                            "
                        />

                        <p
                            className="
                                mt-4
                                text-sm
                                text-gray-500
                            "
                        >
                            Loading courses...
                        </p>
                    </div>
                </div>
            ) : (
                <>
                    {/* FIRST SEMESTER */}
                    <section className="mb-10">
                        <div
                            className="
                                mb-5
                                flex
                                flex-col
                                gap-3
                                sm:flex-row
                                sm:items-center
                                sm:justify-between
                            "
                        >
                            <div>
                                <h1
                                    className="
                                        text-xl
                                        font-bold
                                        text-blue-950
                                        sm:text-2xl
                                    "
                                >
                                    First Semester Courses
                                </h1>

                                <p
                                    className="
                                        mt-1
                                        text-sm
                                        text-gray-500
                                    "
                                >
                                    Your available first semester courses.
                                </p>
                            </div>

                            {firstSemesterCourses.length > 3 && (
                                <NavLink
                                    to="/me/courses"
                                    className="
                                        flex
                                        w-fit
                                        items-center
                                        gap-1
                                        text-sm
                                        font-semibold
                                        text-blue-600
                                        transition-colors
                                        hover:text-amber-500
                                    "
                                >
                                    See More
                                    <ArrowRight size={18} />
                                </NavLink>
                            )}
                        </div>

                        {firstSemesterCourses.length === 0 ? (
                            <p
                                className="
                                    rounded-2xl
                                    border
                                    border-dashed
                                    border-gray-200
                                    bg-gray-50
                                    p-8
                                    text-center
                                    text-sm
                                    text-gray-500
                                "
                            >
                                No first semester courses available.
                            </p>
                        ) : (
                            <div
                                className="
                                    grid
                                    grid-cols-1
                                    gap-5
                                    sm:grid-cols-2
                                    lg:grid-cols-3
                                "
                            >
                                {displayedFirstSemesterCourses.map(
                                    (course, index) => (
                                        <CourseCard
                                            key={course._id}
                                            course={course}
                                            semester="First Semester"
                                            index={index}
                                        />
                                    )
                                )}
                            </div>
                        )}
                    </section>

                    {/* SECOND SEMESTER */}
                    <section className="mb-10">
                        <div
                            className="
                                mb-5
                                flex
                                flex-col
                                gap-3
                                sm:flex-row
                                sm:items-center
                                sm:justify-between
                            "
                        >
                            <div>
                                <h1
                                    className="
                                        text-xl
                                        font-bold
                                        text-blue-950
                                        sm:text-2xl
                                    "
                                >
                                    Second Semester Courses
                                </h1>

                                <p
                                    className="
                                        mt-1
                                        text-sm
                                        text-gray-500
                                    "
                                >
                                    Your available second semester courses.
                                </p>
                            </div>

                            {secondSemesterCourses.length > 3 && (
                                <NavLink
                                    to="/me/courses"
                                    className="
                                        flex
                                        w-fit
                                        items-center
                                        gap-1
                                        text-sm
                                        font-semibold
                                        text-blue-600
                                        transition-colors
                                        hover:text-amber-500
                                    "
                                >
                                    See More
                                    <ArrowRight size={18} />
                                </NavLink>
                            )}
                        </div>

                        {secondSemesterCourses.length === 0 ? (
                            <p
                                className="
                                    rounded-2xl
                                    border
                                    border-dashed
                                    border-gray-200
                                    bg-gray-50
                                    p-8
                                    text-center
                                    text-sm
                                    text-gray-500
                                "
                            >
                                No second semester courses available.
                            </p>
                        ) : (
                            <div
                                className="
                                    grid
                                    grid-cols-1
                                    gap-5
                                    sm:grid-cols-2
                                    lg:grid-cols-3
                                "
                            >
                                {displayedSecondSemesterCourses.map(
                                    (course, index) => (
                                        <CourseCard
                                            key={course._id}
                                            course={course}
                                            semester="Second Semester"
                                            index={index}
                                        />
                                    )
                                )}
                            </div>
                        )}
                    </section>

                    {/* GENERAL COURSES */}
                    <section className="mb-10">
                        <div
                            className="
                                mb-5
                                flex
                                flex-col
                                gap-3
                                sm:flex-row
                                sm:items-center
                                sm:justify-between
                            "
                        >
                            <div>
                                <h1
                                    className="
                                        text-xl
                                        font-bold
                                        text-blue-950
                                        sm:text-2xl
                                    "
                                >
                                    General Courses
                                </h1>

                                <p
                                    className="
                                        mt-1
                                        text-sm
                                        text-gray-500
                                    "
                                >
                                    Courses available to all students.
                                </p>
                            </div>

                            {generalCourses.length > 3 && (
                                <NavLink
                                    to="/me/courses"
                                    className="
                                        flex
                                        w-fit
                                        items-center
                                        gap-1
                                        text-sm
                                        font-semibold
                                        text-blue-600
                                        transition-colors
                                        hover:text-amber-500
                                    "
                                >
                                    See More
                                    <ArrowRight size={18} />
                                </NavLink>
                            )}
                        </div>

                        {generalCourses.length === 0 ? (
                            <p
                                className="
                                    rounded-2xl
                                    border
                                    border-dashed
                                    border-gray-200
                                    bg-gray-50
                                    p-8
                                    text-center
                                    text-sm
                                    text-gray-500
                                "
                            >
                                No general courses available.
                            </p>
                        ) : (
                            <div
                                className="
                                    grid
                                    grid-cols-1
                                    gap-5
                                    sm:grid-cols-2
                                    lg:grid-cols-3
                                "
                            >
                                {displayedGeneralCourses.map(
                                    (course, index) => (
                                        <CourseCard
                                            key={course._id}
                                            course={course}
                                            general={true}
                                            index={index}
                                        />
                                    )
                                )}
                            </div>
                        )}
                    </section>
                </>
            )}
        </div>
    );
};

export default UserProgressArea;