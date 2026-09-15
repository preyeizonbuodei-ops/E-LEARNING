import { create } from 'zustand';
import axios from 'axios';

const API_URL = "http://localhost:8000/api/v1/user"

axios.defaults.withCredentials = true

export const useAuthStore = create((set) => ({
    user:null,
    isAuthenticated:false,
    error:null,
    isLoading:false,
    isCheckingAuth:true,

    signup: async (
        email,
        password,
        confirmPassword,
        username,
        department,
        matricNumber,
        level
    ) => {
        set({ isLoading: true, error: null });

        console.log("Sending registration request...");

        try {
            const response = await axios.post(`${API_URL}/register`, {
                username,
                email,
                password,
                confirmPassword,
                department,
                level,
                matricNumber
            });

            set({
                user: response.data.newUser,
                isAuthenticated: true,
                isLoading: false
            });

            return response.data;

        } catch (error) {
            console.log("Zustand error:", error.response?.data)
            set({
                
                error: error.response?.data?.message || "Error registering",
                isLoading: false
                
            });
            
            throw error;
        }
    },

    Login: async (email, password) => {

        
        try {
            const response = await axios.post(`${API_URL}/login`, {
                email, 
                password
            })

            set({
                user: response.data.newUser,
                isAuthenticated: true,
                isLoading: false
            });

            return response.data;
        } catch (error) {
            console.log("Zustand error:", error.response?.data)
                set({
                error: error.response?.data?.message || "Error registering",
                isLoading: false
                
            });
            
            throw error;
        }
    },

    verifyEmailSent: async (email, verificationCode) => {
        try {
            const response = await axios.patch(`${API_URL}/verify-verification-code`, {
                email,
                verificationCode
            });

            return response.data;
            
        } catch (error) {
            console.log(error);
            throw error;
        }
    },

    Logout: async () => {
        try {
            const response = await  axios.post(`${API_URL}/logout`, {
                userId
            })

            set({
                isAuthenticated: false,
                isLoading: false,
            })

            return response.data;

            
        } catch (error) {
            console.log(error)
        }
    },

    ForgotPassword: async (email) => {
        try {
            const response = await axios.patch(`${API_URL}/forgot-password`, {
                email
            }) 

            set({
                isLoading: false,
            })

            return response.data;

        } catch (error) {
            console.log(error)
        }
    },

    VerifyForgetPasswordCode: async (providedCodeValue) => {
        try {
            const response = await axios.patch(`${API_URL}/verify-forgot-password`, {

            providedCodeValue

        });

            return response.data;
        } catch (error) {
            console.log(error)
            throw error;
        }
        
    },


    ResetPassword: async (password, confirmPassword) => {
        try {
            const response = await axios.patch(`${API_URL}/reset-password`, {
                password, 
                confirmPassword
            })

            set({
                isLoading: false,
            })


            return response.data;
        } catch (error) {
            console.log(error)
        }
    }

}))