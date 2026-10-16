
import { BellRing } from 'lucide-react';
import { useAuthStore } from '../../../../Store/AuthStore';

const UserData = () => {
    const { user } = useAuthStore();

    return (
        <div className="w-full px-3 sm:px-4 md:px-6 py-4">
            <section className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                <div className="w-full min-w-0">
                    <h1 className="font-bold text-blue-950 text-lg sm:text-xl">
                        Student Dashboard
                    </h1>

                    <p className="text-gray-400 text-xs sm:text-[13px] mt-1">
                        Browse Your Resources, Own Your Dashboard, Learn At Your Pace
                    </p>
                </div>

                <div className="flex flex-wrap items-center justify-start gap-3 w-full md:w-auto">
                    <BellRing size={20} className="text-blue-950 shrink-0" />

                    <h1 className="font-semibold text-gray-800 break-words">
                        {user?.username}
                    </h1>

                    <p className="text-sm text-gray-500">
                        Student
                    </p>
                </div>
            </section>
        </div>
    );
};

export default UserData;
