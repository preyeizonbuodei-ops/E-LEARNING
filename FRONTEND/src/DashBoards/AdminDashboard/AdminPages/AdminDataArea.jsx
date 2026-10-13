
import { useEffect } from "react";
import {
  BoxIcon,
  Building2,
  BookOpen,
  File,
  Plus,
  Users,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAdminDashboardStore } from "../../UserDashboard/CourseStore/AdminDashboardStore";


const AdminDataArea = () => {
  const { stats, loading, error, getDashboardStats } =
    useAdminDashboardStore();

  useEffect(() => {
    getDashboardStats();
  }, [getDashboardStats]);

  const dashboardCards = [
    {
      title: "Users",
      value: stats.totalUsers,
      description: "Total registered users",
      icon: Users,
      color: "blue",
    },
    {
      title: "Departments",
      value: stats.totalDepartments,
      description: "Total departments in the system",
      icon: Building2,
      color: "green",
    },
    {
      title: "Major Areas",
      value: stats.totalMajorAreas,
      description: "Total major areas across departments",
      icon: BoxIcon,
      color: "amber",
    },
    {
      title: "Topics",
      value: stats.totalTopics,
      description: "Total topics across major areas",
      icon: BookOpen,
      color: "purple",
    },
    {
      title: "Materials",
      value: stats.totalMaterials,
      description: "Total learning materials",
      icon: File,
      color: "red",
    },
  ];

  const colorStyles = {
    blue: "border-blue-800 bg-blue-800/10 text-blue-800",
    green: "border-green-800 bg-green-800/10 text-green-800",
    amber: "border-amber-800 bg-amber-800/10 text-amber-800",
    purple: "border-purple-800 bg-purple-800/10 text-purple-800",
    red: "border-red-800 bg-red-800/10 text-red-800",
  };

  return (
    <>
      <section className="mx-3 mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-bold text-blue-950">
            Admin Dashboard
          </h1>
          <p className="text-[13px] text-gray-400">
            Manage departments, major areas, topics, and learning materials
          </p>
        </div>

        <NavLink
          className="flex w-fit items-center gap-2 rounded-lg bg-blue-700 px-3 py-2 text-white transition hover:bg-blue-800 sm:px-5"
          to="/admin/create-department"
        >
          <Plus size={18} />
          Add Department
        </NavLink>
      </section>

      {error && (
        <div className="mx-3 mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          <p>{error}</p>
          <button
            type="button"
            onClick={getDashboardStats}
            className="mt-1 font-semibold underline"
          >
            Try again
          </button>
        </div>
      )}

      <main className="mx-2 my-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {dashboardCards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className={`flex min-w-0 items-start gap-3 rounded-lg border p-4 transition duration-300 hover:-translate-y-0.5 ${colorStyles[card.color]}`}
            >
              <Icon
                className="size-12 shrink-0 rounded-lg bg-white p-2"
                aria-hidden="true"
              />

              <div className="min-w-0">
                <p className="text-sm text-gray-600">
                  {card.title}
                </p>

                <h3 className="my-1 text-xl font-bold text-blue-950">
                  {loading ? (
                    <span className="inline-block h-6 w-10 animate-pulse rounded bg-gray-200" />
                  ) : (
                    card.value
                  )}
                </h3>

                <p className="text-xs leading-5 text-gray-500">
                  {card.description}
                </p>
              </div>
            </div>
          );
        })}
      </main>
    </>
  );
};

export default AdminDataArea;
