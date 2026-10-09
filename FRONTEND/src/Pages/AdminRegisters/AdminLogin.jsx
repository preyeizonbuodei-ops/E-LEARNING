
import Input from "../../Components/Register/InputConponents";
import { useState } from "react";
import {
    GraduationCap,
    KeyIcon,
    Loader,
    Lock,
    Mail,
    User,
    UserCheck
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { AdminRegister as useAdminRegister } from "../../Store/AdminStore";

const AdminLogin= () => {
    const initialValues = {
        email: "",
        password: "",
        adminKey: ""
    };

    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);

    const { login, isLoading, error } = useAdminRegister();

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormValues({
            ...formValues,
            [name]: value
        });
    };

    const validate = (values) => {
        const errors = {};

        if (!values.email) {
            errors.email = "Email is required";
        }

        if (!values.password) {
            errors.password = "Password is required";
        }

        if (!values.adminKey) {
            errors.adminKey = "Admin key is required";
        }

        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isLoading) {
            return;
        }

        const errors = validate(formValues);

        setFormErrors(errors);
        setIsSubmit(true);

        if (Object.keys(errors).length > 0) {
            return;
        }

        try {
            await login (
                formValues.email,
                formValues.password,
                formValues.adminKey
            );

            console.log("Loggedin successfully");
 
            navigate("/admin-dashboard", {
               
            });

        } catch (error) {
            console.log("STATUS:", error.response?.status);
            console.log("DATA:", error.response?.data);
            console.log("MESSAGE:", error.response?.data?.message);

            console.log(error);
        }
    };

    return (
        <>
            <section>
                <motion.div
                    initial={{ opacity: 0, y: 33 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.88 }}
                    className="relative min-h-screen w-full flex items-center justify-center p-5"
                >
                    <div className="w-130 min-h-120 bg-gray-10 shadow-[0_2px_20px_rgba(0,0,0,0.12)] mx-3 rounded-lg">

                        <div className="flex flex-col items-center mt-9">
                            <UserCheck className="size-19 border rounded-full p-3 bg-blue-950 text-white" />

                            <h1 className="text-[33px] font-bold text-blue-950 mb-3">
                                Admin Login
                            </h1>
                        </div>

                        <form onSubmit={handleSubmit} className="mx-3">

                            <Input
                                placeholder="Email"
                                inputLabel="Email"
                                icon={Mail}
                                type="email"
                                name="email"
                                value={formValues.email}
                                onChange={handleChange}
                            />

                            <p className="text-red-500">
                                {formErrors.email}
                            </p>


                            <Input
                                placeholder="Password"
                                inputLabel="Password"
                                icon={Lock}
                                type="password"
                                name="password"
                                value={formValues.password}
                                onChange={handleChange}
                            />

                            <p className="text-red-500">
                                {formErrors.password}
                            </p>


                            <Input
                                placeholder="Admin key"
                                inputLabel="Admin key"
                                icon={GraduationCap}
                                type="password"
                                name="adminKey"
                                value={formValues.adminKey}
                                onChange={handleChange}
                            />

                            <p className="text-red-500">
                                {formErrors.adminKey}
                            </p>


                            {error && (
                                <p className="text-red-500 text-center mb-3">
                                    {error}
                                </p>
                            )}


                            <motion.button
                                type="submit"
                                disabled={isLoading}
                                whileHover={
                                    isLoading
                                        ? undefined
                                        : { scale: 1.02 }
                                }
                                className={`bg-blue-500 text-center text-[20px] w-full py-2 rounded-lg font-bold text-white mb-4 transition duration-500 ${
                                    isLoading
                                        ? "cursor-not-allowed opacity-75"
                                        : "cursor-pointer hover:bg-amber-500 hover:scale-[1.02] hover:shadow-lg"
                                }`}
                            >
                                {isLoading ? (
                                    <>
                                        <Loader
                                            className="animate-spin inline-block mr-2"
                                            size={20}
                                        />
                                        Loging in...
                                    </>
                                ) : (
                                    "LogIn"
                                )}
                            </motion.button>


                            <div className="flex justify-between mb-6">
                                <h3>
                                    Don't have an account?
                                </h3>

                                <NavLink
                                    to="/admin-register"
                                    className="text-blue-500"
                                >
                                    Register
                                </NavLink>
                            </div>

                        </form>
                    </div>
                </motion.div>
            </section>
        </>
    );
};

export default AdminLogin;
