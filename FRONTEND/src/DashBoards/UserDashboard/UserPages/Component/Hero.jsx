import { Home, MapMinusIcon, Scale } from "lucide-react";
import faculty from "../../../../Image/fb2.jpg";
import {useAuthStore} from "../../../../Store/AuthStore";

const Hero = () => {

    
    const { user } = useAuthStore();

    console.log("USER DATA:", user);

    return (
        <>
            <div>
                <section className="relative h-60 w-full overflow-hidden">

                    <div>
                        <img
                            className="absolute inset-0 h-full w-full object-cover rounded-lg"
                            src={faculty}
                            alt=""
                        />
                    </div>

                    <div className="absolute inset-0 bg-linear-to-r from-black via-black/50 to-transparent"></div>

                    <div className="flex text-white">

                        <div className="relative z-20 flex flex-col h-[calc(50vh-80px)] justify-around ml-4">

                            <div>
                                <h1 className="font-bold text-[35px]">
                                    Welcome back, {user?.username} 👋
                                </h1>

                                <p className="text-[18px]">
                                    Keep pushing, your future in engineering is taking shape
                                </p>
                            </div>

                            <div className="flex gap-5">

                                {/* Department */}
                                <div>
                                    <div className="flex items-center gap-2 bg-blue-950/50 py-2 px-4 rounded-lg">

                                        <Home className="bg-violet-800 text-white rounded-lg p-1 size-10" />

                                        <div>
                                            <p className="text-[10px] text-gray-400">
                                                Department
                                            </p>

                                            <h2 className="font-bold text-[12px]">
                                                {user?.department}
                                            </h2>
                                        </div>

                                    </div>
                                </div>


                                {/* Level */}
                                <div>
                                    <div className="flex items-center gap-2 bg-blue-950/50 py-2 px-4 rounded-lg">

                                        <Scale className="bg-violet-800 text-white rounded-lg p-1 size-10" />

                                        <div>
                                            <p className="text-[10px] text-gray-400">
                                                Level
                                            </p>

                                            <h2 className="font-bold text-[12px]">
                                                {user?.level}
                                            </h2>
                                        </div>

                                    </div>
                                </div>


                                {/* Matric Number */}
                                <div>
                                    <div className="flex items-center gap-2 bg-blue-950/50 py-2 px-4 rounded-lg">

                                        <MapMinusIcon className="bg-violet-800 text-white rounded-lg p-1 size-10" />

                                        <div>
                                            <p className="text-[10px] text-gray-400">
                                                Matric Number
                                            </p>

                                            <h2 className="font-bold text-[12px]">
                                                {user?.matricNumber}
                                            </h2>
                                        </div>

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