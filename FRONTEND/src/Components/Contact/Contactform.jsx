import { useState } from "react";
import { motion } from "motion/react";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { useContactFormStore } from "../../Store/sentEmailStore";


const Contactform = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });

    const { sendEmail, loading, error, success } = useContactFormStore();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await sendEmail(formData);

        if (response?.success) {
            setFormData({
                name: "",
                email: "",
                subject: "",
                message: ""
            });
        }
    };

    return (
        <motion.div
            className="grid w-full grid-cols-1 gap-6 px-4 py-6 sm:px-6 md:py-8 lg:grid-cols-2 lg:gap-8 lg:px-10 xl:px-14"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
        >
            {/* Contact Information */}
            <div className="flex flex-col gap-5 rounded-xl bg-white p-5 shadow-[0_2px_12px_rgba(0,0,0,0.12)] sm:p-7">
                <h1 className="mb-2 text-xl font-bold text-black sm:text-2xl">
                    GET IN TOUCH
                </h1>

                <div className="flex items-center gap-3 transition-transform duration-300 hover:translate-y-1">
                    <MapPin className="size-12 shrink-0 rounded-full bg-amber-100 p-3 text-amber-500 sm:size-14" />
                    <div className="min-w-0 flex-1 rounded-lg p-3 shadow-[0_2px_12px_rgba(0,0,0,0.12)]">
                        <h2 className="font-bold">Visit Us</h2>
                        <p className="break-words text-sm text-gray-500 sm:text-base">
                            Otuoke Community, Ogbia L.G.A
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-3 transition-transform duration-300 hover:translate-y-1">
                    <Phone className="size-12 shrink-0 rounded-full bg-amber-100 p-3 text-amber-500 sm:size-14" />
                    <div className="min-w-0 flex-1 rounded-lg p-3 shadow-[0_2px_12px_rgba(0,0,0,0.12)]">
                        <h2 className="font-bold">Call Us</h2>
                        <a
                            href="tel:+2349131374798"
                            className="text-sm text-gray-500 hover:text-amber-600 sm:text-base"
                        >
                            +234 9131374798
                        </a>
                    </div>
                </div>

                <div className="flex items-center gap-3 transition-transform duration-300 hover:translate-y-1">
                    <Mail className="size-12 shrink-0 rounded-full bg-amber-100 p-3 text-amber-500 sm:size-14" />
                    <div className="min-w-0 flex-1 rounded-lg p-3 shadow-[0_2px_12px_rgba(0,0,0,0.12)]">
                        <h2 className="font-bold">Email</h2>
                        <a
                            href="mailto:preyeizonbuodei@gmail.com"
                            className="break-all text-sm text-gray-500 hover:text-amber-600 sm:text-base"
                        >
                            preyeizonbuodei@gmail.com
                        </a>
                    </div>
                </div>

                <div className="flex items-center gap-3 transition-transform duration-300 hover:translate-y-1">
                    <Clock className="size-12 shrink-0 rounded-full bg-amber-100 p-3 text-amber-500 sm:size-14" />
                    <div className="min-w-0 flex-1 rounded-lg p-3 shadow-[0_2px_12px_rgba(0,0,0,0.12)]">
                        <h2 className="font-bold">Office Hours</h2>
                        <p className="text-sm text-gray-500 sm:text-base">
                            Mon - Fri: 8:00 AM - 5:00 PM
                        </p>
                    </div>
                </div>
            </div>

            {/* Contact Form */}
            <div className="min-w-0 rounded-xl bg-white p-5 shadow-[0_2px_12px_rgba(0,0,0,0.12)] sm:p-7">
                <h1 className="mb-6 text-xl font-bold text-black sm:text-2xl">
                    SEND US A MESSAGE
                </h1>

                <form
                    className="flex w-full flex-col gap-5"
                    onSubmit={handleSubmit}
                >
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <input
                            className="w-full min-w-0 rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />

                        <input
                            className="w-full min-w-0 rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                            type="email"
                            name="email"
                            placeholder="Your Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <input
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                        type="text"
                        name="subject"
                        placeholder="Subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                    />

                    <textarea
                        className="min-h-40 w-full resize-y rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                        name="message"
                        placeholder="Your Message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                    />

                    {error && (
                        <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600" role="alert">
                            {error}
                        </p>
                    )}

                    {success && (
                        <p className="rounded-lg bg-green-50 p-3 text-sm text-green-700" role="status">
                            Your message has been sent successfully!
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="flex w-full items-center justify-center gap-3 rounded-lg bg-blue-950 px-6 py-3 font-bold text-white transition duration-300 hover:bg-amber-500 disabled:cursor-not-allowed disabled:opacity-60 sm:w-fit"
                    >
                        <Send size={18} />
                        {loading ? "Sending..." : "Send Message"}
                    </button>
                </form>
            </div>
        </motion.div>
    );
};

export default Contactform;