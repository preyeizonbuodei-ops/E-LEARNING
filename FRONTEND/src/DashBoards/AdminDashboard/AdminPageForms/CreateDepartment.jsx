
import { useState } from "react";
import { useDepartmentStore } from "../../UserDashboard/DepartmentStore/DepartmentStore";

const CreateDepartment = () => {
    const createDepartment = useDepartmentStore(
        (state) => state.createDepartment
    );
    const isLoading = useDepartmentStore((state) => state.isLoading);
    const error = useDepartmentStore((state) => state.error);

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        history: "",
        image: "",
    });

    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccess("");

        try {
            await createDepartment(formData);

            setSuccess("Department created successfully!");

            setFormData({
                name: "",
                description: "",
                history: "",
                image: "",
            });
        } catch {
            // The Zustand store handles the error message.
        }
    };

    return (
        <div className="mx-auto max-w-2xl p-6">
            <h1 className="mb-6 text-2xl font-bold">
                Create Department
            </h1>

            {success && (
                <p className="mb-4 text-green-600">{success}</p>
            )}

            {error && (
                <p className="mb-4 text-red-600">{error}</p>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label htmlFor="name" className="mb-1 block">
                        Department Name
                    </label>
                    <input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full rounded border p-3"
                        placeholder="Mechatronics Engineering"
                    />
                </div>

                <div>
                    <label htmlFor="description" className="mb-1 block">
                        Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        rows={4}
                        className="w-full rounded border p-3"
                        placeholder="Describe the department..."
                    />
                </div>

                <div>
                    <label htmlFor="history" className="mb-1 block">
                        Department History
                    </label>
                    <textarea
                        id="history"
                        name="history"
                        value={formData.history}
                        onChange={handleChange}
                        required
                        rows={5}
                        className="w-full rounded border p-3"
                        placeholder="Enter the department's history..."
                    />
                </div>

                <div>
                    <label htmlFor="image" className="mb-1 block">
                        Image URL
                    </label>
                    <input
                        id="image"
                        name="image"
                        type="url"
                        value={formData.image}
                        onChange={handleChange}
                        className="w-full rounded border p-3"
                        placeholder="https://example.com/department.jpg"
                    />
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="rounded bg-blue-700 px-5 py-3 text-white disabled:opacity-50"
                >
                    {isLoading ? "Creating..." : "Create Department"}
                </button>
            </form>
        </div>
    );
};

export default CreateDepartment;
