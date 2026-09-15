
import Input from '../Components/Register/InputConponents'
import { Key, Loader } from 'lucide-react'
import { motion } from "motion/react";
import { useState } from 'react';
import {  useNavigate } from "react-router-dom";
import { useAuthStore } from "../Store/AuthStore";



const ForgetPasswordSend = () => {

  const initialValue = { email: "" }
  const [ formValues, setFormValues ] = useState(initialValue);
  const [ formErrors, setFormErrors ] = useState({});
  const [ isLoading, setIsLoading ] = useState();
  const {ForgotPassword,  error} = useAuthStore();
  const navigate = useNavigate()


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const errors = validate(formValues);

      setFormErrors(errors);
      setIsLoading(true);

    if (Object.keys(errors).length > 0) {
          setIsLoading(false)
          return;
        }

    try {
        const response = await ForgotPassword(formValues.email)

        console.log(response.data);
        if(response.success) {
          navigate('/verify-forget-password')
        }
      

      console.log("Check yor email")


    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
    
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({...formValues, [name]: value });
  }

  const validate = (values) => {
    const errors = {};
    
    if(!values.email) {
      errors.email = "Please Provide Your Email"
    }
    return errors;
  }

return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 33 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.88 }}
        className='w-full min-h-screen relative flex justify-center items-center'>
        <div className='shadow-[0_2px_12px_rgba(0,0,0,0.12)] w-100 min-h-40 text-center'>
          <h1 className='text-center text-[28px] font-bold mb-2 pt-7'>Forgot Password</h1>
          <div className='mr-8 ml-8'>
            <form onSubmit={handleSubmit} >
              <div>
                <Input 
                  inputLabel="Enter Email For Password Reset Code"
                  icon={Key}
                  name="email"
                  value={formValues.email}
                  onChange={handleChange}
                />
                <p className="text-red-500 font-[9pxpx]">{formErrors.email}</p>
              </div>

              <button 
                disabled={isLoading}
                whilehover={isLoading ? undefined : { scale: 1.02 }}
              type="submit" className="w-full py-3 rounded-lg font-semibold bg-blue-950 text-white mb-9 hover:bg-amber-500 hover:cursor-pointer mt-3 transition duration-500"
              >

              {isLoading ? (
                      <>
                          <Loader className="animate-spin inline-block mr-2" size={20} />
                      </>
                    ) : (
                        "Send Email"
                    )}
              </button>
            </form>  
          </div>
        </div>
      </motion.div>
    </>
  )
}

export default ForgetPasswordSend