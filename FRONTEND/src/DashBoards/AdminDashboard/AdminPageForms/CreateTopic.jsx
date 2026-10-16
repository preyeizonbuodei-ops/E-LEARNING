
import { useEffect, useState } from "react";
import useAdminLessonStore from "../../UserDashboard/CourseStore/CreateLessonStore";
import useTopicStore from "../../UserDashboard/CourseStore/AdminTopicStore";

const emptyResource = () => ({ title: "", url: "" });

const CreateTopicForm = () => {
    const getLessons = useAdminLessonStore(
        (state) => state.getLessons
    );

    const createTopic = useTopicStore(
        (state) => state.createTopic
    );

    const [lessons, setLessons] = useState([]);
    const [lessonId, setLessonId] = useState("");

    const [topicNumber, setTopicNumber] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [examples, setExamples] = useState("");

    const [videos, setVideos] = useState([emptyResource()]);
    const [materials, setMaterials] = useState([emptyResource()]);
    const [resources, setResources] = useState([emptyResource()]);

    const [loadingLessons, setLoadingLessons] = useState(true);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");

    useEffect(() => {
        const fetchLessons = async () => {
            if (typeof getLessons !== "function") {
                setMessage(
                    "The lesson store does not have a getLessons function."
                );
                setMessageType("error");
                setLoadingLessons(false);
                return;
            }

            try {
                setLoadingLessons(true);
                setMessage("");

                const response = await getLessons();

                const lessonsData = Array.isArray(response)
                    ? response
                    : Array.isArray(response?.lessons)
                    ? response.lessons
                    : Array.isArray(response?.data?.lessons)
                    ? response.data.lessons
                    : [];

                setLessons(lessonsData);
            } catch (error) {
                console.error(
                    "FAILED TO FETCH LESSONS:",
                    error.response?.data || error
                );

                setMessage(
                    error.response?.data?.message ||
                    "Failed to load lessons. Check your admin login and backend route."
                );
                setMessageType("error");
            } finally {
                setLoadingLessons(false);
            }
        };

        fetchLessons();
    }, [getLessons]);

    // Update one field in a particular resource row.
    const updateResource = (
        setter,
        index,
        field,
        value
    ) => {
        setter((previous) =>
            previous.map((item, itemIndex) =>
                itemIndex === index
                    ? { ...item, [field]: value }
                    : item
            )
        );
    };

    // Add another resource input row.
    const addResource = (setter) => {
        setter((previous) => [
            ...previous,
            emptyResource()
        ]);
    };

    // Remove a resource input row.
    const removeResource = (setter, index) => {
        setter((previous) =>
            previous.filter((_, itemIndex) => itemIndex !== index)
        );
    };

    // Ignore completely empty rows, but don't allow half-filled rows.
    const prepareResources = (items, label) => {
        const incomplete = items.some((item) => {
            const hasTitle = item.title.trim() !== "";
            const hasUrl = item.url.trim() !== "";

            return hasTitle !== hasUrl;
        });

        if (incomplete) {
            throw new Error(
                `For each ${label}, enter both its title and URL, or leave both fields empty.`
            );
        }

        return items
            .filter(
                (item) =>
                    item.title.trim() !== "" &&
                    item.url.trim() !== ""
            )
            .map((item) => ({
                title: item.title.trim(),
                url: item.url.trim()
            }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!lessonId) {
            setMessage("Please select a lesson.");
            setMessageType("error");
            return;
        }

        if (!topicNumber || Number(topicNumber) < 1) {
            setMessage("Please enter a valid topic number.");
            setMessageType("error");
            return;
        }

        if (!title.trim() || !content.trim()) {
            setMessage(
                "Please enter the topic title and content."
            );
            setMessageType("error");
            return;
        }

        if (typeof createTopic !== "function") {
            setMessage(
                "The topic store does not have a createTopic function."
            );
            setMessageType("error");
            return;
        }

        let topicVideos;
        let topicMaterials;
        let topicResources;

        try {
            topicVideos = prepareResources(videos, "video");
            topicMaterials = prepareResources(materials, "study material");
            topicResources = prepareResources(resources, "external resource");
        } catch (error) {
            setMessage(error.message);
            setMessageType("error");
            return;
        }

        setLoading(true);
        setMessage("");

        try {
            const response = await createTopic(lessonId, {
                topicNumber: Number(topicNumber),
                title: title.trim(),
                content: content.trim(),
                examples: examples.trim(),
                videos: topicVideos,
                materials: topicMaterials,
                resources: topicResources
            });

            setMessage(
                response?.message || "Topic created successfully!"
            );
            setMessageType("success");

            setTopicNumber("");
            setTitle("");
            setContent("");
            setExamples("");

            setVideos([emptyResource()]);
            setMaterials([emptyResource()]);
            setResources([emptyResource()]);
        } catch (error) {
            console.error(
                "FAILED TO CREATE TOPIC:",
                error.response?.data || error
            );

            setMessage(
                error.response?.data?.message ||
                "Failed to create topic."
            );
            setMessageType("error");
        } finally {
            setLoading(false);
        }
    };

    // Reusable resource section for videos, materials, and links.
    const renderResourceSection = (
        heading,
        description,
        items,
        setter,
        titlePlaceholder,
        urlPlaceholder
    ) => (
        <section className="space-y-4 rounded-xl border border-gray-200 p-4">
            <div>
                <h2 className="text-lg font-semibold">
                    {heading}
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                    {description}
                </p>
            </div>

            {items.map((item, index) => (
                <div
                    key={index}
                    className="space-y-3 rounded-lg bg-gray-50 p-3"
                >
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">
                            {heading} {index + 1}
                        </span>

                        {items.length > 1 && (
                            <button
                                type="button"
                                onClick={() =>
                                    removeResource(setter, index)
                                }
                                className="text-sm text-red-600 hover:text-red-800"
                            >
                                Remove
                            </button>
                        )}
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            Title
                        </label>
                        <input
                            type="text"
                            value={item.title}
                            onChange={(e) =>
                                updateResource(
                                    setter,
                                    index,
                                    "title",
                                    e.target.value
                                )
                            }
                            placeholder={titlePlaceholder}
                            className="w-full rounded-lg border bg-white p-3"
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            URL
                        </label>
                        <input
                            type="url"
                            value={item.url}
                            onChange={(e) =>
                                updateResource(
                                    setter,
                                    index,
                                    "url",
                                    e.target.value
                                )
                            }
                            placeholder={urlPlaceholder}
                            className="w-full rounded-lg border bg-white p-3"
                        />
                    </div>
                </div>
            ))}

            <button
                type="button"
                onClick={() => addResource(setter)}
                className="rounded-lg border border-blue-600 px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50"
            >
                + Add another
            </button>
        </section>
    );

    return (
        <div className="mx-auto max-w-4xl p-6">
            <h1 className="mb-2 text-2xl font-bold">
                Create Lesson
            </h1>

            <p className="mb-6 text-gray-600">
                Select a Topic, add the teaching content, and
                optionally attach learning resources.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Lesson dropdown */}
                <div>
                    <label
                        htmlFor="lesson"
                        className="mb-2 block font-medium"
                    >
                        Select Topic
                    </label>

                    <select
                        id="lesson"
                        value={lessonId}
                        onChange={(e) => setLessonId(e.target.value)}
                        className="w-full rounded-lg border p-3"
                        required
                        disabled={loadingLessons}
                    >
                        <option value="">
                            {loadingLessons
                                ? "Loading lessons..."
                                : "Choose a lesson"}
                        </option>

                        {lessons.map((lesson) => (
                            <option
                                key={lesson._id}
                                value={lesson._id}
                            >
                                Lesson {lesson.lessonNumber ?? "—"} —{" "}
                                {lesson.title || "Untitled lesson"}
                            </option>
                        ))}
                    </select>

                    {!loadingLessons && lessons.length === 0 && (
                        <p className="mt-2 text-sm text-gray-500">
                            No lessons found. Check that lessons exist
                            and the lesson-fetching endpoint returns them.
                        </p>
                    )}
                </div>

                {/* Topic number */}
                <div>
                    <label
                        htmlFor="topicNumber"
                        className="mb-2 block font-medium"
                    >
                        Lesson Number
                    </label>

                    <input
                        id="topicNumber"
                        type="number"
                        min="1"
                        value={topicNumber}
                        onChange={(e) => setTopicNumber(e.target.value)}
                        className="w-full rounded-lg border p-3"
                        placeholder="e.g. 1"
                        required
                    />
                </div>

                {/* Topic title */}
                <div>
                    <label
                        htmlFor="title"
                        className="mb-2 block font-medium"
                    >
                        Lesson Title
                    </label>

                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full rounded-lg border p-3"
                        placeholder="e.g. Introduction to Motion"
                        required
                    />
                </div>

                {/* Teaching content */}
                <div>
                    <label
                        htmlFor="content"
                        className="mb-2 block font-medium"
                    >
                        Teaching Content
                    </label>

                    <textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="min-h-40 w-full rounded-lg border p-3"
                        placeholder="Enter the main teaching content..."
                        required
                    />
                </div>

                {/* Examples */}
                <div>
                    <label
                        htmlFor="examples"
                        className="mb-2 block font-medium"
                    >
                        Worked Examples
                    </label>

                    <textarea
                        id="examples"
                        value={examples}
                        onChange={(e) => setExamples(e.target.value)}
                        className="min-h-32 w-full rounded-lg border p-3"
                        placeholder="Enter examples for this topic..."
                    />
                </div>

                {/* Videos */}
                {renderResourceSection(
                    "Videos",
                    "Add YouTube links or other video URLs.",
                    videos,
                    setVideos,
                    "e.g. Understanding Motion",
                    "https://www.youtube.com/watch?v=..."
                )}

                {/* Study materials */}
                {renderResourceSection(
                    "Study Materials",
                    "Add links to PDFs, lecture notes, or other study documents.",
                    materials,
                    setMaterials,
                    "e.g. Motion Lecture Notes",
                    "https://example.com/lecture-notes.pdf"
                )}

                {/* External resources */}
                {renderResourceSection(
                    "External Resources",
                    "Add educational websites, simulations, and further reading.",
                    resources,
                    setResources,
                    "e.g. Interactive Motion Simulation",
                    "https://example.com/resource"
                )}

                {/* Submit */}
                <button
                    type="submit"
                    disabled={
                        loading ||
                        loadingLessons ||
                        lessons.length === 0
                    }
                    className="rounded-lg bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {loading ? "Creating..." : "Create Topic"}
                </button>

                {/* Feedback */}
                {message && (
                    <p
                        role="status"
                        className={`text-sm ${
                            messageType === "success"
                                ? "text-green-600"
                                : "text-red-600"
                        }`}
                    >
                        {message}
                    </p>
                )}
            </form>
        </div>
    );
};

export default CreateTopicForm;
