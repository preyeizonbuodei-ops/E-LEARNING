import { motion } from "motion/react";
import { NavLink, useNavigate } from "react-router-dom";
import Input from '../Components/Register/InputConponents'
import { Key, LockKeyholeIcon } from "lucide-react";
import { useState } from "react";
import { useAuthStore } from "../Store/AuthStore";

const ChangePassword = () => {

    const navigate = useNavigate();

    const intialValues = { oldPassword: "", newPassword: "", confirmNewPassword: ""};
    const [ formValues, setFormValues ] = useState(intialValues)
    const [ formErrors, setFormErrors ] = useState({ });
    const { signup, isLoading, error } = useAuthStore();

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues))

        if(Object.keys(error).lenght > 0){
            return 
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormValues({ ...formValues, [name]:value });
    
    }

    const validate = (values) => {
        const errors = {};
        if(!values.oldPassword) {
            errors.oldPassword = "Old Password is required"
        }

        if(!values.newPassword) {
            errors.newPassword = "New Password is required"
        }

        if(!values.confirmNewPassword) {
            errors.confirmNewPassword = " Field Catn't be empty "
        }
        return errors
    }

  return (
    <motion.div
        initial={{ opacity: 0, y: 33 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.88 }}
        className="w-full min-h-screen flex relative justify-center items-center">

        <div className="w-140 min-h-80 rounded-lg shadow-[0_2px_12px_rgba(0,0,0,0.12)]">
            <h1 className="text-[29px] relative mt-5 text-blue-950 mb-6 text-center font-bold after:absolute after:-bottom-2           after:left-50 rounded-lg after:h-[2px] after:w-40 after:bg-blue-950">Change Password</h1>
            <div className="mr-9 ml-9">
                <form onSubmit={handleSubmit}> 
                    <div className="">
                        <Input 
                            type='password'
                            icon={Key}
                            inputLabel="Enter old Password"
                            name="oldPassword"
                            value={formValues.oldPassword}    
                            onChange={handleChange}
                        /> 
                        <p className="text-red-500">{formErrors.oldPassword}</p>
                    </div> 

                    <div>
                        <Input 
                            type='password'
                            icon={Key}
                            inputLabel="Enter new password"
                            name="newPassword"    
                            value={formValues.newPassword}
                            onChange={handleChange}
                        />
                        <p className="text-red-500">{formErrors.newPassword}</p>
                    </div> 

                    <div>
                        <Input 
                            type='password'
                            icon={LockKeyholeIcon}
                            inputLabel="confirm new password"
                            name="confirmNewPassword"   
                            value={formValues.confirmNewPassword}
                            onChange={handleChange} 
                        />
                        <p className="text-red-500">{formErrors.confirmNewPassword}</p>
                    </div> 

                    <button type="submit" className="w-full py-3 rounded-lg font-semibold bg-blue-950 text-white mb-9 hover:bg-amber-500 hover:cursor-pointer mt-3 transition duration-500">Submit</button>
                </form>
            </div> 
        </div>

    </motion.div>
  )
}

export default ChangePassword