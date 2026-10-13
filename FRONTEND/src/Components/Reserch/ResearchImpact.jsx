
import { NavLink } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

const ResearchImpact = () => {
  const [activeArea, setActiveArea] = useState("All Areas");

  const data = [
    "All Areas",
    "Robotics & Automation",
    "Artificial Intelligence",
    "Control Systems",
    "Renewable Energy",
    "Materials Manufacturing",
    "Structural Engineering",
  ];

  return (
    <section className="w-full overflow-hidden px-4 py-10 sm:px-6 sm:py-14 md:px-8 lg:px-12 lg:py-16">
      <div className="mx-auto w-full max-w-7xl">
        {/* Section heading */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="min-w-0">
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-950 sm:text-base">
              Research Areas
            </p>

            <h2 className="mt-2 text-2xl font-bold leading-tight text-amber-950 sm:text-3xl md:text-4xl">
              Explore Key Research Areas
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-600 sm:text-base">
              Discover the research fields exploring new technologies,
              advancing engineering, and solving real-world challenges.
            </p>
          </div>

          <NavLink
            to="/"
            className="inline-flex w-fit shrink-0 items-center gap-2 text-sm font-semibold text-blue-950 transition-colors hover:text-amber-600 focus-visible:outline-2 focus-visible:outline-offset-4 sm:text-base"
          >
            View all research areas
            <ArrowRight className="h-4 w-4 shrink-0" />
          </NavLink>
        </div>

        {/* Research area filters */}
        <div
          className="mt-7 grid grid-cols-1 gap-3 min-[400px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          aria-label="Filter research areas"
        >
          {data.map((area) => {
            const isActive = activeArea === area;

            return (
              <button
                key={area}
                type="button"
                onClick={() => setActiveArea(area)}
                aria-pressed={isActive}
                className={`flex min-h-12 min-w-0 items-center justify-center rounded-lg border px-3 py-3 text-center text-sm font-medium leading-5 transition-colors duration-200 sm:px-4 sm:text-base ${
                  isActive
                    ? "border-blue-950 bg-blue-950 text-white shadow-md"
                    : "border-gray-200 bg-white text-blue-950 hover:border-amber-500 hover:bg-amber-50"
                }`}
              >
                {area}
              </button>
            );
          })}
        </div>

        {/* Selected research area */}
        <div className="mt-5 rounded-lg bg-gray-50 p-4 sm:p-5">
          <p className="text-sm text-gray-600">
            Selected research area:
          </p>

          <p className="mt-1 break-words text-base font-semibold text-blue-950 sm:text-lg">
            {activeArea}
          </p>
        </div>
      </div>
    </section>
  );
};

export default ResearchImpact;
