import { NavLink } from "react-router-dom"
import { ArrowRight } from 'lucide-react';
import { useState } from "react";


const ResearchImpact = () => {
    const [activeArea, setActiveArea] = useState("All Areas");
    const data = [
        "All Areas",
        "Robotics & Automation",
        "Artificial Intelligence",
        "Control Systems",
        "Renewable Energy", 
        "Materials Manufacturing",
        "Structural Engineering"
    ];

  return (

    <>
        {/*  */}
        <div>
            <div className="flex justify-between text-blue-950  mr-10 ml-10">
                <p>RESEARCH AREAS</p>
                <NavLink className='flex gap-9 justify-center' to="/">View all research areas <ArrowRight /> </NavLink>
            </div>

            <h1 className="text-[22px] ml-10 font-bold  text-amber-950">Explore Key Research Areas</h1>

        </div>

        <div className="wifull grid mr-2 ml-2 grid-cols-3 mb-8 gap-4 sm:mr-23 sm:ml-23 mt-3 justify-around rounded-lg pt-2 pb-2">
            { data.map(( data ) => {
                return (
                    <button key={data}
                    onClick={() => setActiveArea(data)}
                    className={`relative rounded-lg hover:cursor-pointer hover:bg-amber-500 py-2 px-2 transition duration:500 %{
                        activeArea
                                ? "border border-amber-500 font-semibold "
                                : "text-blue-950 border border-gray-500  text-black hover:text-blue-500"
                }`} 
            
                >
                {data}
                </button>
                )
            
             })
        
    }
        </div>

    </>

  )
}

export default ResearchImpact