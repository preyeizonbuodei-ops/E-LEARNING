
import { useEffect } from "react";
import {
    Bookmark,
    BookOpen,
    ExternalLink,
    FileText,
    LoaderCircle,
    PlayCircle,
    Trash2,
    AlertCircle,
    FolderOpen,
} from "lucide-react";
import useSavedMaterialStore from "../../CourseStore/SaveMaterialStore";

export default function Materials() {
    const {
        savedMaterials,
        loading,
        deleting,
        error,
        message,
        getSavedMaterials,
        deleteSavedMaterial,
        clearStatus,
    } = useSavedMaterialStore();

    useEffect(() => {
        getSavedMaterials();
    }, [getSavedMaterials]);

    const handleRemove = async (materialId) => {
        const confirmed = window.confirm(
            "Are you sure you want to remove this saved resource?"
        );

        if (!confirmed) return;

        await deleteSavedMaterial(materialId);
    };

    const getResourceIcon = (resourceType) => {
        switch (resourceType) {
            case "video":
                return PlayCircle;
            case "resource":
                return ExternalLink;
            default:
                return FileText;
        }
    };

    const getResourceLabel = (resourceType) => {
        switch (resourceType) {
            case "video":
                return "Video";
            case "resource":
                return "External Resource";
            default:
                return "Study Material";
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-10">
            <div className="mx-auto max-w-7xl">
                {/* Page Header */}
                <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <div className="mb-2 flex items-center gap-2 text-sm font-medium text-blue-700">
                            <Bookmark size={17} />
                            Your learning library
                        </div>

                        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                            My Resources
                        </h1>

                        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
                            All your saved study materials, videos, and
                            learning resources in one place.
                        </p>
                    </div>

                    <div className="flex w-fit items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                        <div className="rounded-lg bg-blue-50 p-2 text-blue-700">
                            <BookOpen size={20} />
                        </div>

                        <div>
                            <p className="text-2xl font-bold text-slate-900">
                                {savedMaterials.length}
                            </p>
                            <p className="text-xs text-slate-500">
                                Saved resources
                            </p>
                        </div>
                    </div>
                </div>

                {/* Status Message */}
                {message && (
                    <div className="mb-5 flex items-center justify-between gap-3 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
                        <span>{message}</span>

                        <button
                            onClick={clearStatus}
                            className="font-semibold hover:underline"
                        >
                            Dismiss
                        </button>
                    </div>
                )}

                {error && (
                    <div className="mb-5 flex items-center gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                        <AlertCircle size={18} />
                        <span>{error}</span>
                    </div>
                )}

                {/* Loading State */}
                {loading ? (
                    <div className="flex min-h-64 flex-col items-center justify-center">
                        <LoaderCircle
                            size={32}
                            className="animate-spin text-blue-700"
                        />

                        <p className="mt-4 text-sm text-slate-500">
                            Loading your saved resources...
                        </p>
                    </div>
                ) : savedMaterials.length === 0 ? (
                    /* Empty State */
                    <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
                            <FolderOpen size={30} />
                        </div>

                        <h2 className="mt-5 text-lg font-semibold text-slate-900">
                            No saved resources yet
                        </h2>

                        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                            When you find a useful video, study material,
                            or resource while learning a topic, save it
                            and it will appear here.
                        </p>
                    </div>
                ) : (
                    /* Saved Resources */
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                        {savedMaterials.map((material) => {
                            const ResourceIcon = getResourceIcon(
                                material.resourceType
                            );

                            return (
                                <article
                                    key={material._id}
                                    className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
                                >
                                    {/* Card Header */}
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                                            <ResourceIcon size={23} />
                                        </div>

                                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                                            {getResourceLabel(
                                                material.resourceType
                                            )}
                                        </span>
                                    </div>

                                    {/* Resource Details */}
                                    <div className="mt-5 flex-1">
                                        <h2 className="line-clamp-2 text-base font-semibold leading-6 text-slate-900">
                                            {material.title}
                                        </h2>

                                        <p className="mt-2 break-all text-xs leading-5 text-slate-500">
                                            {material.url}
                                        </p>

                                        <p className="mt-3 text-xs text-slate-400">
                                            Saved{" "}
                                            {material.createdAt
                                                ? new Date(
                                                      material.createdAt
                                                  ).toLocaleDateString()
                                                : "previously"}
                                        </p>
                                    </div>

                                    {/* Card Actions */}
                                    <div className="mt-5 flex items-center gap-3 border-t border-slate-100 pt-4">
                                        <a
                                            href={material.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-800"
                                        >
                                            Open Resource
                                            <ExternalLink size={15} />
                                        </a>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleRemove(material._id)
                                            }
                                            disabled={deleting}
                                            title="Remove saved resource"
                                            aria-label={`Remove ${material.title}`}
                                            className="flex items-center justify-center rounded-lg border border-slate-200 p-2.5 text-slate-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
