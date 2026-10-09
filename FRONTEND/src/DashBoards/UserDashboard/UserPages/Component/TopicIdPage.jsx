
import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
    ArrowLeft,
    ArrowRight,
    BookOpen,
    BookText,
    CheckCircle2,
    CircleAlert,
    Clock3,
    ExternalLink,
    FileText,
    GraduationCap,
    Lightbulb,
    LoaderCircle,
    PlayCircle,
    Video,
    BookMarked,
    Layers3,
    RefreshCw,
    Target,
} from "lucide-react";

import useTopicStore from "../../CourseStore/UserTopicStore";

// --------------------------------------------------
// HELPER FUNCTIONS
// --------------------------------------------------

function getText(value, fallback = "") {
    if (typeof value === "string") {
        return value;
    }

    if (typeof value === "number") {
        return String(value);
    }

    return fallback;
}

function getResourceTitle(resource, fallback = "Resource") {
    if (typeof resource === "string") {
        return resource;
    }

    return (
        resource?.title ||
        resource?.name ||
        resource?.label ||
        fallback
    );
}

function getResourceUrl(resource) {
    if (typeof resource === "string") {
        return resource;
    }

    return (
        resource?.url ||
        resource?.link ||
        resource?.videoUrl ||
        resource?.fileUrl ||
        ""
    );
}

function getYouTubeEmbedUrl(url) {
    if (!url) return "";

    try {
        const parsedUrl = new URL(url);
        const hostname = parsedUrl.hostname.replace(/^www\./, "");

        if (hostname === "youtu.be") {
            const videoId = parsedUrl.pathname.slice(1);

            return videoId
                ? `https://www.youtube.com/embed/${videoId}`
                : "";
        }

        if (
            hostname === "youtube.com" ||
            hostname === "m.youtube.com" ||
            hostname === "youtube-nocookie.com"
        ) {
            if (parsedUrl.pathname === "/watch") {
                const videoId = parsedUrl.searchParams.get("v");

                return videoId
                    ? `https://www.youtube.com/embed/${videoId}`
                    : "";
            }

            if (parsedUrl.pathname.startsWith("/embed/")) {
                return url;
            }

            if (parsedUrl.pathname.startsWith("/shorts/")) {
                const videoId = parsedUrl.pathname.split("/")[2];

                return videoId
                    ? `https://www.youtube.com/embed/${videoId}`
                    : "";
            }
        }

        return "";
    } catch {
        return "";
    }
}

// --------------------------------------------------
// RESOURCE CARD
// --------------------------------------------------

function ResourceCard({
    resource,
    index,
    type,
    onSave,
}) {
    const title = getResourceTitle(
        resource,
        type === "video" ? "Video resource" : "Study material"
    );

    const url = getResourceUrl(resource);
    const embedUrl =
        type === "video" ? getYouTubeEmbedUrl(url) : "";

    return (
        <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md">
            {type === "video" && embedUrl && (
                <div className="aspect-video w-full bg-slate-950">
                    <iframe
                        src={embedUrl}
                        title={title}
                        className="h-full w-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        loading="lazy"
                    />
                </div>
            )}

            <div className="p-5">
                <div className="flex items-start gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                        {type === "video" ? (
                            <Video size={21} />
                        ) : (
                            <FileText size={21} />
                        )}
                    </div>

                    <div className="min-w-0 flex-1">
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                            {type === "video"
                                ? `Video ${index + 1}`
                                : `Material ${index + 1}`}
                        </p>

                        <h3 className="mt-1 break-words font-semibold text-slate-900">
                            {title}
                        </h3>

                        {url && (
                            <p className="mt-2 break-all text-xs text-slate-500">
                                {url}
                            </p>
                        )}
                    </div>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-2">
                    {url && (
                        <a
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-lg bg-blue-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-800"
                        >
                            {type === "video" ? (
                                <PlayCircle size={16} />
                            ) : (
                                <ExternalLink size={16} />
                            )}

                            {type === "video"
                                ? "Watch Video"
                                : "Open Material"}
                        </a>
                    )}

                    {type === "material" && url && (
                        <button
                            type="button"
                            onClick={() => onSave?.(resource)}
                            className="inline-flex items-center gap-2 rounded-lg border border-blue-200 px-4 py-2 text-sm font-semibold text-blue-700 transition hover:bg-blue-50"
                        >
                            <BookMarked size={16} />
                            Save Material
                        </button>
                    )}
                </div>

                {!url && (
                    <p className="mt-3 text-sm text-amber-700">
                        A link has not been added to this resource yet.
                    </p>
                )}
            </div>
        </article>
    );
}

// --------------------------------------------------
// CONTENT BLOCK
// --------------------------------------------------

function ContentBlock({ content }) {
    const text = getText(content);

    if (!text.trim()) {
        return (
            <div className="rounded-xl border border-dashed border-slate-300 p-6 text-sm text-slate-500">
                No teaching content has been added to this topic yet.
            </div>
        );
    }

    // The content is currently displayed as readable plain text.
    // Markdown rendering can be added separately when needed.
    return (
        <div className="whitespace-pre-wrap break-words text-sm leading-7 text-slate-700 sm:text-base">
            {text}
        </div>
    );
}

// --------------------------------------------------
// EXAMPLE CARD
// --------------------------------------------------

function ExampleCard({ example, index }) {
    const title =
        typeof example === "object" && example !== null
            ? example.title ||
              example.question ||
              `Worked Example ${index + 1}`
            : `Worked Example ${index + 1}`;

    const question =
        typeof example === "object" && example !== null
            ? example.question || example.problem || ""
            : example;

    const solution =
        typeof example === "object" && example !== null
            ? example.solution ||
              example.answer ||
              example.explanation ||
              ""
            : "";

    return (
        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-700">
                    <Lightbulb size={20} />
                </div>

                <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-amber-700">
                        Worked Example {index + 1}
                    </p>

                    <h3 className="mt-1 font-semibold text-slate-900">
                        {getText(title)}
                    </h3>
                </div>
            </div>

            {question && (
                <div className="mb-4">
                    <p className="mb-2 text-sm font-semibold text-slate-800">
                        Question
                    </p>

                    <ContentBlock content={question} />
                </div>
            )}

            {solution && (
                <div className="rounded-xl bg-slate-50 p-4">
                    <p className="mb-2 text-sm font-semibold text-slate-800">
                        Solution
                    </p>

                    <ContentBlock content={solution} />
                </div>
            )}
        </article>
    );
}

// --------------------------------------------------
// MAIN TOPIC DETAILS PAGE
// --------------------------------------------------

export default function TopicDetails() {
    const { topicId } = useParams();

    const getTopicById = useTopicStore(
        (state) => state.getTopicById
    );

    const [topic, setTopic] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [activeTab, setActiveTab] = useState("content");
    const [saveNotice, setSaveNotice] = useState("");

    // Fetch the selected topic.
    useEffect(() => {
        let cancelled = false;

        async function fetchTopic() {
            setLoading(true);
            setError("");
            setTopic(null);
            setSaveNotice("");

            try {
                const response = await getTopicById(topicId);

                const fetchedTopic =
                    response?.topic ||
                    response?.data?.topic;

                if (!fetchedTopic) {
                    throw new Error(
                        response?.message ||
                        "The topic could not be found."
                    );
                }

                if (!cancelled) {
                    setTopic(fetchedTopic);
                }
            } catch (err) {
                console.error("FAILED TO LOAD TOPIC:", err);

                if (!cancelled) {
                    setError(
                        err?.response?.data?.message ||
                        err?.message ||
                        "Couldn't load this topic. Please try again."
                    );
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        }

        if (topicId) {
            fetchTopic();
        } else {
            setError("Topic ID is missing.");
            setLoading(false);
        }

        return () => {
            cancelled = true;
        };
    }, [topicId, getTopicById]);

    // Teaching content.
    const content =
        topic?.content ||
        topic?.teachingContent ||
        topic?.body ||
        "";

    // Examples can be either a string or an array.
    // Your current database stores examples as a string.
    const examples =
        topic?.workedExamples ||
        topic?.examples ||
        topic?.workedExample ||
        "";

    // Normalize videos into an array.
    const videos = useMemo(() => {
        const value =
            topic?.videos ||
            topic?.videoResources ||
            [];

        return Array.isArray(value) ? value : [value];
    }, [topic]);

    // Combine all supported study-material fields.
    // Your current database uses "materials" and "resources".
    const materials = useMemo(() => {
        const normalize = (value) => {
            if (!value) return [];

            return Array.isArray(value)
                ? value
                : [value];
        };

        return [
            ...normalize(topic?.materials),
            ...normalize(topic?.studyMaterials),
            ...normalize(topic?.externalMaterials),
            ...normalize(topic?.resources),
        ];
    }, [topic]);

    // Save button placeholder.
    // This does not persist the material to the database yet.
    const handleSaveMaterial = (material) => {
        const title = getResourceTitle(
            material,
            "Study material"
        );

        setSaveNotice(
            `"${title}" cannot be saved permanently yet. The saved-materials feature will be connected to your account next.`
        );
    };

    const tabs = [
        {
            id: "content",
            label: "Teaching Content",
            icon: BookOpen,
        },
        {
            id: "examples",
            label: "Worked Examples",
            icon: BookText,
        },
        {
            id: "videos",
            label: "Videos",
            icon: Video,
        },
        {
            id: "materials",
            label: "Study Materials",
            icon: FileText,
        },
    ];

    const exampleCount = Array.isArray(examples)
        ? examples.length
        : typeof examples === "string" && examples.trim()
          ? 1
          : 0;

    const counts = {
        content: content ? 1 : 0,
        examples: exampleCount,
        videos: videos.filter(Boolean).length,
        materials: materials.filter(Boolean).length,
    };

    // --------------------------------------------------
    // LOADING STATE
    // --------------------------------------------------

    if (loading) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <div className="text-center">
                    <LoaderCircle
                        size={38}
                        className="mx-auto animate-spin text-blue-700"
                    />

                    <p className="mt-4 text-sm font-medium text-slate-600">
                        Loading topic content...
                    </p>
                </div>
            </div>
        );
    }

    // --------------------------------------------------
    // ERROR STATE
    // --------------------------------------------------

    if (error) {
        return (
            <div className="mx-auto max-w-3xl p-6">
                <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
                    <div className="flex items-start gap-3">
                        <CircleAlert
                            size={24}
                            className="shrink-0 text-red-600"
                        />

                        <div>
                            <h2 className="font-bold text-red-900">
                                Unable to load topic
                            </h2>

                            <p className="mt-2 text-sm text-red-800">
                                {error}
                            </p>
                        </div>
                    </div>

                    <div className="mt-5 flex flex-wrap gap-3">
                        <button
                            type="button"
                            onClick={() =>
                                window.location.reload()
                            }
                            className="inline-flex items-center gap-2 rounded-lg bg-red-700 px-4 py-2 text-sm font-semibold text-white hover:bg-red-800"
                        >
                            <RefreshCw size={16} />
                            Try Again
                        </button>

                        <Link
                            to="/"
                            className="inline-flex items-center gap-2 rounded-lg border border-red-200 px-4 py-2 text-sm font-semibold text-red-800 hover:bg-red-100"
                        >
                            <ArrowLeft size={16} />
                            Go Back
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    // --------------------------------------------------
    // TOPIC PAGE
    // --------------------------------------------------

    return (
        <div className="min-h-screen bg-slate-50">
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                {/* Breadcrumb / back navigation */}
                <Link
                    to={-1}
                    onClick={(event) => {
                        event.preventDefault();
                        window.history.back();
                    }}
                    className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-blue-700"
                >
                    <ArrowLeft size={17} />
                    Back to Topics
                </Link>

                {/* Topic header */}
                <header className="mb-8 overflow-hidden rounded-3xl bg-gradient-to-br from-blue-950 via-blue-900 to-blue-700 p-6 text-white shadow-lg sm:p-9">
                    <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">
                            <GraduationCap
                                size={14}
                                className="mr-1 inline"
                            />
                            Learning Topic
                        </span>

                        {topic?.topicNumber != null && (
                            <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">
                                Topic {topic.topicNumber}
                            </span>
                        )}
                    </div>

                    <h1 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
                        {topic?.title || "Untitled Topic"}
                    </h1>

                    <p className="mt-3 max-w-3xl text-sm leading-7 text-blue-100 sm:text-base">
                        Study the teaching content, review worked
                        examples, watch videos, and explore
                        recommended study materials.
                    </p>

                    <div className="mt-6 flex flex-wrap gap-4 text-sm text-blue-100">
                        <span className="inline-flex items-center gap-2">
                            <BookOpen size={17} />
                            Teaching content
                        </span>

                        <span className="inline-flex items-center gap-2">
                            <Lightbulb size={17} />
                            {exampleCount} example section
                            {exampleCount === 1 ? "" : "s"}
                        </span>

                        <span className="inline-flex items-center gap-2">
                            <Clock3 size={17} />
                            Learn at your own pace
                        </span>
                    </div>
                </header>

                <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
                    {/* Main content */}
                    <main className="min-w-0">
                        {/* Tabs */}
                        <div className="mb-6 overflow-x-auto rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">
                            <div className="flex min-w-max gap-2">
                                {tabs.map((tab) => {
                                    const Icon = tab.icon;
                                    const isActive =
                                        activeTab === tab.id;

                                    return (
                                        <button
                                            key={tab.id}
                                            type="button"
                                            onClick={() => {
                                                setActiveTab(tab.id);
                                                setSaveNotice("");
                                            }}
                                            className={`inline-flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                                                isActive
                                                    ? "bg-blue-700 text-white shadow-sm"
                                                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                                            }`}
                                        >
                                            <Icon size={17} />
                                            {tab.label}

                                            <span
                                                className={`rounded-full px-2 py-0.5 text-xs ${
                                                    isActive
                                                        ? "bg-white/20 text-white"
                                                        : "bg-slate-100 text-slate-600"
                                                }`}
                                            >
                                                {counts[tab.id]}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Teaching content tab */}
                        {activeTab === "content" && (
                            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
                                <div className="mb-6 flex items-center gap-3 border-b border-slate-100 pb-5">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                                        <BookOpen size={22} />
                                    </div>

                                    <div>
                                        <h2 className="text-xl font-bold text-slate-900">
                                            Teaching Content
                                        </h2>

                                        <p className="mt-1 text-sm text-slate-500">
                                            Learn the concepts for this topic.
                                        </p>
                                    </div>
                                </div>

                                <ContentBlock content={content} />

                                <div className="mt-8 flex justify-end">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setActiveTab("examples")
                                        }
                                        className="inline-flex items-center gap-2 rounded-xl bg-blue-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-800"
                                    >
                                        Review Examples
                                        <ArrowRight size={17} />
                                    </button>
                                </div>
                            </section>
                        )}

                        {/* Worked examples tab */}
                        {activeTab === "examples" && (
                            <section className="space-y-5">
                                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
                                    <div className="mb-5 flex items-center gap-3">
                                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-700">
                                            <Target size={22} />
                                        </div>

                                        <div>
                                            <h2 className="text-xl font-bold text-slate-900">
                                                Worked Examples
                                            </h2>

                                            <p className="mt-1 text-sm text-slate-500">
                                                Follow the explanations and solutions.
                                            </p>
                                        </div>
                                    </div>

                                    {typeof examples === "string" &&
                                    examples.trim() ? (
                                        <ContentBlock content={examples} />
                                    ) : Array.isArray(examples) &&
                                      examples.length > 0 ? (
                                        <div className="space-y-5">
                                            {examples.map(
                                                (example, index) => (
                                                    <ExampleCard
                                                        key={
                                                            example?._id ||
                                                            index
                                                        }
                                                        example={example}
                                                        index={index}
                                                    />
                                                )
                                            )}
                                        </div>
                                    ) : (
                                        <div className="rounded-xl border border-dashed border-slate-300 p-8 text-center">
                                            <BookText
                                                size={30}
                                                className="mx-auto text-slate-400"
                                            />

                                            <h3 className="mt-3 font-semibold text-slate-800">
                                                No worked examples yet
                                            </h3>

                                            <p className="mt-2 text-sm text-slate-500">
                                                Examples for this topic
                                                will appear here when added.
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </section>
                        )}

                        {/* Videos tab */}
                        {activeTab === "videos" && (
                            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
                                <div className="mb-6 flex items-center gap-3">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-600">
                                        <PlayCircle size={22} />
                                    </div>

                                    <div>
                                        <h2 className="text-xl font-bold text-slate-900">
                                            Video Lessons
                                        </h2>

                                        <p className="mt-1 text-sm text-slate-500">
                                            Reinforce your understanding
                                            with videos.
                                        </p>
                                    </div>
                                </div>

                                {videos.length > 0 ? (
                                    <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
                                        {videos.map(
                                            (video, index) => (
                                                <ResourceCard
                                                    key={
                                                        video?._id ||
                                                        `${getResourceUrl(video)}-${index}`
                                                    }
                                                    resource={video}
                                                    index={index}
                                                    type="video"
                                                />
                                            )
                                        )}
                                    </div>
                                ) : (
                                    <div className="rounded-xl border border-dashed border-slate-300 p-8 text-center">
                                        <Video
                                            size={30}
                                            className="mx-auto text-slate-400"
                                        />

                                        <h3 className="mt-3 font-semibold text-slate-800">
                                            No videos available
                                        </h3>

                                        <p className="mt-2 text-sm text-slate-500">
                                            Videos added to this topic
                                            will appear here.
                                        </p>
                                    </div>
                                )}
                            </section>
                        )}

                        {/* Study materials tab */}
                        {activeTab === "materials" && (
                            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
                                <div className="mb-6 flex items-center gap-3">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                                        <Layers3 size={22} />
                                    </div>

                                    <div>
                                        <h2 className="text-xl font-bold text-slate-900">
                                            Study Materials
                                        </h2>

                                        <p className="mt-1 text-sm text-slate-500">
                                            Open reference materials and
                                            save resources for later.
                                        </p>
                                    </div>
                                </div>

                                {saveNotice && (
                                    <div
                                        role="status"
                                        className="mb-5 rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm leading-6 text-blue-800"
                                    >
                                        <div className="flex items-start gap-2">
                                            <CircleAlert
                                                size={18}
                                                className="mt-0.5 shrink-0"
                                            />

                                            <p>{saveNotice}</p>
                                        </div>
                                    </div>
                                )}

                                {materials.length > 0 ? (
                                    <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
                                        {materials.map(
                                            (material, index) => (
                                                <ResourceCard
                                                    key={
                                                        material?._id ||
                                                        `${getResourceUrl(material)}-${index}`
                                                    }
                                                    resource={material}
                                                    index={index}
                                                    type="material"
                                                    onSave={
                                                        handleSaveMaterial
                                                    }
                                                />
                                            )
                                        )}
                                    </div>
                                ) : (
                                    <div className="rounded-xl border border-dashed border-slate-300 p-8 text-center">
                                        <FileText
                                            size={30}
                                            className="mx-auto text-slate-400"
                                        />

                                        <h3 className="mt-3 font-semibold text-slate-800">
                                            No study materials available
                                        </h3>

                                        <p className="mt-2 text-sm text-slate-500">
                                            Study materials and external
                                            links added to this topic
                                            will appear here.
                                        </p>
                                    </div>
                                )}
                            </section>
                        )}
                    </main>

                    {/* Right sidebar */}
                    <aside className="space-y-5">
                        {/* Topic overview */}
                        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                            <h2 className="font-bold text-slate-900">
                                Topic Overview
                            </h2>

                            <p className="mt-1 text-sm text-slate-500">
                                Your learning resources
                            </p>

                            <div className="mt-5 space-y-4">
                                <div className="flex items-center justify-between gap-3">
                                    <span className="flex items-center gap-2 text-sm text-slate-600">
                                        <BookOpen
                                            size={17}
                                            className="text-blue-700"
                                        />
                                        Teaching content
                                    </span>

                                    <CheckCircle2
                                        size={18}
                                        className={
                                            content
                                                ? "text-emerald-600"
                                                : "text-slate-300"
                                        }
                                    />
                                </div>

                                <div className="flex items-center justify-between gap-3">
                                    <span className="flex items-center gap-2 text-sm text-slate-600">
                                        <Lightbulb
                                            size={17}
                                            className="text-amber-600"
                                        />
                                        Worked examples
                                    </span>

                                    <span className="text-sm font-semibold text-slate-700">
                                        {exampleCount}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between gap-3">
                                    <span className="flex items-center gap-2 text-sm text-slate-600">
                                        <Video
                                            size={17}
                                            className="text-red-600"
                                        />
                                        Videos
                                    </span>

                                    <span className="text-sm font-semibold text-slate-700">
                                        {videos.length}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between gap-3">
                                    <span className="flex items-center gap-2 text-sm text-slate-600">
                                        <FileText
                                            size={17}
                                            className="text-emerald-600"
                                        />
                                        Materials
                                    </span>

                                    <span className="text-sm font-semibold text-slate-700">
                                        {materials.length}
                                    </span>
                                </div>
                            </div>
                        </section>

                        {/* Quick navigation */}
                        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                            <h2 className="font-bold text-slate-900">
                                Quick Navigation
                            </h2>

                            <div className="mt-4 space-y-2">
                                {tabs.map((tab) => {
                                    const Icon = tab.icon;

                                    return (
                                        <button
                                            key={tab.id}
                                            type="button"
                                            onClick={() => {
                                                setActiveTab(tab.id);
                                                setSaveNotice("");
                                            }}
                                            className={`flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-sm font-medium transition ${
                                                activeTab === tab.id
                                                    ? "bg-blue-50 text-blue-800"
                                                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                                            }`}
                                        >
                                            <span className="flex items-center gap-3">
                                                <Icon size={17} />
                                                {tab.label}
                                            </span>

                                            <ArrowRight size={15} />
                                        </button>
                                    );
                                })}
                            </div>
                        </section>

                        {/* Learning tip */}
                        <section className="rounded-2xl border border-blue-100 bg-blue-50 p-5">
                            <div className="flex items-center gap-2 text-blue-800">
                                <Lightbulb size={19} />

                                <h2 className="font-bold">
                                    Study Tip
                                </h2>
                            </div>

                            <p className="mt-3 text-sm leading-6 text-blue-900">
                                Read the teaching content first, work
                                through the examples, then use the
                                videos and external materials to
                                strengthen your understanding.
                            </p>
                        </section>
                    </aside>
                </div>
            </div>
        </div>
    );
}