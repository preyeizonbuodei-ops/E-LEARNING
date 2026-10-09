
import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  GraduationCap,
  Search,
  BookMarked,
  Layers3,
  AlertCircle,
} from "lucide-react";

import LessonStore from "../../CourseStore/LessonStore";
import useTopicStore from "../../CourseStore/UserTopicStore";

const TopicPage = () => {
  const params = useParams();
  const navigate = useNavigate();

  // The route parameter should be lessonId.
  const LessonId = params.lessonId || params.LessonId;

  const [lesson, setLesson] = useState(null);
  const [topics, setTopics] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { getLesson } = LessonStore();
  const { getTopics } = useTopicStore();

  useEffect(() => {
    let cancelled = false;

    const fetchTopics = async () => {
      if (!LessonId) {
        setError("Lesson ID is missing from the route.");
        setTopics([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError("");

      // 1. Fetch topics belonging to this lesson.
      try {
        const topicResponse = await getTopics(LessonId);

        const topicData = topicResponse?.data ?? topicResponse;

        const topicList =
          topicData?.topics ??
          topicData?.data?.topics ??
          [];

        if (!cancelled) {
          setTopics(Array.isArray(topicList) ? topicList : []);
        }
      } catch (err) {
        console.error(
          "FAILED TO FETCH LESSON TOPICS:",
          err.response?.data || err
        );

        if (!cancelled) {
          setTopics([]);
          setError(
            err.response?.data?.message ||
              "Unable to load topics. Please try again."
          );
        }
      }

      // 2. Fetch lesson details separately.
      // A lesson-details error should not block successfully loaded topics.
      try {
        const lessonResponse = await getLesson(LessonId);

        const lessonData = lessonResponse?.data ?? lessonResponse;

        const lessonResult =
          lessonData?.lesson ??
          lessonData?.lessons ??
          null;

        const selectedLesson = Array.isArray(lessonResult)
          ? lessonResult[0]
          : lessonResult;

        if (!cancelled && selectedLesson) {
          setLesson(selectedLesson);
        }
      } catch (err) {
        console.error(
          "FAILED TO FETCH LESSON DETAILS:",
          err.response?.data || err
        );
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchTopics();

    return () => {
      cancelled = true;
    };
  }, [LessonId, getLesson, getTopics]);

  const filteredTopics = topics.filter((item) => {
    const search = searchTerm.toLowerCase();

    const title = item.title || "";
    const content = item.content || "";

    return (
      title.toLowerCase().includes(search) ||
      content.toLowerCase().replace(/<[^>]*>/g, " ").includes(search)
    );
  });

  const lessonTitle =
    lesson?.lessonTitle ||
    lesson?.title ||
    lesson?.name ||
    "Lesson Topics";

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-10 lg:py-10">
      <div className="mx-auto max-w-7xl">
        {/* Back navigation */}
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-blue-700"
        >
          <ArrowLeft size={18} />
          Back to Lessons
        </button>

        {/* Hero section */}
        <section className="relative mb-8 overflow-hidden rounded-3xl bg-gradient-to-br from-blue-950 via-blue-800 to-indigo-700 px-5 py-8 text-white shadow-lg sm:px-8 sm:py-10 lg:px-12">
          <div className="pointer-events-none absolute -right-12 -top-16 h-64 w-64 rounded-full border-[35px] border-white/10" />
          <div className="pointer-events-none absolute -bottom-24 right-24 h-56 w-56 rounded-full bg-cyan-400/10 blur-2xl" />

          <div className="relative z-10 max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold tracking-wide text-blue-100 sm:text-sm">
              <GraduationCap size={17} />
              YOUR LEARNING SPACE
            </div>

            <h1 className="break-words text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
              {lessonTitle}
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-blue-100 sm:text-base">
              Explore the topics in this lesson, strengthen your
              understanding, and learn at your own pace.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <div className="flex items-center gap-2 rounded-xl bg-white/10 px-4 py-3 backdrop-blur-sm">
                <Layers3 size={19} />
                <div>
                  <p className="text-lg font-bold">{topics.length}</p>
                  <p className="text-xs text-blue-100">
                    {topics.length === 1 ? "Topic" : "Topics"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 rounded-xl bg-white/10 px-4 py-3 backdrop-blur-sm">
                <BookOpen size={19} />
                <div>
                  <p className="text-sm font-bold">Learn</p>
                  <p className="text-xs text-blue-100">
                    One topic at a time
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Topic heading and search */}
        <section className="mb-6 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-blue-700">
              Lesson contents
            </p>

            <h2 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
              Explore Topics
            </h2>

            <p className="mt-2 text-sm text-slate-500 sm:text-base">
              Select a topic to open its teaching content and examples.
            </p>
          </div>

          <div className="relative w-full sm:max-w-xs lg:max-w-sm">
            <Search
              size={19}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search topics..."
              aria-label="Search topics"
              className="w-full rounded-2xl border border-slate-200 bg-white py-3.5 pl-11 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />
          </div>
        </section>

        {/* Loading state */}
        {loading && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="animate-pulse rounded-2xl border border-slate-200 bg-white p-6"
              >
                <div className="mb-5 h-12 w-12 rounded-xl bg-slate-200" />
                <div className="mb-3 h-5 w-3/4 rounded bg-slate-200" />
                <div className="mb-2 h-3 w-full rounded bg-slate-100" />
                <div className="h-3 w-2/3 rounded bg-slate-100" />
                <div className="mt-7 h-10 rounded-xl bg-slate-100" />
              </div>
            ))}
          </div>
        )}

        {/* Error state */}
        {!loading && error && (
          <div className="rounded-2xl border border-red-200 bg-white px-5 py-10 text-center">
            <AlertCircle
              size={36}
              className="mx-auto mb-3 text-red-500"
            />

            <h3 className="text-lg font-bold text-slate-900">
              Couldn't load this lesson
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
              {error}
            </p>

            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-5 rounded-xl bg-blue-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-800"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Topics grid */}
        {!loading && !error && filteredTopics.length > 0 && (
          <>
            <div className="mb-4 flex items-center justify-between gap-3">
              <p className="text-sm text-slate-500">
                Showing{" "}
                <span className="font-bold text-slate-800">
                  {filteredTopics.length}
                </span>{" "}
                {filteredTopics.length === 1 ? "topic" : "topics"}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filteredTopics.map((item, index) => (
                <article
                  key={item._id}
                  className="group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"
                >
                  <div className="h-1.5 bg-gradient-to-r from-blue-700 via-indigo-500 to-cyan-400" />

                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <div className="mb-5 flex items-start justify-between gap-3">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-700 transition group-hover:bg-blue-700 group-hover:text-white">
                        <BookMarked size={23} />
                      </div>

                      <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-600">
                        Topic {item.topicNumber ?? index + 1}
                      </span>
                    </div>

                    <h3 className="break-words text-lg font-bold leading-7 text-slate-900 transition group-hover:text-blue-700">
                      {item.title || "Untitled Topic"}
                    </h3>

                    <p className="mt-3 flex-1 break-words text-sm leading-7 text-slate-500">
                      {item.content
                        ? item.content
                            .replace(/<[^>]*>/g, " ")
                            .replace(/\s+/g, " ")
                            .trim()
                            .slice(0, 145) +
                          (item.content.length > 145 ? "..." : "")
                        : "Open this topic to explore its teaching content and worked examples."}
                    </p>

                    <div className="my-5 border-t border-slate-100" />

                    <Link
                      to={`/topics/${item._id}`}
                      className="flex items-center justify-between gap-3 rounded-xl bg-blue-50 px-4 py-3.5 text-sm font-bold text-blue-800 transition hover:bg-blue-700 hover:text-white"
                    >
                      <span>Start Learning</span>
                      <ArrowRight
                        size={18}
                        className="shrink-0 transition group-hover:translate-x-1"
                      />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </>
        )}

        {/* Empty state */}
        {!loading && !error && filteredTopics.length === 0 && (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-5 py-14 text-center sm:py-20">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
              {searchTerm ? (
                <Search size={30} />
              ) : (
                <BookOpen size={30} />
              )}
            </div>

            <h3 className="text-xl font-bold text-slate-900">
              {searchTerm
                ? "No matching topics"
                : "No topics available yet"}
            </h3>

            <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-slate-500">
              {searchTerm
                ? "Try another search term to find the topic you're looking for."
                : "Topics added by your administrator will appear here when they are available."}
            </p>

            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm("")}
                className="mt-5 rounded-xl bg-blue-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-800"
              >
                Clear Search
              </button>
            )}
          </div>
        )}

        {/* Footer */}
        {!loading && !error && topics.length > 0 && (
          <p className="mt-10 text-center text-xs leading-6 text-slate-400 sm:text-sm">
            Keep learning at your own pace. Every topic takes you one step
            further.
          </p>
        )}
      </div>
    </main>
  );
};

export default TopicPage;
