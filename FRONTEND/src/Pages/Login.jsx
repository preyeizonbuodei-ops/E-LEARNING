import { motion } from "motion/react";
import Input from "../Components/Register/InputConponents";

import {
    FlaskConical,
    House,
    Loader,
    Lock,
    Mail,
    User,
    Users
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import faculty from "../Image/researching.jpg";
import logo from '../Image/FBLOGO.jpg'
import { useAuthStore } from "../Store/AuthStore";
import { useNavigate } from "react-router-dom";

const UserRegister = () => {

    const Login = useAuthStore((state) => state.Login);

    const initialValues = {
        email: "",
        password: ""
    };

    const [formValues, setFormvalues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [ serverError, setServerError ] = useState();

    const navigate = useNavigate();

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormvalues({
            ...formValues, [name]: value
        });
    };


    // Validation
    const validate = (values) => {

        const errors = {};


        if (!values.email) {
            errors.email = "Email is required";
        }

        if (!values.password) {
            errors.password = "Password is required";
        }

       
        return errors;
    };



    // Handle form submit
    const handleSubmit = async (e) => {

        e.preventDefault();
        setFormErrors(validate(formValues))

       if (isLoading) {
            return;
        }
        setIsSubmit(true);
        
        if (Object.keys(formErrors).length === 0 && isSubmit) {

            setIsLoading(true);

        }

        try {
            const response = await Login(
                formValues.email,
                formValues.password
            )

            if(response.success) {
                navigate('/me')
            }
        } catch (error) {
            console.log(error.response?.data?.message);
            setServerError(error.response?.data?.message || "Something went wrong");
            console.log(error)
            setIsLoading(false)
        }
        
    };


    return (

        <div className="relative min-h-screen w-full bg-gray-100 flex items-center justify-center p-5">

            <motion.div
                initial={{ opacity: 0, y: 33 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.88 }}
                className="
                    flex
                    w-full
                    max-w-5xl
                    overflow-hidden
                    rounded-lg
                    bg-white
                    shadow-[0_2px_20px_rgba(0,0,0,0.12)]
                "
            >

               

                <div className=" relative hidden md:block w-1/2 min-h-[700px] overflow-hidden">

                    <img
                        src={faculty}
                        alt="Faculty of Engineering"
                        className=" absolute inset-0 h-full w-full object-cover "/>

                    {/* Dark overlay */}
                     <div className="absolute inset-0 bg-linear-to-t from-blue-950 via-black/30 to-blue-600"></div>


                    
                    <div className="absolute inset-0 px-10 text-white flex flex-col justify-between ">

                        <div className="flex flex-col mt-5">
                            <div>
                                <img className="size-19  rounded-full mr-3" src={logo} alt="" />
                            </div>
                                
                            <div className="mb-8">
                                <h1 className="font-bold leading-6">FACULTY OF <br /><span className="text-[22px]">ENGINEERING</span></h1>
                                <p className="text-amber-500 text-[13] font-bold">Execellence. Innovation. Impact</p>

                            </div>

                            
                        </div>

                       
                            
                       


                        <div className="mb-3 flex flex-col gap-3">

                            <div className="mb-3">
                                <h1 className="font-bold text-[42px]">Welcome Back</h1>

                                <p>Login to continue to your<br /><span className="text-amber-500 text-[22px] font-bold">Faculty Portal</span></p>
                            </div>

                            <div className="flex items-center gap-3">
                                <div>
                                    <Users className="size-10 border rounded-lg border-amber-500 text-amber-500" />
                                </div>
                                <div>
                                    <h2 className="font-bold">2,000+</h2>
                                    <p className="text-[13px]">Student</p>
                                </div>
                            </div>


                            <div className="flex items-center gap-3">
                                <div>
                                    <User className="size-10 border rounded-lg border-amber-500 text-amber-500" />
                                </div>
                                <div>
                                    <h2 className="font-bold">50+</h2>
                                    <p className="text-[13px]">Lecturers</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div>
                                    <House className="size-10 border rounded-lg border-amber-500 text-amber-500" />
                                </div>
                                <div>
                                    <h2 className="font-bold">6</h2>
                                    <p className="text-[13px]">Departments</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div>
                                    <FlaskConical className="size-10 border rounded-lg border-amber-500 text-amber-500" />
                                </div>
                                <div>
                                    <h2 className="font-bold">30+</h2>
                                    <p className="text-[13px]">Laboratories</p>
                                </div>
                            </div>

                        </div>

                    </div>

                </div>


               

                <div className="
                    w-full
                    md:w-1/2
                    p-6
                    md:p-8
                    flex
                    flex-col justify-center
                ">

                    <form onSubmit={handleSubmit}>

                        {/* Heading */}

                        <h1
                            className="
                                text-blue-950
                                text-center 
                                text-[23px]
                                font-bold
                                relative
                                after:absolute
                                after:bg-amber-500
                                after:top-9
                                after:left-1/2
                                after:-translate-x-1/2
                                after:rounded-lg
                                after:w-15
                                after:h-1
                                mb-6
                            "
                        >
                            Login
                        </h1>


                        {/* Email */}

                        <Input
                            inputLabel="Email"
                            icon={Mail}
                            type="email"
                            placeholder="example@gmail.com"
                            name="email"
                            value={formValues.email}
                            onChange={handleChange}
                        />

                        <p className="text-red-500">{formErrors.email}</p>


                        {/* Password */}

                        <Input
                            inputLabel="Password"
                            icon={Lock}
                            type="password"
                            placeholder="Enter password"
                            name="password"
                            value={formValues.password}
                            onChange={handleChange}
                        />

                        <p className="text-red-500">{formErrors.password}</p>
                        


                        {/* Register Button */}

                        <motion.button
                            
                            className="
                                bg-blue-950
                                font-bold
                                hover:bg-amber-500
                                transition
                                duration-500
                                px-8
                                py-2
                                text-white
                                hover:cursor-pointer
                                w-full
                                rounded-sm
                                mb-2
                            "
                            type="submit"
                        >

                            {isLoading ? (

                                <Loader
                                    className="
                                        size-7
                                        text-amber-500
                                        mx-auto
                                        animate-spin
                                    "
                                />

                            ) : (

                                "Register"

                            )}

                        </motion.button>
                        
                        <p className="text-red-500">{serverError}</p>

                        {/* Login */}

                        <div className="flex justify-between mt-5">

                            <p className="mb-2  text=amber-500 items-right">
                                forgot password?
                            </p>

                            <NavLink to='/forget-password'>click me</NavLink>

                        </div>

                        <div className="flex justify-start gap-7 mt-12">
                            <h1>Don't have an Account? </h1>
                            <NavLink onClick={Login} className="text-amber-500 font-italisize" to="/register">Register</NavLink>
                        </div>
                        

                    </form>

                </div>

            </motion.div>

        </div>
    );
};

export default UserRegister;