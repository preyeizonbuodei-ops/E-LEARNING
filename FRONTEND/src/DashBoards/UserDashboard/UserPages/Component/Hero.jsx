import { Home, MapMinusIcon, Scale } from "lucide-react";
import faculty from "../../../../Image/fb2.jpg";
import { useAuthStore } from "../../../../Store/AuthStore";

const Hero = () => {
    const { user } = useAuthStore();

    console.log("USER DATA:", user);

    return (
        <>
            <div className="w-full">
                <section className="relative min-h-[420px] w-full overflow-hidden rounded-lg sm:min-h-[400px] lg:h-60 lg:min-h-0">

                    {/* Background Image */}
                    <img
                        className="absolute inset-0 h-full w-full object-cover"
                        src={faculty}
                        alt=""
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-linear-to-r from-black via-black/60 to-black/20" />

                    {/* Content */}
                    <div className="relative z-20 flex h-full w-full items-center px-4 py-8 text-white sm:px-6 lg:px-8 lg:py-0">

                        <div className="flex w-full flex-col justify-center gap-8">

                            {/* Welcome Text */}
                            <div className="max-w-3xl">
                                <h1 className="text-2xl font-bold leading-tight sm:text-3xl lg:text-[35px]">
                                    Welcome {user?.username} 👋
                                </h1>

                                <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-200 sm:text-base lg:text-[18px]">
                                    Keep pushing, your future in engineering is taking shape
                                </p>
                            </div>

                            {/* Student Information */}
                            <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4 lg:max-w-3xl">

                                {/* Department */}
                                <div className="flex items-center gap-3 rounded-lg bg-blue-950/60 px-3 py-3 backdrop-blur-sm sm:px-4">
                                    <Home className="size-9 shrink-0 rounded-lg bg-violet-800 p-2 text-white sm:size-10" />

                                    <div className="min-w-0">
                                        <p className="text-[10px] text-gray-400">
                                            Department
                                        </p>

                                        <h2 className="truncate text-xs font-bold sm:text-sm">
                                            {user?.department}
                                        </h2>
                                    </div>
                                </div>

                                {/* Level */}
                                <div className="flex items-center gap-3 rounded-lg bg-blue-950/60 px-3 py-3 backdrop-blur-sm sm:px-4">
                                    <Scale className="size-9 shrink-0 rounded-lg bg-violet-800 p-2 text-white sm:size-10" />

                                    <div className="min-w-0">
                                        <p className="text-[10px] text-gray-400">
                                            Level
                                        </p>

                                        <h2 className="truncate text-xs font-bold sm:text-sm">
                                            {user?.level}
                                        </h2>
                                    </div>
                                </div>

                                {/* Matric Number */}
                                <div className="flex items-center gap-3 rounded-lg bg-blue-950/60 px-3 py-3 backdrop-blur-sm sm:px-4">
                                    <MapMinusIcon className="size-9 shrink-0 rounded-lg bg-violet-800 p-2 text-white sm:size-10" />

                                    <div className="min-w-0">
                                        <p className="text-[10px] text-gray-400">
                                            Matric Number
                                        </p>

                                        <h2 className="truncate text-xs font-bold sm:text-sm">
                                            {user?.matricNumber}
                                        </h2>
                                    </div>
                                </div>

                            </div>

                        </div>

                    </div>

                </section>
            </div>
        </>
    );
};

export default Hero;