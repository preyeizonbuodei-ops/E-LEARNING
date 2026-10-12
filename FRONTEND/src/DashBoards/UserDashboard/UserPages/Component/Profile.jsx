
import { useAuthStore } from "../../../../Store/AuthStore";
import {
    UserRound,
    Mail,
    GraduationCap,
    Building2,
    BookOpen,
    Hash,
    ShieldCheck,
    CalendarDays,
    UserCircle,
    Sparkles,
    Clock3,
} from "lucide-react";

const Profile = () => {
    const { user } = useAuthStore();

    const displayValue = (value) => {
        if (value === undefined || value === null || value === "") {
            return "Not provided";
        }

        return value;
    };

    const formatDate = (date) => {
        if (!date) return "Not available";

        const parsedDate = new Date(date);

        if (Number.isNaN(parsedDate.getTime())) {
            return "Not available";
        }

        return parsedDate.toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });
    };

    const fullName =
        user?.fullName ||
        user?.username ||
        "Student";

    const initials = fullName
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0].toUpperCase())
        .join("");

    const personalInfo = [
        {
            label: "Username",
            value: displayValue(user?.username),
            icon: UserCircle,
        },
        {
            label: "Email address",
            value: displayValue(user?.email),
            icon: Mail,
        },
    ];

    const academicInfo = [
        {
            label: "Faculty",
            value: "Engineering",
            icon: Building2,
        },
        {
            label: "Department",
            value: displayValue(user?.department),
            icon: GraduationCap,
        },
        {
            label: "Academic level",
            value: user?.level
                ? `Level ${user.level}`
                : "Not provided",
            icon: BookOpen,
        },
        {
            label: "Matric number",
            value: displayValue(user?.matricNumber),
            icon: Hash,
        },
    ];

    const accountInfo = [
        {
            label: "Account role",
            value: displayValue(user?.role),
            icon: ShieldCheck,
        },
        {
            label: "Member since",
            value: formatDate(user?.createdAt),
            icon: CalendarDays,
        },
    ];

    const InfoCard = ({ label, value, icon: Icon }) => (
        <div className="group flex min-w-0 items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4 transition duration-300 hover:border-blue-200 hover:shadow-sm sm:p-5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700 transition duration-300 group-hover:bg-blue-100">
                <Icon size={20} strokeWidth={1.8} />
            </div>

            <div className="min-w-0 flex-1">
                <p className="mb-1 text-sm text-slate-500">
                    {label}
                </p>

                <p className="break-words text-sm font-semibold text-slate-800 sm:text-base">
                    {value}
                </p>
            </div>
        </div>
    );

    const SectionHeader = ({ icon: Icon, title, description }) => (
        <div className="mb-5 flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                <Icon size={20} />
            </div>

            <div>
                <h2 className="text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
                    {title}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                    {description}
                </p>
            </div>
        </div>
    );

    return (
        <main className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
            <div className="mx-auto max-w-6xl">

                {/* Page heading */}
                <div className="mb-7">
                    <div className="mb-2 flex items-center gap-2 text-sm font-medium text-blue-700">
                        <UserRound size={17} />
                        <span>Account</span>
                    </div>

                    <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                        My Profile
                    </h1>

                    <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
                        Manage your personal details and view your academic
                        information in one place.
                    </p>
                </div>

                {/* Profile hero */}
                <section className="relative mb-8 overflow-hidden rounded-3xl bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-800 p-6 shadow-lg shadow-blue-950/10 sm:p-8">
                    {/* Decorative background elements */}
                    <div className="pointer-events-none absolute -right-12 -top-20 h-64 w-64 rounded-full border border-white/10" />
                    <div className="pointer-events-none absolute -right-2 -top-10 h-44 w-44 rounded-full border border-white/10" />
                    <div className="pointer-events-none absolute -bottom-24 right-1/3 h-48 w-48 rounded-full bg-blue-400/10 blur-2xl" />

                    <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center">
                        {/* Avatar */}
                        <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-3xl border border-white/20 bg-white/10 text-3xl font-bold text-white shadow-inner backdrop-blur-sm sm:h-28 sm:w-28 sm:text-4xl">
                            {initials || "S"}
                        </div>

                        {/* Identity */}
                        <div className="min-w-0 flex-1">
                            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-medium text-blue-100">
                                <Sparkles size={14} />
                                Student Profile
                            </div>

                            <h2 className="break-words text-2xl font-bold tracking-tight text-white sm:text-3xl">
                                {fullName}
                            </h2>

                            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-blue-100">
                                <span className="inline-flex items-center gap-2">
                                    <GraduationCap size={17} />
                                    {displayValue(user?.department)}
                                </span>

                                <span className="inline-flex items-center gap-2">
                                    <Mail size={16} />
                                    <span className="break-all">
                                        {displayValue(user?.email)}
                                    </span>
                                </span>
                            </div>
                        </div>

                        {/* Account status */}
                        <div className="flex shrink-0 items-center gap-2 self-start rounded-2xl border border-emerald-300/20 bg-emerald-400/10 px-4 py-3 text-sm font-medium text-emerald-100 sm:self-center">
                            <span className="h-2 w-2 rounded-full bg-emerald-400" />
                            Account overview
                        </div>
                    </div>
                </section>

                {/* Personal information */}
                <section className="mb-8 rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-7">
                    <SectionHeader
                        icon={UserRound}
                        title="Personal information"
                        description="Your basic account and contact details."
                    />

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        {personalInfo.map((item) => (
                            <InfoCard
                                key={item.label}
                                {...item}
                            />
                        ))}
                    </div>
                </section>

                {/* Academic information */}
                <section className="mb-8 rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-7">
                    <SectionHeader
                        icon={GraduationCap}
                        title="Academic information"
                        description="Your current academic details and programme information."
                    />

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        {academicInfo.map((item) => (
                            <InfoCard
                                key={item.label}
                                {...item}
                            />
                        ))}
                    </div>
                </section>

                {/* Account information */}
                <section className="mb-8 rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-7">
                    <SectionHeader
                        icon={ShieldCheck}
                        title="Account information"
                        description="Details about your StudStore account."
                    />

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        {accountInfo.map((item) => (
                            <InfoCard
                                key={item.label}
                                {...item}
                            />
                        ))}
                    </div>
                </section>

                {/* Footer note */}
                <div className="flex items-start gap-3 rounded-2xl border border-blue-100 bg-blue-50/70 p-4">
                    <Clock3
                        size={19}
                        className="mt-0.5 shrink-0 text-blue-700"
                    />

                    <div>
                        <p className="text-sm font-semibold text-slate-800">
                            Keep your information up to date
                        </p>

                        <p className="mt-1 text-sm leading-6 text-slate-600">
                            Accurate academic details help StudStore display
                            the courses and learning materials relevant to you.
                        </p>
                    </div>
                </div>

            </div>
        </main>
    );
};

export default Profile;
