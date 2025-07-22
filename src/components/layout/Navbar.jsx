import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { useState } from "react";

export default function Navbar() {
  const { user, logout } = useUser();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/"); // redirect home
  };

  const toggleMobile = () => {
    setMobileOpen(!mobileOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-blue-600">
            Bidly
          </Link>

          {/* Desktop Nav */}
          <nav className="space-x-4 hidden md:flex items-center">
            <Link
              to="/jobs"
              className="text-gray-700 hover:text-blue-600 transition"
            >
              Jobs
            </Link>

            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="text-gray-700 hover:text-blue-600 transition"
                >
                  Dashboard
                </Link>

                <div className="relative">
                  <button
                    onClick={toggleDropdown}
                    className="focus:outline-none"
                  >
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

                  {/* Dropdown */}
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
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
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

          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <button
              type="button"
              onClick={toggleMobile}
              className="text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              ☰
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white shadow px-4 py-2 space-y-2">
          <Link
            to="/jobs"
            className="block text-gray-700 hover:text-blue-600"
            onClick={toggleMobile}
          >
            Jobs
          </Link>

          {user ? (
            <>
              <Link
                to="/dashboard"
                className="block text-gray-700 hover:text-blue-600"
                onClick={toggleMobile}
              >
                Dashboard
              </Link>
              <Link
                to="/profile"
                className="block text-gray-700 hover:text-blue-600"
                onClick={toggleMobile}
              >
                Profile
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  toggleMobile();
                }}
                className="block text-red-500 hover:text-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="block px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={toggleMobile}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="block px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                onClick={toggleMobile}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}
