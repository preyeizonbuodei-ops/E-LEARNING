
import { useRef, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { AdminRegister } from "../../Store/AdminStore"


const AdminVerifyEmail = () => {

    const initialValue = [ "", "", "", "", "", "" ];
    const [ code, setCode ] = useState(initialValue);
    const inputRefs = useRef([]);

    const location = useLocation();
    const email = location.state?.email;
    const navigate = useNavigate();
    const { verifyEmailSent } = AdminRegister();

    const handleSubmit = async (e) => {
    e.preventDefault();

    if (!code.every((digit) => digit !== "")) {
        return;
    }

    const sentCode = code.join("");

    console.log("1. ABOUT TO VERIFY");

    try {
        const response = await verifyEmailSent(email, sentCode);

        console.log("2. VERIFY FINISHED");
        console.log("3. RESPONSE:", response);

        console.log("4. ABOUT TO NAVIGATE");

        navigate("/admin-login");

        console.log("5. NAVIGATE CALLED");

    } catch (error) {
        console.log("VERIFY ERROR:", error);
        console.log("STATUS:", error.response?.status);
        console.log("DATA:", error.response?.data);
    }
};


    const handleKeyChange = (index, value) => {

       const digit = value.slice(-1);

       const newCode = [...code];

       newCode[index] = digit;

       setCode(newCode);

       if(digit && index < 5) {
        inputRefs.current[index +1]?.focus();
       }
    };

    const handlePaste = (e) => {
        e.preventDefault();

        const pastedCode = e.clipboardData
            .getData("text")
            .replace(/\D/g, "")
            .slice(0, 6);

        if (!pastedCode) return;

        const newCode = ["", "", "", "", "", ""];

        pastedCode.split("").forEach((digit, index) => {
            newCode[index] = digit;
        });

        setCode(newCode);

        const pastedIndex = Math.min(pastedCode.length, 6) - 1;

        if (pastedIndex >= 0) {
            inputRefs.current[pastedIndex]?.focus();
        }
    };

   
    const handleKeyDown = (index, e) => {
        if (e.key === "Backspace") {
            e.preventDefault();

            const newCode = [...code];

            if (code[index]) {
                newCode[index] = "";
                setCode(newCode);
                return;
            }

            if (index > 0) {
                newCode[index - 1] = "";
                setCode(newCode);

                inputRefs.current[index - 1]?.focus();
            }
        }

        if (e.key === "ArrowLeft" && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }

        if (e.key === "ArrowRight" && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

  return (
    <>
        <div className="w-full min-h-screen flex relative justify-center items-center">
            <div className="bg-blue-950 w-160 h-80 rounded-lg">
                <h1 className="font-bold text-[29px] text-white text-center mt-8">Verify Your Account</h1>
                <p className="text-white font-bold mt-4 text-center">A 6 digit verification code has been sent to your email. put the code below</p>
                <form onSubmit={handleSubmit}>
                    <div className="flex justify-center gap-5">
                        { code.map((digit, index) => (
                            <input 
                            onChange={(e) => handleKeyChange(index, e.target.value) }
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            onPaste={handlePaste}
                            key={index}
                            value={digit}
                            maxLength={1}
                            ref={(el) => {inputRefs.current[index] = el;
                                
                            }}
                            className="w-12 h-12 text-white border border-amber-500 font-bold text-[29px] text-center rounded-lg mt-9"
                            />
                        ))}

                        
                        
                    </div> 
                        <div className="flex justify-center">
                            <button className=" text-center w-80 text-white font-bold py-2 bg-amber-500 rounded-lg mt-9 hover:bg-amber-600 transition">Verify</button>  
                        </div>
                </form>
                
            </div>
        </div>
    </>
  )
}

export default AdminVerifyEmail
