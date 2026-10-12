
import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
    ArrowRight,
    BookOpenText,
    GraduationCap,
    Layers3,
    Sparkles,
} from "lucide-react";
import { useUserMajorAreaTopicStore } from "../DashBoards/UserDashboard/DepartmentStore/UserMajorTopicStore";

const TopicArea = () => {
    const { areaId } = useParams();

    const {
        majorAreaTopics,
        loading,
        error,
        getAllMajorAreaTopics,
    } = useUserMajorAreaTopicStore();

    useEffect(() => {
        getAllMajorAreaTopics().catch(() => {});
    }, [getAllMajorAreaTopics]);

    const topics = majorAreaTopics.filter((topic) => {
        const topicMajorAreaId =
            typeof topic.majorArea === "object"
                ? topic.majorArea?._id
                : topic.majorArea;

        return topicMajorAreaId === areaId;
    });

    const areaName =
        typeof majorAreaTopics.find((topic) => {
            const topicMajorAreaId =
                typeof topic.majorArea === "object"
                    ? topic.majorArea?._id
                    : topic.majorArea;

            return topicMajorAreaId === areaId;
        })?.majorArea === "object"
            ? majorAreaTopics.find((topic) => {
                  const topicMajorAreaId =
                      typeof topic.majorArea === "object"
                          ? topic.majorArea?._id
                          : topic.majorArea;

                  return topicMajorAreaId === areaId;
              })?.majorArea?.name
            : "Explore Major Area";

    return (
        <section className="pb-16">
            {/* Hero Section */}
            <div className="relative mx-3 mt-6 overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-900 px-6 py-12 text-white shadow-xl sm:mx-6 sm:px-10 md:py-16 lg:mx-23 lg:px-14">
                {/* Decorative elements */}
                <div className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full border border-white/10" />
                <div className="pointer-events-none absolute -right-6 -top-10 h-44 w-44 rounded-full border border-cyan-300/20" />
                <div className="pointer-events-none absolute -bottom-24 right-1/4 h-56 w-56 rounded-full bg-blue-500/10 blur-3xl" />

                <div className="relative z-10 max-w-3xl">
                    <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-white/10 px-4 py-2 text-sm font-medium text-cyan-200 backdrop-blur-sm">
                        <Sparkles className="size-4" />
                        StudStore
                    </div>

                    <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl">
                        {areaName}
                    </h1>

                    <p className="mt-5 max-w-2xl text-sm leading-7 text-blue-100 sm:text-base md:text-lg">
                        Explore concepts, understand essential principles,
                        and build your engineering knowledge one topic at a
                        time.
                    </p>

                    <div className="mt-8 flex flex-wrap gap-3">
                        <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur-sm">
                            <BookOpenText className="size-5 text-cyan-300" />
                            <span className="text-sm font-medium">
                                {topics.length}{" "}
                                {topics.length === 1 ? "Topic" : "Topics"}
                            </span>
                        </div>

                        <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur-sm">
                            <GraduationCap className="size-5 text-cyan-300" />
                            <span className="text-sm font-medium">
                                Learn at your pace
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Topics Section */}
            <div className="mx-3 mt-12 sm:mx-6 lg:mx-23">
                <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                    <div>
                        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
                            Your learning path
                        </p>

                        <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                            Explore Topics
                        </h2>

                        <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
                            Choose a topic to study its content, examples,
                            videos, and learning materials.
                        </p>
                    </div>

                    <Link
                        to={`/major-areas/${areaId}/topics`}
                        className="inline-flex w-fit items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                    >
                        See all topics
                        <ArrowRight className="size-4" />
                    </Link>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        {[1, 2, 3, 4].map((item) => (
                            <div
                                key={item}
                                className="h-56 animate-pulse rounded-2xl border border-slate-100 bg-slate-100"
                            />
                        ))}
                    </div>
                ) : error ? (
                    <div className="rounded-2xl border border-red-100 bg-red-50 p-6 text-sm text-red-600">
                        {error}
                    </div>
                ) : topics.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center">
                        <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
                            <Layers3 className="size-7" />
                        </div>

                        <h3 className="mt-4 text-lg font-semibold text-slate-800">
                            No topics available yet
                        </h3>

                        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                            Topics for this major area will appear here once
                            they have been added.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        {topics.slice(0, 4).map((topic, index) => (
                            <article
                                key={topic._id}
                                className="group relative flex min-h-60 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"
                            >
                                <div className="absolute right-0 top-0 h-24 w-24 rounded-bl-full bg-blue-50 transition group-hover:bg-blue-100" />

                                <div className="relative z-10 flex items-start justify-between">
                                    <div className="flex size-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
                                        <BookOpenText className="size-6" />
                                    </div>

                                    <span className="text-sm font-semibold tracking-wider text-slate-300">
                                        {String(index + 1).padStart(2, "0")}
                                    </span>
                                </div>

                                <div className="relative z-10 mt-6 flex-1">
                                    <h3 className="text-lg font-bold leading-snug text-slate-900 transition group-hover:text-blue-700">
                                        {topic.title}
                                    </h3>

                                    <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-500">
                                        {topic.description}
                                    </p>
                                </div>

                                <Link
                                    to={`/major-area-topics/${topic._id}`}
                                    className="relative z-10 mt-6 inline-flex w-fit items-center gap-2 text-sm font-semibold text-blue-600 transition group-hover:gap-3"
                                >
                                    Start learning
                                    <ArrowRight className="size-4" />
                                </Link>
                            </article>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default TopicArea;
