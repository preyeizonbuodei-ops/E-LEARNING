import { useState  } from "react"
import Input from "../Components/Register/InputConponents";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../Store/AuthStore";
import { motion } from "motion/react";
import { Lock, LockKeyholeOpen, Loader } from "lucide-react";
const ResetPassword = () => {

    const initialValues = { password: "", confirmPassword: "" }
    const [ formValues, setFormValues ] = useState(initialValues);
    const [ formErrors, SetFormErrors ] = useState({});
    const { ResetPassword } = useAuthStore();
    const navigate = useNavigate();
    const [ isLoading, setIsLoading ] = useState(false)
    const [ isSubmit, setIsSubmit ] = useState(false)


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value })
    }

    const validate = (values) => {
        const errors = {};

        if(!values.password) {
            errors.password = "Enter Password"
        }
        
        if(!values.confirmPassword) {
            errors.confirmPassword = "Enter Forget Password"
        }
        if( values.password && 
            values.confirmPassword && 
            values.password !== values.confirmPassword) {
            errors.confirmPassword = "Passwords don't match"
        }

        return errors;

    }

    const handleSubmit = async(e) => {
        e.preventDefault();

            const errors = validate(formValues);

            SetFormErrors(errors);

            if (Object.keys(errors).length > 0) {
                return;
            }

            setIsLoading(true);
            setIsSubmit(true);

        try {
            const response = await ResetPassword(
                formValues.password,
                formValues.confirmPassword
            )

            if(response.success) {
                navigate('/login')
            } else{
                console.log("Invalid")
            }
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

  return (
    
    <>
        <motion.div 
        initial={{ opacity: 0, y: 33 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.88 }}
        className="w-full min-h-screen relative flex justify-center items-center">
            <div className="shadow-[0_2px_20px_rgba(0,0,0,0.12)] w-90 rounded-lg bg-white ">
                <div className="text-center mt-5 mb-5">
                    <h1 className="text-[29px] text-blue-950 font-bold text center ">Reset Password</h1>
                </div>
                <div className="ml-5 mr-5">
                    <form onSubmit={handleSubmit} className="bg-white">
                        <Input 
                        inputLabel="password"
                        icon={Lock}
                        placeholder="Enter Password"
                        name="password"
                        type="password"
                        value={formValues.password}
                        onChange={handleChange}
                        />
                        <p className = "text-red-500 text-[12px]">{formErrors.password}</p>

                        <Input 
                        inputLabel="ConfirmPasswrord"
                        icon={LockKeyholeOpen}
                         placeholder="Enter confirm password"
                         name='confirmPassword'
                         type="password"
                         value={formValues.confirmPassword}
                        onChange={handleChange}
                        />
                        <p className = "text-red-500 text-[12px]">{formErrors.confirmPassword}</p>

                        <motion.button 
                            type="submit"
                            disabled={isLoading}
                            whileHover={isLoading ? undefined : { scale: 1.02 }}
                            className={`w-full py-3 rounded-lg mb-9 font-semibold transition-all duration-200 bg-blue-950 text-white ${isLoading ? "cursor-not-allowed opacity-70" : "cursor-pointer hover:bg-amber-500 hover:scale-[1.02] hover:shadow-lg"}`}
                        >

                            {isLoading  ? (
                                <>
                                    <Loader className="animate-spin inline-block mr-2" size={20} />
                                    
                                </>
                            ) : (
                                "Submit"
                            )}
                             
                   
                        </motion.button>
                    </form>
                </div>
            </div>
        </motion.div>
    </>
  )
}

export default ResetPassword