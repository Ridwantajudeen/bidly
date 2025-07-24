import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const { user, logout } = useUser();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const toggleMobile = () => {
    setMobileOpen(!mobileOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;

      if (currentY > lastScrollY && currentY > 50) {
        setShowNavbar(false); // Scrolling down
      } else {
        setShowNavbar(true); // Scrolling up or near top
      }

      setLastScrollY(currentY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={`bg-white shadow-sm fixed top-0 w-full z-50 transition-transform duration-300 ${
        showNavbar ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="max-w-7xl  mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          <Link to="/">
  <img src="/bidly-logo.png" alt="Bidly Logo" className="h-23 w-auto" />
</Link>

          
          <nav className="space-x-4 hidden md:flex items-center">
            <Link to="/jobs" className="text-gray-700 hover:text-blue-600 transition">
              Jobs
            </Link>

            {user ? (
              <>
                <Link to="/dashboard" className="text-gray-700 hover:text-blue-600 transition">
                  Dashboard
                </Link>

                <div className="relative">
                  <button onClick={toggleDropdown} className="focus:outline-none">
                    {user.profilePicture ? (
                      <img
                        src={user.profilePicture}
                        alt="Profile"
                        className="w-8 h-8 rounded-full object-cover border"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold">
                        {user.name?.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </button>

                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 bg-white shadow rounded w-40 py-1 z-50">
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                        onClick={() => setDropdownOpen(false)}
                      >
                        Profile
                      </Link>
                      <Link
                        to="/dashboard"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                        onClick={() => setDropdownOpen(false)}
                      >
                        Dashboard
                      </Link>
                      <button
                        onClick={() => {
                          handleLogout();
                          setDropdownOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition"
                >
                  Sign Up
                </Link>
              </>
            )}
          </nav>

          
          <div className="md:hidden fixed top-5 right-5 z-50">
            <button
              onClick={toggleMobile}
              className="p-2  text-black  "
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Floating Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.3 }}
            className="fixed top-16 right-5 w-48 bg-white rounded-xl shadow-lg p-4 z-40 flex flex-col space-y-3"
          >
            <Link to="/jobs" className="text-gray-700 hover:text-blue-600" onClick={toggleMobile}>
              Jobs
            </Link>

            {user ? (
              <>
                <Link to="/dashboard" className="text-gray-700 hover:text-blue-600" onClick={toggleMobile}>
                  Dashboard
                </Link>
                <Link to="/profile" className="text-gray-700 hover:text-blue-600" onClick={toggleMobile}>
                  Profile
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    toggleMobile();
                  }}
                  className="text-red-500 hover:text-red-600 text-left"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                  onClick={toggleMobile}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                  onClick={toggleMobile}
                >
                  Sign Up
                </Link>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
