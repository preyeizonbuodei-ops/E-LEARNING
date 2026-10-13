
import { useEffect, useMemo, useState } from "react";
import { Plus, Search, BookOpen } from "lucide-react";
import { useAdminMajorAreaTopicStore } from "../../UserDashboard/DepartmentStore/MajorTopicStore";
import { NavLink } from "react-router-dom";


const Topics = () => {
  const {
    majorAreaTopics = [],
    loading,
    error,
    getAllMajorAreaTopics,
  } = useAdminMajorAreaTopicStore();

  const [searchTerm, setSearchTerm] = useState("");

  // Fetch topics when the component loads
  useEffect(() => {
    getAllMajorAreaTopics().catch(() => {});
  }, [getAllMajorAreaTopics]);

  // Search topics, major areas, and departments
  const filteredTopics = useMemo(() => {
    const search = searchTerm.toLowerCase().trim();

    return majorAreaTopics.filter((topic) => {
      const title = topic.title || "";

      const areaName =
        typeof topic.majorArea === "object"
          ? topic.majorArea?.name || ""
          : "";

      const departmentName =
        typeof topic.majorArea?.department === "object"
          ? topic.majorArea.department?.name || ""
          : "";

      return (
        title.toLowerCase().includes(search) ||
        areaName.toLowerCase().includes(search) ||
        departmentName.toLowerCase().includes(search)
      );
    });
  }, [majorAreaTopics, searchTerm]);

  return (
    <>
      {/* Page Header */}
      <section className="mx-3 mt-4 flex flex-col gap-4 sm:mx-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-xl font-bold text-blue-950">
            Topics
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage major area topics and their learning materials.
          </p>
        </div>

        <div className="flex w-full flex-col gap-3 sm:flex-row md:w-auto">
          {/* Search */}
          <form
            onSubmit={(event) => event.preventDefault()}
            className="flex min-w-0 flex-1 overflow-hidden rounded-lg border border-blue-200 bg-white sm:min-w-[250px] md:flex-none"
          >
            <input
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search topics..."
              aria-label="Search topics"
              className="min-w-0 flex-1 px-3 py-2 text-sm outline-none"
            />

            <button
              type="submit"
              aria-label="Search"
              className="flex items-center justify-center gap-2 bg-blue-700 px-3 text-sm text-white transition hover:bg-blue-800"
            >
              <Search size={16} />
              <span>Search</span>
            </button>
          </form>

          {/* Add Topic */}
          <NavLink
                className="flex w-fit items-center gap-2 rounded-lg bg-blue-700 px-3 py-2 text-white transition hover:bg-blue-800 sm:px-5"
                to="/admin/create-major-area-topic"
            >
                <Plus size={18} />
                Add Major Area Topic
            </NavLink>
        </div>
      </section>

      {/* Topics Table */}
      <main className="mx-3 mb-6 mt-6 overflow-hidden rounded-xl bg-white shadow-sm sm:mx-4">
        {loading ? (
          <div className="p-10 text-center">
            <p className="text-sm text-gray-500">
              Loading topics...
            </p>
          </div>
        ) : error ? (
          <div className="p-8 text-center">
            <p className="text-sm text-red-600">{error}</p>

            <button
              type="button"
              onClick={() => getAllMajorAreaTopics().catch(() => {})}
              className="mt-3 text-sm font-medium text-blue-700 underline"
            >
              Try again
            </button>
          </div>
        ) : filteredTopics.length === 0 ? (
          <div className="p-10 text-center">
            <BookOpen
              size={36}
              className="mx-auto mb-3 text-gray-300"
            />

            <h2 className="font-semibold text-gray-700">
              {searchTerm
                ? "No matching topics found"
                : "No topics available yet"}
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              {searchTerm
                ? "Try searching with another topic, major area, or department."
                : "Topics you create will appear here."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] border-collapse text-left">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
                  <th className="px-5 py-4 font-semibold">
                    Topic
                  </th>

                  <th className="px-5 py-4 font-semibold">
                    Major Area
                  </th>

                  <th className="px-5 py-4 font-semibold">
                    Department
                  </th>

                  <th className="px-5 py-4 font-semibold">
                    Materials
                  </th>

                  <th className="px-5 py-4 font-semibold">
                    Videos
                  </th>

                  <th className="px-5 py-4 font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredTopics.map((topic) => {
                  const majorArea =
                    typeof topic.majorArea === "object"
                      ? topic.majorArea
                      : null;

                  const department =
                    typeof majorArea?.department === "object"
                      ? majorArea.department
                      : null;

                  return (
                    <tr
                      key={topic._id}
                      className="border-b border-gray-100 transition hover:bg-blue-50/40"
                    >
                      <td className="px-5 py-4">
                        <div className="max-w-[220px]">
                          <p className="font-medium text-blue-950">
                            {topic.title || "Untitled topic"}
                          </p>

                          <p className="mt-1 line-clamp-2 text-xs text-gray-500">
                            {topic.description || "No description"}
                          </p>
                        </div>
                      </td>

                      <td className="px-5 py-4 text-sm text-gray-600">
                        {majorArea?.name || "—"}
                      </td>

                      <td className="px-5 py-4 text-sm text-gray-600">
                        {department?.name || "—"}
                      </td>

                      <td className="px-5 py-4 text-sm text-gray-600">
                        {topic.materials?.length || 0}
                      </td>

                      <td className="px-5 py-4 text-sm text-gray-600">
                        {topic.videos?.length || 0}
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              // Connect to your edit-topic form.
                            }}
                            className="rounded-md bg-blue-600 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-blue-700"
                          >
                            Edit
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              // Connect to your delete-topic action.
                            }}
                            className="rounded-md bg-red-600 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-red-700"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Table Footer */}
        {!loading && !error && filteredTopics.length > 0 && (
          <div className="border-t border-gray-100 px-5 py-3">
            <p className="text-xs text-gray-500">
              Showing {filteredTopics.length} of{" "}
              {majorAreaTopics.length} topics
            </p>
          </div>
        )}
      </main>
    </>
  );
};

export default Topics;
