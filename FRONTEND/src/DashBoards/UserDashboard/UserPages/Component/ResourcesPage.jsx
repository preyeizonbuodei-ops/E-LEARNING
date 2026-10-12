import { useEffect, useMemo, useState } from "react";
import {
    ArrowUpRight,
    BookOpen,
    Bookmark,
    FileText,
    ExternalLink,
    Search,
    Trash2,
    RefreshCw,
    LoaderCircle,
    CircleAlert,
    BookMarked,
    X,
} from "lucide-react";

import useSavedMaterialStore from "../../CourseStore/SaveMaterialStore";

const getTopicTitle = (material) => {
    if (typeof material?.topicId === "object") {
        return (
            material.topicId?.title ||
            material.topicId?.topicTitle ||
            "Saved study topic"
        );
    }

    return "Saved study material";
};

const getResourceTitle = (material) =>
    material?.title || material?.name || "Study material";

const getResourceUrl = (material) =>
    material?.url || material?.link || material?.fileUrl || "";

const Resources = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedMaterial, setSelectedMaterial] = useState(null);
    const [notice, setNotice] = useState(null);

    const savedMaterials = useSavedMaterialStore(
        (state) => state.savedMaterials
    );
    const loading = useSavedMaterialStore((state) => state.loading);
    const error = useSavedMaterialStore((state) => state.error);
    const deleting = useSavedMaterialStore((state) => state.deleting);
    const getSavedMaterials = useSavedMaterialStore(
        (state) => state.getSavedMaterials
    );
    const deleteSavedMaterial = useSavedMaterialStore(
        (state) => state.deleteSavedMaterial
    );

    useEffect(() => {
        getSavedMaterials();
    }, [getSavedMaterials]);

    const filteredMaterials = useMemo(() => {
        const query = searchTerm.trim().toLowerCase();

        if (!query) return savedMaterials;

        return savedMaterials.filter((material) => {
            const title = getResourceTitle(material).toLowerCase();
            const topic = getTopicTitle(material).toLowerCase();
            const url = getResourceUrl(material).toLowerCase();

            return (
                title.includes(query) ||
                topic.includes(query) ||
                url.includes(query)
            );
        });
    }, [savedMaterials, searchTerm]);

    const handleDelete = async (material) => {
        if (!material?._id) {
            setNotice({
                type: "error",
                text: "This saved resource has no ID, so it cannot be deleted.",
            });
            return;
        }

        const confirmed = window.confirm(
            `Remove "${getResourceTitle(material)}" from your saved resources?`
        );

        if (!confirmed) return;

        const result = await deleteSavedMaterial(material._id);

        if (result?.success) {
            setNotice({
                type: "success",
                text: "Resource removed from your saved materials.",
            });

            if (selectedMaterial?._id === material._id) {
                setSelectedMaterial(null);
            }
        } else {
            setNotice({
                type: "error",
                text: result?.message || "Could not remove this resource.",
            });
        }
    };

    const openResource = (material) => {
        const url = getResourceUrl(material);

        if (!url) {
            setNotice({
                type: "error",
                text: "This resource does not have a valid URL.",
            });
            return;
        }

        try {
            const parsedUrl = new URL(url);

            if (!["http:", "https:"].includes(parsedUrl.protocol)) {
                setNotice({
                    type: "error",
                    text: "This resource URL is not supported.",
                });
                return;
            }

            window.open(parsedUrl.href, "_blank", "noopener,noreferrer");
        } catch {
            setNotice({
                type: "error",
                text: "This resource has an invalid URL.",
            });
        }
    };

    return (
        <main className="min-h-screen bg-slate-50 px-4 py-6 text-slate-900 sm:px-6 sm:py-8 lg:px-10">
            <div className="mx-auto w-full max-w-7xl">
                {/* Page header */}
                <header className="mb-8">
                    <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
                        <div>
                            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700">
                                <Bookmark size={14} />
                                YOUR PERSONAL LIBRARY
                            </div>

                            <h1 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
                                My Resources
                            </h1>

                            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
                                All your saved study materials in one place.
                                Pick up where your learning left off.
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={() => getSavedMaterials()}
                            disabled={loading}
                            className="inline-flex min-h-11 items-center justify-center gap-2 self-start rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 disabled:cursor-not-allowed disabled:opacity-60 sm:self-auto"
                        >
                            <RefreshCw
                                size={16}
                                className={loading ? "animate-spin" : ""}
                            />
                            Refresh
                        </button>
                    </div>
                </header>

                {/* Summary card */}
                <section className="mb-7 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-700 to-indigo-800 p-5 text-white shadow-sm sm:p-6">
                        <div className="absolute -right-5 -top-8 h-32 w-32 rounded-full bg-white/10" />
                        <div className="relative flex items-center justify-between gap-4">
                            <div>
                                <p className="text-sm font-medium text-blue-100">
                                    Saved resources
                                </p>
                                <p className="mt-2 text-4xl font-bold tracking-tight">
                                    {savedMaterials.length}
                                </p>
                                <p className="mt-2 text-xs text-blue-100">
                                    Materials in your library
                                </p>
                            </div>

                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15">
                                <BookMarked size={28} />
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                            <BookOpen size={24} />
                        </div>
                        <div className="min-w-0">
                            <p className="font-semibold text-slate-900">
                                Your learning library
                            </p>
                            <p className="mt-1 text-sm leading-5 text-slate-500">
                                Keep useful notes, documents, and external
                                study links close at hand.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Notices */}
                {notice && (
                    <div
                        role="status"
                        className={`mb-5 flex items-start justify-between gap-3 rounded-xl border p-4 text-sm ${
                            notice.type === "success"
                                ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                                : "border-red-200 bg-red-50 text-red-700"
                        }`}
                    >
                        <div className="flex items-start gap-2">
                            {notice.type === "success" ? (
                                <BookMarked size={18} className="mt-0.5 shrink-0" />
                            ) : (
                                <CircleAlert size={18} className="mt-0.5 shrink-0" />
                            )}
                            <span>{notice.text}</span>
                        </div>

                        <button
                            type="button"
                            onClick={() => setNotice(null)}
                            aria-label="Dismiss notice"
                            className="rounded-md p-1 hover:bg-black/5"
                        >
                            <X size={16} />
                        </button>
                    </div>
                )}

                {/* Search and section heading */}
                <section>
                    <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                        <div>
                            <h2 className="text-lg font-bold text-slate-950 sm:text-xl">
                                Your saved materials
                            </h2>
                            <p className="mt-1 text-sm text-slate-500">
                                {filteredMaterials.length}{" "}
                                {filteredMaterials.length === 1
                                    ? "resource"
                                    : "resources"}
                                {searchTerm && " found"}
                            </p>
                        </div>

                        <div className="relative w-full sm:max-w-sm">
                            <Search
                                size={18}
                                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                            />
                            <input
                                type="search"
                                value={searchTerm}
                                onChange={(event) =>
                                    setSearchTerm(event.target.value)
                                }
                                placeholder="Search your resources..."
                                aria-label="Search saved resources"
                                className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                            />
                        </div>
                    </div>

                    {/* Loading */}
                    {loading && savedMaterials.length === 0 && (
                        <div className="flex min-h-64 flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 text-center">
                            <LoaderCircle
                                size={32}
                                className="animate-spin text-blue-600"
                            />
                            <p className="mt-4 font-semibold text-slate-800">
                                Loading your resources
                            </p>
                            <p className="mt-1 text-sm text-slate-500">
                                Fetching your saved study materials...
                            </p>
                        </div>
                    )}

                    {/* Error */}
                    {!loading && error && savedMaterials.length === 0 && (
                        <div className="rounded-2xl border border-red-200 bg-white p-6 text-center sm:p-10">
                            <CircleAlert
                                size={30}
                                className="mx-auto text-red-500"
                            />
                            <h3 className="mt-4 font-bold text-slate-900">
                                Could not load resources
                            </h3>
                            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                                {error}
                            </p>
                            <button
                                type="button"
                                onClick={() => getSavedMaterials()}
                                className="mt-5 rounded-xl bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-800"
                            >
                                Try again
                            </button>
                        </div>
                    )}

                    {/* Empty library */}
                    {!loading &&
                        !error &&
                        savedMaterials.length === 0 && (
                            <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-14 text-center sm:py-20">
                                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                                    <Bookmark size={30} />
                                </div>
                                <h3 className="mt-5 text-lg font-bold text-slate-900">
                                    Your library is waiting
                                </h3>
                                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                                    When you save a study material from a
                                    topic, it will appear here so you can
                                    easily find it again.
                                </p>
                            </div>
                        )}

                    {/* No search results */}
                    {!loading &&
                        savedMaterials.length > 0 &&
                        filteredMaterials.length === 0 && (
                            <div className="rounded-2xl border border-slate-200 bg-white px-5 py-12 text-center">
                                <Search
                                    size={28}
                                    className="mx-auto text-slate-400"
                                />
                                <h3 className="mt-4 font-semibold text-slate-900">
                                    No matching resources
                                </h3>
                                <p className="mt-2 text-sm text-slate-500">
                                    Try a different title or search term.
                                </p>
                                <button
                                    type="button"
                                    onClick={() => setSearchTerm("")}
                                    className="mt-4 text-sm font-semibold text-blue-700 hover:text-blue-900"
                                >
                                    Clear search
                                </button>
                            </div>
                        )}

                    {/* Resource cards */}
                    {filteredMaterials.length > 0 && (
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                            {filteredMaterials.map((material) => {
                                const url = getResourceUrl(material);
                                const title = getResourceTitle(material);
                                const topic = getTopicTitle(material);

                                return (
                                    <article
                                        key={material._id || `${url}-${title}`}
                                        className="group flex min-w-0 flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md sm:p-6"
                                    >
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700 transition group-hover:bg-blue-100">
                                                <FileText size={23} />
                                            </div>

                                            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                                                <Bookmark size={12} />
                                                Saved
                                            </span>
                                        </div>

                                        <div className="mt-5 min-w-0 flex-1">
                                            <h3 className="line-clamp-2 break-words text-base font-bold leading-6 text-slate-900">
                                                {title}
                                            </h3>

                                            <p className="mt-2 line-clamp-2 break-words text-sm leading-5 text-slate-500">
                                                {topic}
                                            </p>

                                            {url && (
                                                <p className="mt-3 truncate text-xs text-slate-400">
                                                    {url}
                                                </p>
                                            )}
                                        </div>

                                        <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-slate-100 pt-4">
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    openResource(material)
                                                }
                                                disabled={!url}
                                                className="inline-flex min-h-10 flex-1 items-center justify-center gap-2 rounded-xl bg-blue-700 px-3 py-2 text-sm font-semibold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-50"
                                            >
                                                Open resource
                                                <ArrowUpRight size={16} />
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleDelete(material)
                                                }
                                                disabled={deleting}
                                                aria-label={`Delete ${title}`}
                                                title="Remove saved resource"
                                                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                                            >
                                                <Trash2 size={17} />
                                            </button>
                                        </div>
                                    </article>
                                );
                            })}
                        </div>
                    )}
                </section>
            </div>
        </main>
    );
};

export default Resources;