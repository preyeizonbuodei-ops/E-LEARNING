
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
    ArrowLeft,
    BookOpenText,
    BookText,
    CheckCircle2,
    ExternalLink,
    FileText,
    GraduationCap,
    PlayCircle,
} from "lucide-react";
import { useUserMajorAreaTopicStore } from "../DashBoards/UserDashboard/DepartmentStore/UserMajorTopicStore";

const MajorAreaTopicDetails = () => {
    const { majorTopicId } = useParams();

    const {
        majorAreaTopic,
        loading,
        error,
        getMajorAreaTopicById,
    } = useUserMajorAreaTopicStore();

    const [activeTab, setActiveTab] = useState("content");

    useEffect(() => {
        getMajorAreaTopicById(majorTopicId).catch(() => {});
    }, [majorTopicId, getMajorAreaTopicById]);

    const tabs = [
        { id: "content", label: "Content", icon: BookOpenText },
        { id: "examples", label: "Examples", icon: BookText },
        { id: "videos", label: "Videos", icon: PlayCircle },
        { id: "materials", label: "Materials", icon: FileText },
    ];

    if (loading) {
        return (
            <div className="flex min-h-64 items-center justify-center">
                <p className="animate-pulse text-blue-600">
                    Loading topic...
                </p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="mx-auto mt-10 max-w-2xl rounded-2xl border border-red-200 bg-red-50 p-6 text-center text-red-600">
                {error}
            </div>
        );
    }

    if (!majorAreaTopic) {
        return (
            <div className="mx-auto mt-10 max-w-2xl p-6 text-center">
                <h2 className="text-xl font-bold text-slate-800">
                    Topic not found
                </h2>
                <p className="mt-2 text-slate-500">
                    This topic may have been removed or is unavailable.
                </p>
                <Link
                    to="/"
                    className="mt-5 inline-flex items-center gap-2 text-blue-600"
                >
                    <ArrowLeft className="size-4" />
                    Back to home
                </Link>
            </div>
        );
    }

    const videos = majorAreaTopic.videos || [];
    const materials = majorAreaTopic.materials || [];

    return (
        <div className="min-h-screen bg-slate-50 pb-16">
            {/* Hero */}
            <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-900 px-5 py-12 text-white sm:px-10 md:py-16">
                <div className="pointer-events-none absolute -right-16 -top-16 size-64 rounded-full border border-white/10" />
                <div className="pointer-events-none absolute -right-5 -top-5 size-44 rounded-full border border-cyan-300/20" />

                <div className="relative mx-auto max-w-6xl">
                    <Link
                        to={-1}
                        className="mb-8 inline-flex items-center gap-2 text-sm text-blue-200 transition hover:text-white"
                    >
                        <ArrowLeft className="size-4" />
                        Back
                    </Link>

                    <div className="mb-4 flex items-center gap-2 text-sm font-medium text-cyan-300">
                        <GraduationCap className="size-5" />
                        Major Area Learning
                    </div>

                    <h1 className="max-w-3xl text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
                        {majorAreaTopic.title}
                    </h1>

                    <p className="mt-5 max-w-2xl text-sm leading-7 text-blue-100 sm:text-base">
                        {majorAreaTopic.description}
                    </p>

                    <div className="mt-7 flex flex-wrap gap-3 text-sm">
                        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2">
                            <BookOpenText className="size-4 text-cyan-300" />
                            Study material
                        </span>

                        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2">
                            <PlayCircle className="size-4 text-cyan-300" />
                            {videos.length} videos
                        </span>

                        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2">
                            <FileText className="size-4 text-cyan-300" />
                            {materials.length} materials
                        </span>
                    </div>
                </div>
            </section>

            {/* Topic content */}
            <main className="mx-auto max-w-6xl px-4 pt-8 sm:px-6 lg:px-8">
                {/* Tabs */}
                <div className="mb-8 overflow-x-auto rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">
                    <div className="flex min-w-max gap-2">
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            const isActive = activeTab === tab.id;

                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`inline-flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                                        isActive
                                            ? "bg-blue-600 text-white shadow-md"
                                            : "text-slate-600 hover:bg-slate-100"
                                    }`}
                                >
                                    <Icon className="size-4" />
                                    {tab.label}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Content panel */}
                <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
                    {activeTab === "content" && (
                        <div>
                            <div className="mb-6 flex items-center gap-3">
                                <div className="flex size-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                                    <BookOpenText className="size-6" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-slate-900">
                                        Topic Content
                                    </h2>
                                    <p className="text-sm text-slate-500">
                                        Learn the key concepts
                                    </p>
                                </div>
                            </div>

                            <div className="whitespace-pre-wrap break-words text-sm leading-8 text-slate-700 sm:text-base">
                                {majorAreaTopic.content || "No content available yet."}
                            </div>
                        </div>
                    )}

                    {activeTab === "examples" && (
                        <div>
                            <div className="mb-6 flex items-center gap-3">
                                <div className="flex size-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                                    <BookText className="size-6" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-slate-900">
                                        Examples
                                    </h2>
                                    <p className="text-sm text-slate-500">
                                        Apply what you have learned
                                    </p>
                                </div>
                            </div>

                            <div className="whitespace-pre-wrap break-words text-sm leading-8 text-slate-700 sm:text-base">
                                {majorAreaTopic.examples?.trim()
                                    ? majorAreaTopic.examples
                                    : "No examples available for this topic yet."}
                            </div>
                        </div>
                    )}

                    {activeTab === "videos" && (
                        <div>
                            <div className="mb-6">
                                <h2 className="text-xl font-bold text-slate-900">
                                    Video Resources
                                </h2>
                                <p className="mt-1 text-sm text-slate-500">
                                    Watch videos to strengthen your understanding.
                                </p>
                            </div>

                            {videos.length === 0 ? (
                                <p className="rounded-xl bg-slate-50 p-6 text-sm text-slate-500">
                                    No videos available yet.
                                </p>
                            ) : (
                                <div className="grid gap-4 sm:grid-cols-2">
                                    {videos.map((video, index) => (
                                        <article
                                            key={`${video.url}-${index}`}
                                            className="rounded-xl border border-slate-200 p-5 transition hover:border-blue-200 hover:shadow-md"
                                        >
                                            <div className="flex items-start gap-3">
                                                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
                                                    <PlayCircle className="size-6" />
                                                </div>

                                                <div className="min-w-0 flex-1">
                                                    <h3 className="break-words font-semibold text-slate-800">
                                                        {video.title || `Video ${index + 1}`}
                                                    </h3>

                                                    <a
                                                        href={video.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-800"
                                                    >
                                                        Watch video
                                                        <ExternalLink className="size-4" />
                                                    </a>
                                                </div>
                                            </div>
                                        </article>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === "materials" && (
                        <div>
                            <div className="mb-6">
                                <h2 className="text-xl font-bold text-slate-900">
                                    Study Materials
                                </h2>
                                <p className="mt-1 text-sm text-slate-500">
                                    Open additional notes and learning resources.
                                </p>
                            </div>

                            {materials.length === 0 ? (
                                <p className="rounded-xl bg-slate-50 p-6 text-sm text-slate-500">
                                    No materials available yet.
                                </p>
                            ) : (
                                <div className="space-y-3">
                                    {materials.map((material, index) => (
                                        <article
                                            key={`${material.url}-${index}`}
                                            className="flex flex-col justify-between gap-4 rounded-xl border border-slate-200 p-4 transition hover:border-blue-200 hover:bg-blue-50/40 sm:flex-row sm:items-center"
                                        >
                                            <div className="flex min-w-0 items-center gap-3">
                                                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                                                    <FileText className="size-6" />
                                                </div>

                                                <div className="min-w-0">
                                                    <h3 className="break-words font-semibold text-slate-800">
                                                        {material.title || `Material ${index + 1}`}
                                                    </h3>
                                                    <p className="mt-1 text-xs text-slate-500">
                                                        Learning resource
                                                    </p>
                                                </div>
                                            </div>

                                            <a
                                                href={material.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                                            >
                                                Open material
                                                <ExternalLink className="size-4" />
                                            </a>
                                        </article>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </section>

                {/* Completion note */}
                <div className="mt-6 flex items-start gap-3 rounded-xl border border-emerald-100 bg-emerald-50 p-4">
                    <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-emerald-600" />
                    <p className="text-sm leading-6 text-emerald-800">
                        Study the content, review the examples, and explore the
                        available resources at your own pace.
                    </p>
                </div>
            </main>
        </div>
    );
};

export default MajorAreaTopicDetails;
