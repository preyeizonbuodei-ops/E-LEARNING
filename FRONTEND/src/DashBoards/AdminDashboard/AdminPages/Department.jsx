
import { useEffect } from "react";
import { Building2 } from "lucide-react";
import AdminDataArea from "./AdminDataArea";
import { useDepartmentStore } from "../../UserDashboard/DepartmentStore/DepartmentStore";
useDepartmentStore

const Department = () => {
  const {
    departments,
    loading,
    error,
    getDepartments,
  } = useDepartmentStore();

  useEffect(() => {
    getDepartments();
  }, [getDepartments]);

  return (
    <>
      <AdminDataArea />

      <section className="m-2 overflow-x-auto rounded-lg bg-white p-4 shadow-sm">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <h2 className="font-semibold text-blue-950">
              Departments
            </h2>
            <p className="text-sm text-gray-500">
              View and manage engineering departments.
            </p>
          </div>

          <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-800">
            {departments.length} total
          </span>
        </div>

        {loading ? (
          <div className="py-10 text-center text-sm text-gray-500">
            Loading departments...
          </div>
        ) : error ? (
          <div className="py-6 text-center">
            <p className="text-sm text-red-600">{error}</p>
            <button
              type="button"
              onClick={getDepartments}
              className="mt-2 text-sm font-semibold text-blue-700 underline"
            >
              Try again
            </button>
          </div>
        ) : departments.length === 0 ? (
          <div className="py-10 text-center">
            <Building2 className="mx-auto mb-2 text-gray-400" size={32} />
            <p className="text-sm text-gray-500">
              No departments found.
            </p>
          </div>
        ) : (
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="border-b text-left text-sm text-gray-500">
                <th className="p-3">#</th>
                <th className="p-3">Department Name</th>
                <th className="p-3">Description</th>
                <th className="p-3">Major Areas</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {departments.map((department, index) => (
                <tr
                  key={department._id}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="p-3">{index + 1}</td>

                  <td className="p-3 font-medium text-blue-950">
                    {department.name}
                  </td>

                  <td className="max-w-xs p-3 text-sm text-gray-500">
                    <p className="line-clamp-2">
                      {department.description}
                    </p>
                  </td>

                  <td className="p-3">
                    {department.majorAreaCount ?? 0}
                  </td>

                  <td className="p-3">
                    <div className="flex gap-2">
                      <button
                        type="button"
                        className="cursor-pointer rounded bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700"
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        className="cursor-pointer rounded bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </>
  );
};

export default Department;
