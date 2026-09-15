import { NavLink } from 'react-router-dom'
import backgroun from '../../Image/BG.jpg'
import { ArrowRight } from 'lucide-react'

const ContactMessage = () => {
  return (
    <section className="
      relative
      mx-auto
      mt-10
      w-[calc(100%-2rem)]
      max-w-6xl
      overflow-hidden
      rounded-lg

      sm:w-[calc(100%-3rem)]
      md:w-[calc(100%-5rem)]
      lg:w-[calc(100%-7rem)]
    ">

      {/* Background */}
      <img
        src={backgroun}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Overlay */}
      <div className="
        absolute
        inset-0
        bg-linear-to-r
        from-blue-950
        via-black/90
        to-blue-950/40
      " />

      {/* Content */}
      <div className="
        relative
        z-10
        flex
        flex-col
        gap-6
        px-5
        py-8

        sm:px-8
        sm:py-10

        lg:flex-row
        lg:items-center
        lg:justify-between
        lg:px-10
      ">

        {/* Text */}
        <div className="min-w-0 text-white">

          <h2 className="
            mb-2
            text-2xl
            font-bold
            sm:text-3xl
          ">
            Faculty of Engineering
          </h2>

          <h1 className="
            text-lg
            font-bold
            sm:text-xl
            md:text-2xl
          ">
            Build Your Future In Engineering
          </h1>

          <p className="
            mt-2
            text-sm
            text-gray-200
            sm:text-base
          ">
            Join a community of innovators and problem solvers
          </p>

        </div>


        {/* Buttons */}
        <div className="
          flex
          w-full
          flex-col
          gap-3

          sm:flex-row

          lg:w-auto
          lg:shrink-0
        ">

          <NavLink
            to="/about"
            className="
              flex
              items-center
              justify-center
              rounded-lg
              bg-amber-500
              px-5
              py-3
              text-center
              font-semibold
              text-white
              transition
              duration-300
              hover:bg-blue-700

              sm:px-6
            "
          >
            Explore Programs
          </NavLink>


          <NavLink
            to="/register"
            className="
              flex
              items-center
              justify-center
              gap-2
              rounded-lg
              border
              px-5
              py-3
              text-center
              font-semibold
              text-white
              transition
              duration-300
              hover:translate-x-2

              sm:px-6
            "
          >
            Register Now
            <ArrowRight size={18} />
          </NavLink>

        </div>

      </div>

    </section>
  )
}

export default ContactMessage