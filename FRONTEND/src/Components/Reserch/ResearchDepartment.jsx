
import { motion } from "motion/react";
import {
  ArrowRight,
  Settings,
  RobotArm,
  School,
  Zap,
  Fuel,
  FlaskConical,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const departments = [
  {
    name: "Mechanical Engineering",
    icon: Settings,
    color: "bg-amber-500",
  },
  {
    name: "Mechatronics Engineering",
    icon: RobotArm,
    color: "bg-cyan-600",
  },
  {
    name: "Civil Engineering",
    icon: School,
    color: "bg-green-600",
  },
  {
    name: "Electrical Electronics Engineering",
    icon: Zap,
    color: "bg-orange-500",
  },
  {
    name: "Petroleum and Gas Engineering",
    icon: Fuel,
    color: "bg-blue-950",
  },
  {
    name: "Chemical Engineering",
    icon: FlaskConical,
    color: "bg-emerald-600",
  },
];

const ResearchDepartment = () => {
  return (
    <section className="w-full overflow-hidden px-4 py-10 sm:px-6 sm:py-14 md:px-8 lg:px-12 lg:py-16">
      {/* Section heading */}
      <div className="mx-auto mb-8 w-full max-w-7xl sm:mb-10">
        <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-amber-500 sm:text-base">
          Explore
        </p>

        <h2 className="text-2xl font-bold leading-tight text-gray-900 sm:text-3xl md:text-4xl">
          Our Engineering Departments
        </h2>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-600 sm:text-base">
          Discover the engineering disciplines driving research, innovation,
          and practical solutions to real-world challenges.
        </p>
      </div>

      {/* Department cards */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.5 }}
        className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-4 min-[400px]:grid-cols-2 md:grid-cols-3 xl:grid-cols-6"
      >
        {departments.map((department, index) => {
          const Icon = department.icon;

          return (
            <motion.article
              key={department.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ y: -5 }}
              className={`flex min-w-0 flex-col items-center rounded-xl ${department.color} p-5 text-center text-white shadow-md transition-shadow duration-300 hover:shadow-xl sm:p-6`}
            >
              <div className="mb-4 flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white/20 sm:h-[72px] sm:w-[72px]">
                <Icon
                  className="h-8 w-8 sm:h-9 sm:w-9"
                  strokeWidth={1.8}
                  aria-hidden="true"
                />
              </div>

              <h3 className="flex min-h-12 w-full items-center justify-center text-sm font-bold leading-5 sm:text-base">
                {department.name}
              </h3>

              <NavLink
                to="/"
                className="mt-4 inline-flex items-center justify-center gap-2 rounded-md px-2 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Learn More
                <ArrowRight className="h-4 w-4 shrink-0" />
              </NavLink>
            </motion.article>
          );
        })}
      </motion.div>
    </section>
  );
};

export default ResearchDepartment;
