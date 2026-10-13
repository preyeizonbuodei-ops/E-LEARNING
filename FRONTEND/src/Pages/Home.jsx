
import Engineering from '../Image/BG.jpg'
import Navbar from '../Components/Navbar';
import Data from '../Components/Data';
import Call from '../Components/Call';
import { ArrowRight, Cog, RobotArm, HardHat,   Zap, Fuel, FlaskConical, Bot, BrainCog, Landmark, Cpu, Factory, Wifi, Wrench, BookCheck, NotebookPen, Megaphone, CalendarDays, SearchSlash, TvMinimalPlay, FilePlus, UserRoundPen, Heart } from 'lucide-react';
import Department from '../Components/Deparment/Department';
import Action from '../Components/Action';
import Laboratory from '../Components/Laboratory';
import Lab1 from '../Image/lab1.jpg'
import Lab2 from '../Image/lab2.jpg'
import Lab3 from '../Image/lab3.jpg'

import Student from '../Components/Student';
import { motion } from "motion/react";
import Message from '../Components/Message';
import Foot from '../Components/Foot';
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';


const Home = () => {

    const [ news, setNews ] = useState([])
    const [ currentPage, setCurrentPage ] = useState(1)


    const articlesPerPage = 4;

    const indexOfLastArticle = currentPage * articlesPerPage;
    const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;

    const currentArticles = news.slice(
        indexOfFirstArticle,
        indexOfLastArticle
    );

    const getNews = async() => {
        try {
            const response = await axios.get('http://localhost:8000/api/v1/users/get-news');
                if(response.data.success) {
                setNews(response.data.data.articles);
                }
                console.log("NEWS:", news);
        } catch (error) {
            console.log(error)
        }
        
    }

    useEffect(() => {
        getNews()
    },[])
    
    return(
        <>
            
           <div className="relative h-screen w-full overflow-hidden">

                {/* Background image */}
                <img
                    src={Engineering}
                    alt="engineering faculty"
                    className="absolute inset-0 h-full w-full object-cover"
                />

                {/* Dark overlay */}
                <div className="absolute inset-0 bg-linear-to-r from-black via-black/50 to-transparent"></div>


                {/* Navbar */}
                <div className="relative z-30">
                    <Navbar />
                </div>


                {/* Hero content */}
                <div className="relative z-20 flex h-[calc(100vh-80px)] items-center">

                    <motion.div
                        className="
                            mx-5
                            max-w-xl
                            text-white

                            sm:mx-8
                            md:ml-16
                            lg:ml-20
                        "
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ amount: 0.0 }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                    >

                        {/* Heading */}
                        <h1
                            className="
                                text-3xl
                                font-bold
                                leading-tight

                                sm:text-4xl
                                md:text-5xl
                            "
                        >
                            Building the Future
                            <br />

                            <span className="text-amber-500">
                                Through Innovation
                            </span>
                        </h1>


                        {/* Description */}
                        <p
                            className="
                                mt-4
                                text-base
                                text-gray-200

                                sm:mt-5
                                sm:text-lg
                            "
                        >
                            Pioneering innovation and developing solutions for a better
                            tomorrow through excellence in engineering education and
                            research.
                        </p>


                        {/* Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="
                                mt-6
                                flex
                                flex-col
                                gap-3

                                sm:flex-row
                                sm:gap-3
                            "
                        >

                            {/* Explore */}
                            <NavLink
                                to="/department"
                                className="
                                    flex
                                    items-center
                                    justify-center
                                    rounded-lg
                                    bg-amber-500
                                    px-5
                                    py-3
                                    font-semibold
                                    text-white
                                    transition
                                    duration-500
                                    hover:bg-blue-700

                                    sm:px-6
                                "
                            >
                                Explore Programs
                            </NavLink>


                            {/* Register */}
                            <NavLink
                                to="/register"
                                className="
                                    flex
                                    items-center
                                    justify-center
                                    gap-3
                                    rounded-lg
                                    border
                                    px-5
                                    py-3
                                    font-semibold
                                    text-white
                                    transition
                                    duration-300
                                    hover:translate-x-2

                                    sm:px-6
                                "
                            >
                                Register Now
                                <ArrowRight className="size-5" />
                            </NavLink>

                        </motion.div>

                    </motion.div>

                </div>

            </div>
            
            < Data />
            <Call />

            <h2 className="relative mx-auto mt-12 mb-6 w-fit text-center font-bold after:absolute after:-bottom-2           after:left-0 after:h-[2px] after:w-full after:bg-amber-500">
                OUR DEPARTMENTS
            </h2>

            <div className='grid mr-2 ml-2 grid-cols-1 md:grid-cols-3 lg:grid-cols-3 md:mr-20 md:ml-20 md:mb-12 gap-5 bg-blue '>

                <div className='"w-full max-w-md p-9 transition duration-300 shadow-[0_2px_12px_rgba(0,0,0,0.12)] cursor-pointer flex justify-center items-center'>
                    <Department image={Cog} 
                    department="Mechanical Engineering"
                      />
                    
                </div>

                <div className='"w-full max-w-md p-9 transition duration-300 shadow-[0_2px_12px_rgba(0,0,0,0.12)] cursor-pointer'>
                    <Department image={RobotArm} 
                    department="Mechatronics Engineering"
                      />
                    
                </div>

                <div className='"w-full max-w-md p-9 transition duration-300 shadow-[0_2px_12px_rgba(0,0,0,0.12)] cursor-pointer'>
                    <Department image={HardHat} 
                    department="Civil Engineering"
                      />
                </div>

                <div className='"w-full max-w-md p-9 transition duration-300 shadow-[0_2px_12px_rgba(0,0,0,0.12)]  cursor-pointer'>
                    <Department image={Zap} 
                    department="Electrical/Electronics Engineering"
                     />
                    
                </div>

                <div className='"w-full max-w-md p-9 transition duration-300 shadow-[0_2px_12px_rgba(0,0,0,0.12)] cursor-pointer'>
                    <Department image={Fuel} 
                    department="Petroleum and Gas Engineering"
                     />
                    
                </div>

                <div className='"w-full max-w-md p-9 transition duration-300 shadow-[0_2px_12px_rgba(0,0,0,0.12)] cursor-pointer'>
                    <Department image={FlaskConical} 
                    department="Chemical Engineering"
                     />
                    
                </div>
            </div>
            


            <div className='bg-blue-950 mb-13 mr-10 ml-10 '>
                <div>
                    <h1 className='text-white  pb-4 pt-4  relative mx-auto mt-12 mb-4 w-fit text-center font-bold after:absolute after:-bottom-0 after:left-15 after:h-[2px] after:w-22 after:bg-amber-500'>RESEARCH AND INNOVATION</h1>

                </div>

                <div className="flex flex-wrap justify-center items-start gap-6 mx-6">
                    <div className="w-[140px] flex justify-center">
                        <Action image={Bot}
                        description="Robotics and Automation"/>
                    </div>

                    <div className="w-[140px] flex justify-center">
                        <Action image={Zap}
                        description="Renewable Energy"/>
                    </div>

                    <div className="w-[140px] flex justify-center">
                        <Action image={BrainCog}
                        description="Artificial Intelligence"/>
                    </div>

                    <div className="w-[140px] flex justify-center">
                        <Action image={Landmark}
                        description="Structural Engineering"/>
                    </div>

                    <div className="w-[140px] flex justify-center">
                        <Action image={Cpu}
                        description="Embeded Systems"/>
                    </div>


                    <div className="w-[140px] flex justify-center">
                        <Action image={Factory}
                        description="Manufacturing Technology"/>
                    </div>

                    <div className="w-[140px] flex justify-center">
                        <Action image={Wifi}
                        description="Telecommunication"/>
                    </div>

                    <div className="w-[140px] flex justify-center">
                        <Action image={Wrench}
                        description="Substainable Engineering"/>
                    </div>
                </div>

                <div className='mb-2 mt-2 flex justify-center'>
                    <NavLink to='/research' className='bg-amber-500 rounded-sm mb-4 text-white flex gap-3 pt-2 pb-2 pr-6 pl-6 text-center hover:bg-blue-700 transition duration-300 cursor-pointer'>Explore And Research Today <ArrowRight /> </NavLink>
                </div>
                
            </div>



            <div className='grid grid-cols-1 mr-2 ml-2  md:grid-cols-3 lg:grid-cols-3  md:mr-14 md:ml-14 gap-3'>
                <div>
                    <h2 className="relative mx-auto mt-12 mb-6 w-fit text-center font-bold after:absolute after:-bottom-2           after:left-0 after:h-[2px] after:w-full after:bg-amber-500">LABORATORIES AND FACILITIES</h2>

                    <div className='grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                        <div className='shadow-[0_2px_12px_rgba(0,0,0,0.12)] hover:translate-1.5 transition duration-500 cursor-pointer'>
                            <Laboratory image={Lab1}
                            heading="Chemical Laboratory" 
                            description="Advanced Chemical And Chemistry Lab" />
                        </div>

                        <div className='shadow-[0_2px_12px_rgba(0,0,0,0.12)] hover:translate-1.5 transition duration-500 cursor-pointer'>
                            <Laboratory image={Lab2}
                            heading="Research Lab" 
                            description="Modern Research energy lab" />
                        </div>

                        <div className='shadow-[0_2px_12px_rgba(0,0,0,0.12)] hover:translate-1.5 transition duration-500 cursor-pointer'>
                            <Laboratory  image={Lab3}
                            heading="Mechatronics Lab" 
                            description="High Performance and indutrial automation Lab" />
                        </div>
                    </div>

                    <div className='text-blue-500'>
                        <NavLink className=" p-22 pb-7 flex justify-center pt-7  items-center  pr-6 pl-6 gap-6 bg-white shadow-[0_2px_12px_rgba(0,0,0,0.12)]" to='#'>view all Facilitie<ArrowRight/> </NavLink>
                    </div>

                </div>

                {/* news */}
                <div>

                    <h1 className="relative mx-auto mt-12 mb-6 w-fit text-center font-bold after:absolute after:-bottom-2           after:left-0 after:h-[2px] after:w-full after:bg-amber-500">News And Latest Events</h1>
                
                    <div className='flex gap-6 flex-col justify-ce mt-5'>
                        { currentArticles.map((article) => (
                            <div className='flex flex-1 gap-3' key={article.url}>
                                <div>
                                    <img className="h-20 w-50 " src={article.urlToImage} 
                                    alt={article.title} />
                                </div>
                                <div>
                                    <h2 className="font-bold" >{article.title}</h2>
                                    <p className="text-[12px] text-gray-500">{article.description ? article.description.slice( 0, 90 ) + "..." : "no description Availabke"}</p>
                                </div>
                                    
                                <a
                                    href={article.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[12px] text-blue-500"
                                >
                                    See More
                                </a>
                            </div>
                        )) }
                        
                        
                    </div>

                </div>

                {/* Students */}
                <div>
                    <div>
                        <h1  className="font-bold mb-6 mt-12 text-center">STUDENT RESOURCES</h1>
                    </div>
                     
                    <div  className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 '>
                        <div className='shadow-[0_2px_12px_rgba(0,0,0,0.12)] p-6 '>

                            <div className='flex justify-center items-center flex-col hover:translate-1.5 transition duration-500 cursor-pointer'>
                                <Student  image={BookCheck}
                                text="Course Materials"/>
                            </div>
                        </div>

                        <div className='shadow-[0_2px_12px_rgba(0,0,0,0.12)] p-6'>
                            <div className='flex justify-center items-center flex-col hover:translate-1.5 transition duration-500 cursor-pointer'>
                                <Student  image={NotebookPen}
                                text="Assignment"/>
                            </div>
                        </div>

                        <div className='shadow-[0_2px_12px_rgba(0,0,0,0.12)] p-6'>
                            <div className='flex justify-center items-center flex-col hover:translate-1.5 transition duration-500 cursor-pointer'>
                                <Student  image={Megaphone}
                                text="Announcements"/>
                            </div>
                        </div>

                        <div className='shadow-[0_2px_12px_rgba(0,0,0,0.12)] p-6'>
                            <div className='flex justify-center items-center flex-col hover:translate-1.5 transition duration-500 cursor-pointer'>
                                <Student image={CalendarDays}
                                text="Academic Calender"/>
                            </div>
                        </div>

                        <div className='shadow-[0_2px_12px_rgba(0,0,0,0.12)] p-6'>
                            <div className='flex justify-center items-center flex-col hover:translate-1.5 transition duration-500 cursor-pointer'>
                                <Student  image={SearchSlash}
                                text="venue Booking"/>
                            </div>
                        </div>

                        <div className='shadow-[0_2px_12px_rgba(0,0,0,0.12)] p-6'>
                            <div className='flex justify-center items-center flex-col hover:translate-1.5 transition duration-500 cursor-pointer'>
                                <Student  image={TvMinimalPlay}
                                text="Learning Videos"/>
                            </div>
                        </div>

                        <div className='shadow-[0_2px_12px_rgba(0,0,0,0.12)] p-6'>
                            <div className='flex justify-center items-center flex-col hover:translate-1.5 transition duration-500 cursor-pointer'>
                                <Student  image={Heart}
                                text="Documents"/>
                            </div>
                        </div>

                        <div className='shadow-[0_2px_12px_rgba(0,0,0,0.12)] p-6'>
                            <div className='flex justify-center items-center flex-col hover:translate-1.5 transition duration-500 cursor-pointer'>
                                <Student  image={UserRoundPen}
                                text="Lecturer Directory"/>
                            </div>
                        </div>

                    </div>

                    <button className='flex w-full py-3 justify-center mt-3 bg-blue-950 text-white md:justify-start md:w-fit md:mb-5 md:mt-5 hover:bg-blue-700 pt-2 md:pb-2 md:pr-12 md:pl-12 transition duration-500 cursor-pointer rounded-sm gap-6'>Go to student Portal <ArrowRight/> </button>
                </div>

            </div>
            
            <Message />
            <Foot />
        </>
    )
}

export default Home;