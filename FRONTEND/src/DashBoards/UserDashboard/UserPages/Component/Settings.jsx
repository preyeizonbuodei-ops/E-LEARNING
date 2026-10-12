
import { NavLink } from "react-router-dom";
import {
    Settings2,
    ShieldCheck,
    LockKeyhole,
    ChevronRight,
    Bell,
    Palette,
    UserRound,
    KeyRound,
    ArrowUpRight,
    Sparkles,
} from "lucide-react";

const Settings = () => {
    const settingsGroups = [
        {
            title: "Account",
            description: "Manage your personal account information.",
            items: [
                {
                    title: "Profile information",
                    description:
                        "View your personal and academic details.",
                    icon: UserRound,
                    to: "/me/profile",
                },
            ],
        },
        {
            title: "Security",
            description: "Keep your StudStore account secure.",
            items: [
                {
                    title: "Change password",
                    description:
                        "Update your password to help protect your account.",
                    icon: LockKeyhole,
                    to: "/me/change-password",
                },
            ],
        },
    ];

    return (
        <main className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
            <div className="mx-auto max-w-5xl">

                {/* Page heading */}
                <div className="mb-8">
                    <div className="mb-2 flex items-center gap-2 text-sm font-medium text-blue-700">
                        <Settings2 size={17} />
                        <span>Account preferences</span>
                    </div>

                    <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                        Settings
                    </h1>

                    <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
                        Manage your account, security, and personal
                        preferences for your StudStore learning experience.
                    </p>
                </div>

                {/* Hero card */}
                <section className="relative mb-8 overflow-hidden rounded-3xl bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-800 p-6 shadow-lg shadow-blue-950/10 sm:p-8">
                    <div className="pointer-events-none absolute -right-12 -top-16 h-56 w-56 rounded-full border border-white/10" />
                    <div className="pointer-events-none absolute -right-2 -top-6 h-36 w-36 rounded-full border border-white/10" />

                    <div className="relative flex items-start gap-4">
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-white">
                            <Settings2 size={27} />
                        </div>

                        <div className="min-w-0">
                            <div className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium text-blue-100">
                                <Sparkles size={13} />
                                Your account
                            </div>

                            <h2 className="text-xl font-bold text-white sm:text-2xl">
                                Make StudStore yours
                            </h2>

                            <p className="mt-2 max-w-lg text-sm leading-6 text-blue-100 sm:text-base">
                                Your account settings help you manage your
                                information and keep your learning account
                                secure.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Settings groups */}
                <div className="space-y-8">
                    {settingsGroups.map((group) => (
                        <section key={group.title}>
                            <div className="mb-4">
                                <h2 className="text-lg font-bold text-slate-900">
                                    {group.title}
                                </h2>

                                <p className="mt-1 text-sm text-slate-500">
                                    {group.description}
                                </p>
                            </div>

                            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                                {group.items.map((item, index) => {
                                    const Icon = item.icon;

                                    return (
                                        <NavLink
                                            key={item.title}
                                            to={item.to}
                                            className={({ isActive }) =>
                                                `group flex items-center gap-4 p-4 transition duration-200 hover:bg-slate-50 sm:p-5 ${
                                                    index !== group.items.length - 1
                                                        ? "border-b border-slate-100"
                                                        : ""
                                                } ${
                                                    isActive
                                                        ? "bg-blue-50/60"
                                                        : ""
                                                }`
                                            }
                                        >
                                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700 transition group-hover:bg-blue-100">
                                                <Icon size={22} strokeWidth={1.8} />
                                            </div>

                                            <div className="min-w-0 flex-1">
                                                <h3 className="text-sm font-semibold text-slate-900 sm:text-base">
                                                    {item.title}
                                                </h3>

                                                <p className="mt-1 text-sm leading-5 text-slate-500">
                                                    {item.description}
                                                </p>
                                            </div>

                                            <ChevronRight
                                                size={20}
                                                className="shrink-0 text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-blue-700"
                                            />
                                        </NavLink>
                                    );
                                })}
                            </div>
                        </section>
                    ))}
                </div>

                {/* Future preferences */}
                <section className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-white/70 p-5 sm:p-6">
                    <div className="flex items-start gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
                            <Bell size={21} />
                        </div>

                        <div>
                            <h2 className="font-semibold text-slate-800">
                                More preferences coming later
                            </h2>

                            <p className="mt-1 text-sm leading-6 text-slate-500">
                                Notification preferences and appearance
                                options will be added when those features
                                are supported by StudStore.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-5">
                    <p className="text-xs text-slate-500">
                        StudStore · Account settings
                    </p>

                    <NavLink
                        to="/me/profile"
                        className="inline-flex items-center gap-2 text-sm font-medium text-blue-700 transition hover:text-blue-900"
                    >
                        View profile
                        <ArrowUpRight size={16} />
                    </NavLink>
                </footer>

            </div>
        </main>
    );
};

export default Settings;