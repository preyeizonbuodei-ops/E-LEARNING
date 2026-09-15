import { motion } from "motion/react";
import { MapPin, Phone, Mail, Clock, Send} from 'lucide-react';

const Contactform = () => {
  return (
    <>
        <motion.div className="wifull grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 mr-14 ml-14 bg-amber-50 mt-5 rounded-lg gap-5 mb-5"
            initial={{ opacity: 0, y: 70 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: 0}}
            transition={{ duration: 0.5 }}
      // whileHover={{ y: -14 }}
        >
            {/* contact area */}
            <div className="flex flex-col p-5 shadow-[0_2px_12px_rgba(0,0,0,0.12)] gap-2 bg-white">
                <h1 className="font-bold mb-4 text-black">GET IN TOUCH</h1>

                {/* first property */}
                <div className="flex gap-3 items-center ml-3 hover:cursor-pointer hover:translate-y-1.5 transform duration-500">
                    <div>
                        <MapPin className="size-13 bg-amber-100 text-amber-500 rounded-full p-3"/>
                    </div>
                    <div className="shadow-[0_2px_12px_rgba(0,0,0,0.12)] w-full rounded-lg p-1.5">
                        <h1 className="font-bold">Visit Us</h1>
                        <p className="text-gray-500">Otuoke Community Ogbia L.G.A</p>
                    </div>
                </div>

                {/* 2nd property */}
                <div className="flex gap-3 items-center ml-3 hover:translate-y-1.5 transform duration-500 fover:cursor-pointer">
                    <div>
                        <Phone className="size-13 bg-amber-100 text-amber-500 rounded-full p-3"/>
                    </div>
                    <div className="shadow-[0_2px_12px_rgba(0,0,0,0.12)] w-full rounded-lg p-1.5">
                        <h1 className="font-bold">Call Us</h1>
                        <p className="text-gray-500">+234 9131374798</p>
                    </div>
                </div>

                {/* 3rd property */}
                <div className="flex gap-3 items-center ml-3 hover:translate-y-1.5 transform duration-500 hover:cursor-pointer">
                    <div>
                        <Mail className="size-13 bg-amber-100 text-amber-500 rounded-full p-3"/>
                    </div>
                    <div className="shadow-[0_2px_12px_rgba(0,0,0,0.12)] w-full rounded-lg p-1.5">
                        <h1 className="font-bold">Email</h1>
                        <p className="text-gray-500">preyeizonbuodei@gmail.com</p>
                    </div>
                </div>

                {/* 4rd property */}
                <div className="flex gap-3 items-center ml-3 hover:translate-y-1.5 transform duration-500 hover:cursor-pointer">
                    <div>
                        <Clock className="size-13 bg-amber-100 text-amber-500 rounded-full p-3"/>
                    </div>
                    <div className="shadow-[0_2px_12px_rgba(0,0,0,0.12)] w-full rounded-lg p-1.5">
                        <h1 className="font-bold">Office Hours</h1>
                        <p className="text-gray-500">Mon - Fri: 8:00 AM - 5:00 PM</p>
                    </div>
                </div>
            </div>

            

            {/* Form area */}
            <div className="flex flex-col p-5 shadow-[0_2px_12px_rgba(0,0,0,0.12)] bg-white w-full">
                <div>
                    <h1 className="font-bold mb-4 text-black">SEND US A MESSAGE</h1>
                    <div >
                        <form className="w-full flex flex-col gap-8" action="">
                            <div className="flex justify-between gap-4">
                                <input className="w-full rounded-lg border border-gray-300 px-4 py-3
                                outline-none
                                focus:border-orange-500
                                focus:ring-2
                                focus:ring-orange-200" type="text" placeholder="Your Name"/>
                                <input className="w-full rounded-lg border border-gray-300 px-4 py-3
                                outline-none
                                focus:border-orange-500
                                focus:ring-2
                                focus:ring-orange-200" type="email" placeholder="Your Email"/>
                            </div>

                            <div>
                                <input className="w-full rounded-lg border border-gray-300 px-4 py-3
                                outline-none
                                focus:border-orange-500
                                focus:ring-2
                                focus:ring-orange-200" type="text" placeholder="Subject"/>
                            </div>
                            
                            <div>
                                <textarea className="w-full rounded-lg border border-gray-300 px-4 py-3
                                outline-none
                                focus:border-orange-500
                                focus:ring-2
                                focus:ring-orange-200" type="message" placeholder="Your Message"/>
                            </div>

                            <div>
                                <button className="flex gap-5 bg-blue-950 text-white font-bold pt-2 pb-2 pr-6 pl-6 rounded-lg hover:cursor-pointer hover:bg-amber-500 transform duration-500"> <Send />  Send Message</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </motion.div>
    </>
  )
}

export default Contactform