
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
    ArrowLeft,
    ArrowUpRight,
    FileText,
    Search,
    ExternalLink,
    BookOpen,
} from "lucide-react";
import { motion } from "motion/react";
import Navbar from "../Navbar";


import { useResearchPaperStore } from "../../DashBoards/UserDashboard/CourseStore/UserResearchPaperStore";


const ResearchPapers = () => {
    const [search, setSearch] = useState("");
    const [selectedMajorArea, setSelectedMajorArea] = useState("all");
    const [sortOrder, setSortOrder] = useState("newest");

    const {
        researchPapers,
        loading,
        error,
        getAllResearchPapers,
    } = useResearchPaperStore();

    useEffect(() => {
        getAllResearchPapers();
    }, [getAllResearchPapers]);

    // Get major areas represented by the research papers
    const majorAreas = useMemo(() => {
        const areas = new Map();

        researchPapers.forEach((paper) => {
            const area = paper.majorAreaId;

            if (area && typeof area === "object" && area._id) {
                areas.set(area._id, area.name || "Major Area");
            }
        });

        return Array.from(areas, ([id, name]) => ({ id, name }));
    }, [researchPapers]);

    // Search, filter, and sort research papers
    const filteredPapers = useMemo(() => {
        const searchText = search.trim().toLowerCase();

        const results = researchPapers.filter((paper) => {
            const areaId =
                typeof paper.majorAreaId === "object"
                    ? paper.majorAreaId?._id
                    : paper.majorAreaId;

            const authors = Array.isArray(paper.authors)
                ? paper.authors.join(" ")
                : paper.authors || "";

            const areaName =
                typeof paper.majorAreaId === "object"
                    ? paper.majorAreaId?.name || ""
                    : "";

            const matchesArea =
                selectedMajorArea === "all" ||
                String(areaId) === String(selectedMajorArea);

            const matchesSearch =
                !searchText ||
                paper.title?.toLowerCase().includes(searchText) ||
                authors.toLowerCase().includes(searchText) ||
                paper.abstract?.toLowerCase().includes(searchText) ||
                areaName.toLowerCase().includes(searchText);

            return matchesArea && matchesSearch;
        });

        return results.sort((a, b) => {
            if (sortOrder === "newest") {
                return (
                    Number(b.publicationYear || 0) -
                    Number(a.publicationYear || 0)
                );
            }

            if (sortOrder === "oldest") {
                return (
                    Number(a.publicationYear || 0) -
                    Number(b.publicationYear || 0)
                );
            }

            return (a.title || "").localeCompare(b.title || "");
        });
    }, [researchPapers, search, selectedMajorArea, sortOrder]);

    return (
        <>
        <Navbar />
        <main className="min-h-screen bg-slate-50 pb-16">
            {/* Hero */}
            <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-900 px-4 py-16 text-white sm:px-8 sm:py-20">
                <div className="pointer-events-none absolute -right-20 -top-20 size-72 rounded-full border border-white/10" />
                <div className="pointer-events-none absolute -bottom-32 right-1/4 size-80 rounded-full bg-blue-500/10 blur-3xl" />

                <div className="relative mx-auto max-w-7xl">
                    <Link
                        to="/research"
                        className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-blue-200 transition hover:text-white"
                    >
                        <ArrowLeft className="size-4" />
                        Back to Research
                    </Link>

                    <div className="flex items-center gap-3">
                        <div className="flex size-12 items-center justify-center rounded-xl bg-amber-500 text-slate-950">
                            <BookOpen className="size-6" />
                        </div>

                        <p className="text-sm font-bold uppercase tracking-[0.2em] text-amber-400">
                            StudStore Research
                        </p>
                    </div>

                    <h1 className="mt-6 max-w-3xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-6xl">
                        Explore Engineering Research
                    </h1>

                    <p className="mt-5 max-w-2xl text-sm leading-7 text-blue-100 sm:text-base md:text-lg">
                        Discover academic publications, explore engineering
                        innovations, and learn from research across different
                        major areas.
                    </p>

                    <div className="mt-8 flex flex-wrap gap-3">
                        <div className="rounded-xl border border-white/10 bg-white/10 px-5 py-3">
                            <p className="text-2xl font-bold">
                                {loading ? "..." : researchPapers.length}
                            </p>
                            <p className="mt-1 text-sm text-blue-100">
                                Publications
                            </p>
                        </div>

                        <div className="rounded-xl border border-white/10 bg-white/10 px-5 py-3">
                            <p className="text-2xl font-bold">
                                {loading ? "..." : majorAreas.length}
                            </p>
                            <p className="mt-1 text-sm text-blue-100">
                                Major Areas
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main content */}
            <section className="mx-auto max-w-7xl px-4 pt-10 sm:px-8 sm:pt-14">
                {/* Search and filters */}
                <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        <div className="relative md:col-span-1">
                            <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-slate-400" />

                            <input
                                type="search"
                                value={search}
                                onChange={(event) =>
                                    setSearch(event.target.value)
                                }
                                placeholder="Search titles, authors, topics..."
                                aria-label="Search research papers"
                                className="w-full rounded-xl border border-slate-200 py-3 pl-12 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />
                        </div>

                        <select
                            value={selectedMajorArea}
                            onChange={(event) =>
                                setSelectedMajorArea(event.target.value)
                            }
                            aria-label="Filter by major area"
                            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        >
                            <option value="all">All Major Areas</option>

                            {majorAreas.map((area) => (
                                <option key={area.id} value={area.id}>
                                    {area.name}
                                </option>
                            ))}
                        </select>

                        <select
                            value={sortOrder}
                            onChange={(event) =>
                                setSortOrder(event.target.value)
                            }
                            aria-label="Sort research papers"
                            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        >
                            <option value="newest">Newest First</option>
                            <option value="oldest">Oldest First</option>
                            <option value="title">Title: A–Z</option>
                        </select>
                    </div>

                    <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                        <p className="text-sm text-slate-500">
                            {loading
                                ? "Loading publications..."
                                : `Showing ${filteredPapers.length} of ${researchPapers.length} publications`}
                        </p>

                        {(search || selectedMajorArea !== "all") && (
                            <button
                                type="button"
                                onClick={() => {
                                    setSearch("");
                                    setSelectedMajorArea("all");
                                }}
                                className="text-sm font-semibold text-blue-700 hover:text-blue-900"
                            >
                                Clear filters
                            </button>
                        )}
                    </div>
                </div>

                {/* Publication list */}
                <div className="mt-8">
                    {loading ? (
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                            {[1, 2, 3, 4].map((item) => (
                                <div
                                    key={item}
                                    className="h-72 animate-pulse rounded-2xl border border-slate-200 bg-white"
                                />
                            ))}
                        </div>
                    ) : error ? (
                        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-700">
                            {error}
                        </div>
                    ) : filteredPapers.length === 0 ? (
                        <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
                            <FileText className="mx-auto size-12 text-slate-400" />

                            <h2 className="mt-4 text-xl font-bold text-slate-800">
                                No research papers found
                            </h2>

                            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                                Try a different search term or choose another
                                major area to discover available publications.
                            </p>
                        </div>
                    ) : (
                        <motion.div
                            className="grid grid-cols-1 gap-5 md:grid-cols-2"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                        >
                            {filteredPapers.map((paper) => {
                                const area =
                                    typeof paper.majorAreaId === "object"
                                        ? paper.majorAreaId?.name
                                        : "Engineering Research";

                                const authors = Array.isArray(paper.authors)
                                    ? paper.authors.join(", ")
                                    : paper.authors || "Author not specified";

                                return (
                                    <article
                                        key={paper._id}
                                        className="flex min-w-0 flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg sm:p-6"
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                                                <FileText className="size-6" />
                                            </div>

                                            <div className="min-w-0 flex-1">
                                                <span className="inline-block max-w-full truncate rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-900">
                                                    {area || "Engineering Research"}
                                                </span>

                                                <h2 className="mt-3 text-lg font-bold leading-6 text-slate-900 sm:text-xl">
                                                    {paper.title}
                                                </h2>
                                            </div>
                                        </div>

                                        <p className="mt-4 text-sm leading-6 text-slate-500">
                                            {authors}
                                        </p>

                                        <p className="mt-2 text-sm font-semibold text-blue-800">
                                            Published {paper.publicationYear}
                                        </p>

                                        <p className="mt-4 line-clamp-4 text-sm leading-6 text-slate-600">
                                            {paper.abstract}
                                        </p>

                                        {paper.doi && (
                                            <p className="mt-3 break-all text-xs text-slate-500">
                                                DOI: {paper.doi}
                                            </p>
                                        )}

                                        <div className="mt-auto flex flex-wrap gap-3 pt-6">
                                            {paper.sourceUrl && (
                                                <a
                                                    href={paper.sourceUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-2 rounded-lg bg-blue-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-800"
                                                >
                                                    Read Paper
                                                    <ExternalLink className="size-4" />
                                                </a>
                                            )}

                                            {paper.pdfUrl && (
                                                <a
                                                    href={paper.pdfUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50"
                                                >
                                                    View PDF
                                                    <ArrowUpRight className="size-4" />
                                                </a>
                                            )}
                                        </div>
                                    </article>
                                );
                            })}
                        </motion.div>
                    )}
                </div>
            </section>
        </main>
        </>
    );
};

export default ResearchPapers;
