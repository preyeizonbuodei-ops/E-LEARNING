import backgroun from '../Image/FB3.jpg'
import Logo from '../Image/FBLOGO.jpg'
import { NavLink } from 'react-router-dom'

const Foot = () => {
  return (
    <footer className="relative mt-6 min-h-70 w-full overflow-hidden">
      <img
        src={backgroun}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-linear-to-r from-blue-950 via-black/90 to-blue-950/70"></div>

      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 gap-10 px-8 py-10 text-white md:grid-cols-2 lg:grid-cols-4">

        {/* Faculty */}
        <div>
          <img
            className="mb-4 h-20 w-20 rounded-full object-cover"
            src={Logo}
            alt="Faculty of Engineering Logo"
          />

          <h2 className="pb-3 text-2xl font-bold">
            Faculty of Engineering
          </h2>

          <h3 className="font-bold">
            Build Your Future In Engineering
          </h3>

          <p className="mt-2 text-xs text-gray-300">
            Join a community of innovators and problem solvers.
          </p>

          <p>© 2026</p>
        </div>


        <div>
          <h2 className="mb-5 text-xl font-bold">
            Quick Links
          </h2>

          <div className="flex flex-col gap-2 text-sm text-gray-300">
            <NavLink to="/" className="transition hover:text-amber-500">
              Home
            </NavLink>

            <NavLink to="/about" className="transition hover:text-amber-500">
              About
            </NavLink>

            <NavLink to="/department" className="transition hover:text-amber-500">
              Department
            </NavLink>

            <NavLink to="/resources" className="transition hover:text-amber-500">
              Resources
            </NavLink>

            <NavLink to="/research" className="transition hover:text-amber-500">
              Research
            </NavLink>

            <NavLink to="/contact" className="transition hover:text-amber-500">
              Contact
            </NavLink>

            <NavLink to="/news" className="transition hover:text-amber-500">
              News
            </NavLink>
          </div>
        </div>


        <div>
          <h2 className="mb-5 text-xl font-bold">
            Resources
          </h2>

          <div className="flex flex-col gap-3 text-sm text-gray-300">
            <h3 className="cursor-pointer transition hover:text-amber-500">
              Student Portal
            </h3>

            <h3 className="cursor-pointer transition hover:text-amber-500">
              News Update
            </h3>

            <h3 className="cursor-pointer transition hover:text-amber-500">
              E-Learning
            </h3>

            <h3 className="cursor-pointer transition hover:text-amber-500">
              Downloads
            </h3>

            <h3 className="cursor-pointer transition hover:text-amber-500">
              Academic Calendar
            </h3>
          </div>
        </div>


        <div>
          <h2 className="mb-5 text-xl font-bold">
            Contact
          </h2>

          <div className="flex flex-col gap-3 text-sm text-gray-300">
            <p>
              Faculty of Engineering
            </p>

            <p>
              Email: engineering@Otuoke.com
            </p>

            <p>
              Phone: +234 8068640901
            </p>

            <p>
              Nigeria
            </p>
          </div>
        </div>

      </div>

    </footer>
  )
}

export default Foot