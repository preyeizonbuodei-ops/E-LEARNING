
import { useEffect, useState } from "react";
import { useAdminMajorAreaStore } from "../../UserDashboard/DepartmentStore/MajorAreaStore";


const AdminCreateMajorArea = () => {
    const {
        departments,
        isLoading,
        error,
        getDepartments,
        createMajorArea,
    } = useAdminMajorAreaStore();

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        history: "",
        image: "",
        department: "",
    });

    const [success, setSuccess] = useState("");

    useEffect(() => {
        getDepartments().catch(() => {});
    }, [getDepartments]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccess("");

        try {
            await createMajorArea(formData);

            setSuccess("Major area created successfully!");

            setFormData({
                name: "",
                description: "",
                history: "",
                image: "",
                department: "",
            });
        } catch (error) {
            // The Zustand store handles the error.
        }
    };

    return (
        <div className="mx-auto max-w-3xl p-6">
            <h1 className="mb-2 text-2xl font-bold text-gray-900">
                Create Major Area
            </h1>

            <p className="mb-6 text-gray-600">
                Add a major area under an existing engineering department.
            </p>

            {success && (
                <p className="mb-4 rounded-lg bg-green-100 p-3 text-green-700">
                    {success}
                </p>
            )}

            {error && (
                <p className="mb-4 rounded-lg bg-red-100 p-3 text-red-700">
                    {error}
                </p>
            )}

            <form
                onSubmit={handleSubmit}
                className="space-y-5 rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
            >
                <div>
                    <label
                        htmlFor="department"
                        className="mb-2 block font-medium text-gray-700"
                    >
                        Department
                    </label>

                    <select
                        id="department"
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        required
                        className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-500"
                    >
                        <option value="">Select a department</option>

                        {departments.map((department) => (
                            <option
                                key={department._id}
                                value={department._id}
                            >
                                {department.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label
                        htmlFor="name"
                        className="mb-2 block font-medium text-gray-700"
                    >
                        Major Area Name
                    </label>

                    <input
                        id="name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Robotics"
                        required
                        className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-500"
                    />
                </div>

                <div>
                    <label
                        htmlFor="description"
                        className="mb-2 block font-medium text-gray-700"
                    >
                        Description
                    </label>

                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Describe this major area..."
                        rows={4}
                        required
                        className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-500"
                    />
                </div>

                <div>
                    <label
                        htmlFor="history"
                        className="mb-2 block font-medium text-gray-700"
                    >
                        History
                    </label>

                    <textarea
                        id="history"
                        name="history"
                        value={formData.history}
                        onChange={handleChange}
                        placeholder="Provide the history of this major area..."
                        rows={5}
                        required
                        className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-500"
                    />
                </div>

                <div>
                    <label
                        htmlFor="image"
                        className="mb-2 block font-medium text-gray-700"
                    >
                        Image URL
                    </label>

                    <input
                        id="image"
                        type="url"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        placeholder="https://example.com/image.jpg"
                        className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-500"
                    />
                </div>

                <button
                    type="submit"
                    disabled={isLoading || departments.length === 0}
                    className="w-full rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {isLoading ? "Processing..." : "Create Major Area"}
                </button>
            </form>
        </div>
    );
};

export default AdminCreateMajorArea;
