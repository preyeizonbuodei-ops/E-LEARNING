
import {
  BookCheck,
  User,
  Trophy,
  ChartNoAxesCombined,
  Globe,
} from "lucide-react";
import { motion } from "motion/react";

function ResearchEvents() {
  const statistics = [
    {
      icon: BookCheck,
      number: "2,000+",
      label: "Research Publications",
    },
    {
      icon: User,
      number: "680+",
      label: "Research Projects",
    },
    {
      icon: Trophy,
      number: "6",
      label: "Patent Fields",
    },
    {
      icon: ChartNoAxesCombined,
      number: "10+",
      label: "Active Researchers",
    },
    {
      icon: Globe,
      number: "10+",
      label: "Industry Collaborations",
    },
  ];

  return (
    <section className="w-full px-4 py-8 sm:px-6 sm:py-10 md:px-8 lg:px-12">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
        className="mx-auto grid w-full max-w-7xl grid-cols-2 gap-3 rounded-xl border border-gray-100 bg-white p-4 shadow-md sm:gap-4 sm:p-5 md:grid-cols-3 xl:grid-cols-5"
      >
        {statistics.map((stat, index) => {
          const Icon = stat.icon;

          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="flex min-w-0 flex-col items-center justify-center gap-3 rounded-lg p-3 text-center transition-colors duration-300 hover:bg-blue-50 sm:flex-row sm:gap-3 sm:p-4 sm:text-left"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-700 sm:h-12 sm:w-12">
                <Icon className="h-6 w-6" strokeWidth={1.8} />
              </div>

              <div className="min-w-0">
                <h2 className="text-xl font-bold text-blue-950 sm:text-2xl">
                  {stat.number}
                </h2>

                <p className="mt-1 break-words text-xs leading-5 text-gray-600 sm:text-sm">
                  {stat.label}
                </p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}

export default ResearchEvents;
