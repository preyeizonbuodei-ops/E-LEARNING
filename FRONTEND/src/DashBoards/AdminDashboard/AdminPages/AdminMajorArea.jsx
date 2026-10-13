
import { useEffect, useMemo } from "react";
import { Building2, Plus, Image as ImageIcon } from "lucide-react";
import { useAdminMajorAreaStore } from "../../UserDashboard/DepartmentStore/MajorAreaStore";
import { NavLink } from "react-router-dom";


const AdminMajorArea = () => {
    const {
        majorAreas,
        loading,
        error,
        getMajorAreas,
    } = useAdminMajorAreaStore();

    useEffect(() => {
        getMajorAreas();
    }, [getMajorAreas]);

    // Group major areas by department
    const groupedAreas = useMemo(() => {
        return majorAreas.reduce((groups, area) => {
            const departmentName =
                typeof area.department === "object"
                    ? area.department?.name || "Unassigned Department"
                    : "Unassigned Department";

            if (!groups[departmentName]) {
                groups[departmentName] = [];
            }

            groups[departmentName].push(area);
            return groups;
        }, {});
    }, [majorAreas]);

    return (
        <main className="min-h-screen bg-gray-50 p-3 sm:p-5">
            {/* Compact Header */}
            <section className="mb-5 flex items-center justify-between gap-3">
                <div>
                    <h1 className="text-lg font-bold text-blue-950 sm:text-xl">
                        Major Areas
                    </h1>
                    <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                        Manage major areas by department.
                    </p>
                </div>

                <NavLink
                    className="flex w-fit items-center gap-2 rounded-lg bg-blue-700 px-3 py-2 text-white transition hover:bg-blue-800 sm:px-5"
                    to="/admin/create-major-area"
                >
                    <Plus size={18} />
                    Add Major Area 
                </NavLink>
            </section>

            {/* Compact Summary */}
            {!loading && !error && (
                <div className="mb-5 flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-3">
                    <div className="flex size-9 items-center justify-center rounded-lg bg-blue-50 text-blue-700">
                        <Building2 size={19} />
                    </div>

                    <div>
                        <p className="text-xs text-gray-500">
                            Total Major Areas
                        </p>
                        <p className="text-lg font-bold leading-5 text-blue-950">
                            {majorAreas.length}
                        </p>
                    </div>
                </div>
            )}

            {/* Loading */}
            {loading ? (
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {[1, 2, 3].map((item) => (
                        <div
                            key={item}
                            className="h-40 animate-pulse rounded-lg bg-gray-200"
                        />
                    ))}
                </div>
            ) : error ? (
                <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                    <p className="text-sm text-red-700">{error}</p>
                    <button
                        type="button"
                        onClick={() => getMajorAreas()}
                        className="mt-2 text-sm font-semibold text-red-800 underline"
                    >
                        Try again
                    </button>
                </div>
            ) : majorAreas.length === 0 ? (
                <div className="rounded-lg border border-dashed border-gray-300 bg-white p-8 text-center">
                    <Building2 className="mx-auto size-9 text-gray-400" />
                    <p className="mt-3 text-sm font-semibold text-gray-700">
                        No major areas available
                    </p>
                </div>
            ) : (
                <div className="space-y-6">
                    {Object.entries(groupedAreas)
                        .sort(([a], [b]) => a.localeCompare(b))
                        .map(([departmentName, areas]) => (
                            <section key={departmentName}>
                                {/* Department Heading */}
                                <div className="mb-3 flex items-center justify-between border-b border-gray-200 pb-2">
                                    <h2 className="text-sm font-bold text-blue-950 sm:text-base">
                                        {departmentName}
                                    </h2>
                                    <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-800">
                                        {areas.length}
                                    </span>
                                </div>

                                {/* Compact Cards */}
                                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                                    {areas.map((area) => (
                                        <article
                                            key={area._id}
                                            className="flex min-w-0 gap-3 rounded-lg border border-gray-200 bg-white p-3 shadow-sm transition hover:border-blue-200 hover:shadow-md"
                                        >
                                            {/* Small Thumbnail */}
                                            {area.image ? (
                                                <img
                                                    src={area.image}
                                                    alt={area.name}
                                                    loading="lazy"
                                                    className="size-20 shrink-0 rounded-md object-cover sm:size-24"
                                                />
                                            ) : (
                                                <div className="flex size-20 shrink-0 items-center justify-center rounded-md bg-blue-50 text-blue-400 sm:size-24">
                                                    <ImageIcon size={26} />
                                                </div>
                                            )}

                                            {/* Minimal Details */}
                                            <div className="flex min-w-0 flex-1 flex-col">
                                                <h3 className="line-clamp-2 text-sm font-bold leading-5 text-blue-950">
                                                    {area.name}
                                                </h3>

                                                <p className="mt-1 line-clamp-2 text-xs leading-4 text-gray-500">
                                                    {area.description}
                                                </p>

                                                <div className="mt-auto flex gap-2 pt-3">
                                                    <button
                                                        type="button"
                                                        className="rounded bg-blue-600 px-3 py-1 text-xs font-semibold text-white hover:bg-blue-700"
                                                    >
                                                        Edit
                                                    </button>

                                                    <button
                                                        type="button"
                                                        className="rounded bg-red-600 px-3 py-1 text-xs font-semibold text-white hover:bg-red-700"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        </article>
                                    ))}
                                </div>
                            </section>
                        ))}
                </div>
            )}
        </main>
    );
};

export default AdminMajorArea;
